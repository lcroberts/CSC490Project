<?php

namespace App\Models;

use App\Helpers\StorageHelpers;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\UnauthorizedException;
use RuntimeException;

class Note
{
    public int $id;
    public string $name;
    public string $content;

    private static function asObjectArray(array &$results): array
    {
        $res = [];
        foreach ($results as $value) {
            $obj = new self;
            foreach($value as $key => $val) {
                $obj->{$key} = $val;
            }

            $res[] = $obj;
        }

        return $res;
    }

    public static function save(string $name, string $content, ?string $disk_root = null)
    {
        if (!Auth::check())
            throw new UnauthorizedException("User must be authenticated to save notes to disk.");

        $params = [
            'name' => $name,
            'user_id' => Auth::id(),
        ];

        $sql = "
            INSERT INTO notes (created_at, name, user_id)
            VALUES (timezone('utc', now()), :name, :user_id);
        ";

        try {
            DB::insert($sql, $params);
            $id = DB::getPdo()->lastInsertId();
        } catch (QueryException $err) {
            $msg = __METHOD__ . ': ' . $err->getMessage() . PHP_EOL . $err->getTraceAsString();
            Log::error($msg);

            throw $err;
        }

        $disk = StorageHelpers::getS3Disk($disk_root);
        if (!$disk->put(Auth::id() . "/notes/" . $name . "_" . $id, $content)) {
            throw new RuntimeException("Could not store note " . $name . "to disk.");
        }

        return $id;
    }

    public static function attachMedia(string $name, int $note_id, $media, ?string $disk_root = null)
    {
        if (!Auth::check())
            throw new UnauthorizedException("User must be authentcated to attach media to note.");

        $disk = StorageHelpers::getS3Disk($disk_root);
        if (!$disk->put(Auth::id() . "/media/" . $note_id . "/" . $name, $media)) {
            throw new RuntimeException("Could not store media " . $name . " to note " . $note_id . "on disk.");
        }
    }

    public static function getNotesList(?string $disk_root = null): array
    {
        if (!Auth::check())
            throw new UnauthorizedException("User must be authenticated to get their list of notes.");

        $disk = StorageHelpers::getS3Disk($disk_root);
        return $disk->files(Auth::id() . "/notes");
    }

    public static function getById(int $id)
    {
        if (!Auth::check())
            throw new UnauthorizedException("User must be authenticated to retrieve a note.");

        $params = [
            'id' => $id,
            'user' => Auth::id(),
        ];
        $sql = "
            SELECT * FROM notes
            WHERE user_id = :user
                AND id = :id;
        ";

        try {
            $res = DB::select($sql, $params);
            if (empty($res)) {
                $res = [];
            }
        } catch (QueryException $err) {
            $msg = __METHOD__ . ": " . $err->getMessage() . PHP_EOL . $err->getTraceAsString();
            Log::error($msg);

            throw $err;
        }

        return static::asObjectArray($res);
    }


    public static function getMediaList(int $note_id, ?string $disk_root = null): array
    {
        if (!Auth::check())
            throw new UnauthorizedException("User must be authenticated to see list of media for note.");

        $disk = StorageHelpers::getS3Disk($disk_root);
        return $disk->files(Auth::id() . "/media/" . $note_id);
    }
}
