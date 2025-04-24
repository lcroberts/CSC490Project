<?php

namespace App\Http\Controllers;

use App\Helpers\ExceptionHelper;
use App\Models\Note;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class NoteController extends Controller
{
    public function index()
    {
        $notes = [];

        try {
            $notes = Note::getNotesList();
        } catch (Exception $err) {
            return ExceptionHelper::handleException($err);
        }

        return response()->json($notes, 200);
    }

    public function get(int $id)
    {
        $notes = [];

        try {
            $notes = Note::getById($id);
        } catch (Exception $err) {
            return ExceptionHelper::handleException($err);
        }

        return response()->json($notes, 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required',
            'body' => 'nullable',
        ]);

        try {
            $id = Note::save($validated['name'], $validated['body'] ?? "");
        } catch (Exception $err) {
            return ExceptionHelper::handleException($err);
        }

        return response()->json(['id' => $id], 200);
    }

    public function alter(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required|integer',
            'body' => 'nullable',
        ]);

        try {
            Note::alter($validated['id'], $validated['body'] ?? "");
        } catch (Exception $err) {
            return ExceptionHelper::handleException($err);
        }

        return response()->json(['action' => 'store'], 200);
    }

    public function delete(Request $request, int $note_id)
    {
        try {
            Note::remove($note_id);
        } catch (Exception $err) {
            return ExceptionHelper::handleException($err);
        }

        return response()->json(['action' => 'delete'], 200);
    }

    public function indexMedia(int $note_id)
    {
        $media_list = [];

        try {
            $media_list = Note::getMediaList($note_id);
        } catch (Exception $err) {
            return ExceptionHelper::handleException($err);
        }

        return response()->json(['all' => $media_list], 200);
    }

    public function getMedia(int $note_id, string $name)
    {
        $media = [];

        try {
            $media = Note::getMedia($name, $note_id);
        } catch (Exception $err) {
            return ExceptionHelper::handleException($err);
        }

        return response()->json(['body' => $media], 200);
    }

    public function addMedia(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|max:255',
            'note_id' => 'required|integer',
            'body' => 'required',
        ]);

        try {
            Note::attachMedia($validated['name'], $validated['note_id'], $validated['body']);
        } catch (Exception $err) {
            return ExceptionHelper::handleException($err);
        }

        return response()->json(['action' => 'store'], 200);
    }

    public function deleteMedia(int $note_id, string $name)
    {

        try {
            Note::removeMedia($name, $note_id);
        } catch (Exception $err) {
            return ExceptionHelper::handleException($err);
        }

        return response()->json(['action' => 'delete'], 200);
    }
}
