<?php

namespace App\Http\Controllers;

use App\Helpers\ExceptionHelper;
use App\Models\Note;
use Exception;

use Illuminate\Http\Request;

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
        $request->validate([
            'name' => 'required|max:255',
            'body' => 'required',
        ]);

        try {
            Note::save($request->input('name'), $request->input('body'));
        } catch (Exception $err) {
            return ExceptionHelper::handleException($err);
        }

        return response()->json(['action' => 'store'], 200);
    }

    public function alter(Request $request)
    {
        $request->validate([
            'id' => 'required|integer',
            'body' => 'required',
        ]);

        try {
            Note::alter($request->input('id'), $request->input('body'));
        } catch (Exception $err) {
            return ExceptionHelper::handleException($err);
        }

        return response()->json(['action' => 'store'], 200);
    }

    public function delete(int $note_id)
    {
        try {
            Note::remove($request->input($note_id));
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
        $request->validate([
            'name' => 'required|max:255',
            'note_id' => 'required|integer',
            'body' => 'required',
        ]);

        try {
            Note::attachMedia($request->input('name'), $request->input('note_id'), $request->input('body'));
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
