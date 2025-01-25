<?php

namespace App\Models;

use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ExampleModel
{
    public ?int $id = null;

    public string $test1;

    public int $test2;

    public ?string $test3 = null; // Nullable string with default value

    // Crud log columns
    public ?string $created_at = null;

    public ?string $updated_at = null;

    public ?string $deleted_at = null;

    public ?int $created_by = null;

    public ?int $updated_by = null;

    public ?int $deleted_by = null;

    public static function get(int $id): static
    {
        $params = ['id' => $id];
        $sql = '
        SELECT *
        FROM example_models
        WHERE id = :id
        ';
        try {
            $res = DB::select($sql, $params);
        } catch (QueryException $e) {
            $msg = __METHOD__.': '.$e->getMessage().PHP_EOL.$e->getTraceAsString();
            Log::error($msg);
            throw $e;
        }

        return static::dbResultsToObject($res)[0];
    }

    public function save(int $user_id): static
    {
        $ret = null;
        if ($this->id === null) {
            $this->id = $this->create($user_id);
            $ret = $this;
        } else {
            $ret = $this->update($user_id);
        }

        return $ret;
    }

    private function create(int $user_id): int
    {
        // All required fields should be set before calling this.
        $params = ['created_by' => $user_id];
        foreach ($this as $key => $value) {
            if ($value !== null) {
                $params[$key] = $value;
            }
        }

        $sql_insert_fields = [];
        foreach ($params as $key => $value) {
            $sql_insert_fields[] = $key;
        }
        $sql_insert_fields_string = implode(',', $sql_insert_fields);
        $sql_insert_vars_string = '';
        foreach ($sql_insert_fields as $key) {
            $sql_insert_vars_string .= ", :{$key}";
        }

        $sql = "
        INSERT INTO example_models (created_at, {$sql_insert_fields_string})
        VALUES (timezone('utc', now()) {$sql_insert_vars_string})
        ";

        try {
            DB::insert($sql, $params);
            $new_id = DB::getPdo()->lastInsertId();
        } catch (QueryException $e) {
            // Create error messgae and log. This is useful for debugging
            $msg = __METHOD__.': '.$e->getMessage().PHP_EOL.$e->getTraceAsString();
            Log::error($msg);
            throw $e;
        }

        return $new_id;
    }

    private function update(int $user_id)
    {
        // All required fields should be set before calling this.
        $params = [];
        foreach ($this as $key => $value) {
            if ($value !== null) {
                $params[$key] = $value;
            }
        }
        unset($params['created_at']);
        unset($params['created_by']);
        unset($params['updated_at']);
        unset($params['updated_by']);
        unset($params['id']);

        $sql_insert_fields = [];
        foreach ($params as $key => $value) {
            $sql_insert_fields[] = $key;
        }
        $sql_insert_fields_string = implode(',', $sql_insert_fields);
        $sql_insert_vars_string = '';
        foreach ($sql_insert_fields as $key) {
            $sql_insert_vars_string .= ", :{$key}";
        }

        $params['updated_by'] = $user_id;
        $params['id'] = $this->id;
        $sql = "
        UPDATE example_models SET
        (updated_at, updated_by, {$sql_insert_fields_string}) = (timezone('utc', now()), :updated_by {$sql_insert_vars_string})
        WHERE id = :id
        ";

        try {
            DB::update($sql, $params);
            $updated = static::get($this->id);
        } catch (QueryException $e) {
            // Create error messgae and log. This is useful for debugging
            $msg = __METHOD__.': '.$e->getMessage().PHP_EOL.$e->getTraceAsString();
            Log::error($msg);
            throw $e;
        }

        return $updated;
    }

    public static function index(): array
    {
        try {
            $res = DB::select('
                SELECT * FROM example_models e
                WHERE e.deleted_at IS NULL
                ', []);
            if (empty($res)) {
                $res = [];
            }
        } catch (QueryException $e) {
            // Create error messgae and log. This is useful for debugging
            $msg = __METHOD__.': '.$e->getMessage().PHP_EOL.$e->getTraceAsString();
            Log::error($msg);
            throw $e;
        }

        return static::dbResultsToObject($res);
    }

    private static function dbResultsToObject(array &$results): array
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
}
