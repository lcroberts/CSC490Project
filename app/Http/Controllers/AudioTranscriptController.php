<?php

namespace App\Http\Controllers;

use App\Models\AudioTranscript;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AudioTranscriptController extends Controller
{
    public function sendAudio(Request $request)
    {
        $audio = $request -> input('audio');
        $forceGeneration = $request-> input('forceGeneration', false);

        $transcript = AudioTranscript::generateAudioTranscript($audio, $forceGeneration);

        return response()->json($transcript);
    }
}
