<?php

namespace App\Http\Controllers;

use App\Helpers\ExceptionHelper;
use App\Models\Tag;
use Exception;

class TagController extends Controller
{
    public function get(int $id)
    {
        $tags = [];

        try {
            $tags = Tag::index($id);
        } catch (Exception $err) {
            return ExceptionHelper::handleException($err);
        }

        return response()->json($tags, 200);
    }

    public function generate(int $id)
    {
        try {
            Tag::generateAndSave($id);
        } catch (Exception $err) {
            return ExceptionHelper::handleException($err);
        }

        return response()->json(['action' => 'store'], 200);
    }

    public function delete(int $id)
    {
        try {
            Tag::deleteById($id);
        } catch (Exception $err) {
            return ExceptionHelper::handleException($err);
        }

        return response()->json(['action' => 'delete'], 200);
    }
}
