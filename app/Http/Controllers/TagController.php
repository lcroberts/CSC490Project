<?php

namespace App\Http\Controllers;

use App\Helpers\ExceptionHelper;
use App\Models\Tag;
use Illuminate\Http\Request;
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

    public function add(Request $request)
    {
        $request->validate([
            'note_id' => 'required|integer',
            'tag_content' => 'required|max:12',
        ]);

        try {
            Tag::save($request->input('note_id'), $request->input('tag_content'));
        } catch (Exception $err) {
            return ExceptionHelper::handleException($err);
        }

        return response()->json(['action' => 'store'], 200);
    }

    public function generate(Request $request)
    {
        $request->validate([
            'note_id' => 'required|integer',
        ]);

        try {
            Tag::generateAndSave($request->input('note_id'));
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
