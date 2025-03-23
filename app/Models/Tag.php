<?php

namespace App\Models;

use App\Helpers\OpenAIHelpers;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\UnauthorizedException;
use UnexpectedValueException;

class Tag
{
    public int $id;
    public int $user_id;
    public string $content;

    /**
     * @throws UnexpectedValueException if API prompts fail.
     */
    public static function generateAndSave(int $note_id): array
    {
        $note = Note::getById($note_id);

        $response = OpenAIHelpers::submitCompletion(
            "You will be provided with a document delimited by three brackets. \
                Your task is to select excerpts representative of the core ideas of the text. \
                Ensure that all excerpts contain all relevant context needed to interpret them - in other words, \
                don't extract small snippets that are missing important context. Additionally, any passage describing the purpose of the text, \
                such as mention of workplace, educational class, or medium, should be stored only in a separate excerpt,
                which must begin with the text 'MEDIUM:'. \
                Provide output in JSON format as follows:\n \
                [{'excerpt': '...'},\n \
                ...\n \
                {'excerpt': '...'}]",
            "{{{" . $note->content . "}}}"
        );

        // Guard this against error return value later
        $json = json_decode($response);
        if (empty($json)) {
            throw new UnexpectedValueException("Empty JSON object was returned from API while generating excerpts.");
        }

        $excerpts = $json->choices[0]->message->content;

        $response = OpenAIHelpers::submitCompletion(
            "You will be provided with a series of excerpts from a text formatted in JSON. \
                Your task is to create a list of single-word tags describing the core themes of both all of the excerpts and individual excerpts, \
                with preference given to the tags describing all of the excerpts. This list of tags should be equal in length to the number of \
                excerpts given. If an excerpt contains the text 'MEDIUM:', its purpose is to describe the purpose of the text, \
                and a special tag should be made for it containing the name of the medium, such as a class number or workplace. \
                Provide output in array format as follows:\n \
                [<tag>, \
                ..., \
                <tag>]",
                $excerpts
        );

        $json = json_decode($response);
        if (empty($json)) {
            throw new UnexpectedValueException("Empty JSON object returned from API while generating tags.");
        }

        $tags = explode(",", $json->choices[0]->message->content);
        $indices = [];
        foreach ($tags as $content) {
            $indices[] = self::save($note_id, $content);
        }

        return $indices;
    }

    private static function save(int $note_id, string $content): int
    {
        if (!Auth::check())
            throw new UnauthorizedException("User must be authenticated to save tags.");

        $existing_tags = self::getByContent($content);
        if (!empty($existing_tags)) {
            return -1;
        }

        $params = [
            'content' => $content,
            'user_id' => Auth::id(),
        ];

        $sql = "
            INSERT INTO tags (created_at, user_id, content)
            VALUES (timezone('utc', now()), :user_id, :content);
        ";

        try {
            DB::insert($sql, $params);
            $id = DB::getPdo()->lastInsertId();
        } catch (QueryException $err) {
            $msg = __METHOD__ . ': ' . $err->getMessage() . PHP_EOL . $err->getTraceAsString();
            Log::error($msg);

            throw $err;
        }

        $params = [
            'note_id' => $note_id,
            'tag_id' => $id,
        ];

        $sql = "
            INSERT INTO notes_to_tags (tag, note)
            VALUES (:tag_id, :note_id);
        ";

        try {
            DB::insert($sql, $params);
        } catch (QueryException $err) {
            $msg = __METHOD__ . ': ' . $err->getMessage() . PHP_EOL . $err->getTraceAsString();
            Log::error($msg);

            throw $err;
        }

        return $id;
    }

    public static function getPageOfTags(int $limit, int $last_id = null)
    {
        if (!Auth::check())
            throw new UnauthorizedException("User must be authenticated to retrieve tags.");
        
        $params = [
            'limit' => $limit,
            'user_id' => Auth::id(),
        ];

        $sql = "";

        if (is_null($last_id))
        {
            $sql .= "
                SELECT * FROM tags
                WHERE user_id = :user_id
                LIMIT :limit;
            ";
        }
        else
        {
            $params['last_id'] = $last_id;
            // Figure out way to rewrite to use index later
            $sql .= "
                SELECT * FROM tags
                WHERE user_id = :user_id
                    AND id > :last_id
                LIMIT :limit;
            ";
        }

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

    private static function asObjectArray(array &$results): array
    {
        $res = [];
        foreach ($results as $value) {
            $obj = new self;
            foreach ($value as $key => $val) {
                $obj->{$key} = $val;
            }

            $res[] = $obj;
        }

        return $res;
    }

    public static function index(int $note): array
    {
        $params['note_id'] = $note;

        $sql = "SELECT * FROM tags
                INNER JOIN notes_to_tags ON notes_to_tags.tag = tags.id
                WHERE notes_to_tags.note = :note_id;
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

    public static function getByContent(string $content): array
    {
        $params = ['content' => $content];
        $sql = "SELECT * FROM tags WHERE content = :content;";

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

    public static function getById(int $id)
    {
        $params = ['id' => $id];
        $sql = "SELECT * FROM tags WHERE id = :id;";

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

    public static function deleteById(int $id)
    {
        $obj = Tag::getById($id)[0];

        if (Auth::id() != $obj->user_id)
            throw new UnauthorizedException("User must be authenticated to delete tag.");
        
        $params = ['id' => $id];
        $sql = "SELECT * FROM tags WHERE id = :id;";

        try {
            DB::delete($sql, $params);
        } catch (QueryException $err) {
            $msg = __METHOD__ . ": " . $err->getMessage() . PHP_EOL . $err->getTraceAsString();
            Log::error($msg);

            throw $err;
        }
    }
}
