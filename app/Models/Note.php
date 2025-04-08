<?php

namespace App\Models;

use App\Helpers\StorageHelpers;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\UnauthorizedException;
use RuntimeException;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class Note
{
    public int $id;
    public string $name;
    public string $content;
    public string $created_at;

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

    public static function alter(int $id, string $content, ?string $disk_root = null)
    {
        if (!Auth::check())
            throw new UnauthorizedException("User must be authenticated to save notes to disk.");

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

        $obj = static::asObjectArray($res)[0];

        $disk = StorageHelpers::getS3Disk($disk_root);
        if (!$disk->delete(Auth::id() . "/notes/" . $obj->name . "_" . $id)) {
            throw new RuntimeException("Could not find note " . $obj->name . "on disk.");
        }

        if (!$disk->put(Auth::id() . "/notes/" . $obj->name . "_" . $id, $content)) {
            throw new RuntimeException("Could not store note " . $obj->name . " to disk.");
        }
    }

    public static function remove(int $id, ?string $disk_root = null)
    {
        if (!Auth::check())
            throw new UnauthorizedException("User must be authenticated to save notes to disk.");

        $params = [
            'id' => $id,
            'user_id' => Auth::id(),
        ];

        $sql = "
            SELECT * FROM notes
            WHERE user_id = :user_id
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

        $obj = static::asObjectArray($res)[0];

        $disk = StorageHelpers::getS3Disk($disk_root);
        if (!$disk->delete(Auth::id() . "/notes/" . $obj->name . "_" . $id)) {
            throw new RuntimeException("Could not find note " . $obj->name . "on disk.");
        }

        $params = [
            'id' => $id,
            'user_id' => Auth::id(),
        ];

        $sql = "
            DELETE FROM notes
            WHERE user_id = :user_id
                AND id = :id;
        ";

        try {
            $res = DB::delete($sql, $params);
            if (empty($res)) {
                $res = [];
            }
        } catch (QueryException $err) {
            $msg = __METHOD__ . ": " . $err->getMessage() . PHP_EOL . $err->getTraceAsString();
            Log::error($msg);

            throw $err;
        }
    }

    public static function attachMedia(string $name, int $note_id, $media, ?string $disk_root = null)
    {
        if (!Auth::check())
            throw new UnauthorizedException("User must be authentcated to attach media to note.");

        $disk = StorageHelpers::getS3Disk($disk_root);
        $path = Auth::id() . "/media/" . $note_id . "/" . $name;
        if ($media instanceof UploadedFile) {
            if (!$disk->put($path, $media->getContent())) {
                throw new RuntimeException("Could not store media " . $name . " to note " . $note_id . "on disk.");
            }
        } else {
            if (!$disk->put($path, $media)) {
                throw new RuntimeException("Could not store media " . $name . " to note " . $note_id . "on disk.");
            }
        }
    }

    public static function removeMedia(string $name, int $note_id, ?string $disk_root = null)
    {
        if (!Auth::check())
            throw new UnauthorizedException("User must be authentcated to detach media to note.");

        $disk = StorageHelpers::getS3Disk($disk_root);
        if (!$disk->delete(Auth::id() . "/media/" . $note_id . "/" . $name)) {
            throw new RuntimeException("Could not find media " . $name . " on disk.");
        }
    }

    public static function getNotesList(?string $disk_root = null): array
    {
        if (!Auth::check())
            throw new UnauthorizedException("User must be authenticated to get their list of notes.");

        $params = [
            'user' => Auth::id(),
        ];
        $sql = "
            SELECT * FROM notes
            WHERE user_id = :user
            ORDER BY created_at desc;
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

        $objs = static::asObjectArray($res);
        $disk = StorageHelpers::getS3Disk($disk_root);
        foreach ($objs as $obj) {
            $obj->content = $disk->get(Auth::id() . "/notes/" . $obj->name . "_" . $obj->id);
        }

        return $objs;
    }

    public static function getById(int $id, ?string $disk_root = null)
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

        $disk = StorageHelpers::getS3Disk($disk_root);

        $obj = static::asObjectArray($res)[0];
        $obj->content = $disk->get(Auth::id() . "/notes/" . $obj->name . "_" . $obj->id);

        return $obj;
    }


    public static function getMediaList(int $note_id, ?string $disk_root = null): array
    {
        if (!Auth::check())
            throw new UnauthorizedException("User must be authenticated to see list of media for note.");

        $disk = StorageHelpers::getS3Disk($disk_root);
        return $disk->files(Auth::id() . "/media/" . $note_id);
    }

    public static function getMedia(string $name, int $note_id, ?string $disk_root = null)
    {
        if (!Auth::check())
            throw new UnauthorizedException("User must be authenticated to see list of media for note.");

        $disk = StorageHelpers::getS3Disk($disk_root);
        return $disk->get(Auth::id() . "/media/" . $note_id . "/" . $name);
    }
}
