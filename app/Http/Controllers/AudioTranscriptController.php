<?php

namespace App\Http\Controllers;

use App\Helpers\ExceptionHelper;
use App\Models\AudioTranscript;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Exception;

class AudioTranscriptController extends Controller
{
    public function sendAudio(Request $request)
    {
        $request->validate([
            'audio' => 'required|file',
            'forceGeneration' => 'nullable|boolean',
            ]);

        try{
            $audio = $request -> file('audio');
            $forceGeneration = $request-> input('forceGeneration', false);

            $transcript = AudioTranscript::generateAudioTranscript($audio, $forceGeneration);
        }
        catch(Exception $err){
            return ExceptionHelper::handleException($err);
        }

        return response()->json($transcript);
    }
}
