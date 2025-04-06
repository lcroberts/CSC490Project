<?php

namespace App\Http\Controllers;

use App\Helpers\ExceptionHelper;
use App\Models\ImageDescription;
use App\Models\Summary;
use Exception;
use Illuminate\Http\Request;

class MediaSummaryController extends Controller
{
    public function sendText(Request $request)
    {
        $request->validate([
            'noteContent' => 'required',
            'forceGeneration' => 'nullable|boolean',
        ]);

        try {
            $noteContent = $request->input('noteContent');
            $forceGeneration = $request->input('forceGeneration', false);

            $summary = Summary::generateTextSummary($noteContent, $forceGeneration);
        } catch (Exception $err) {
            return ExceptionHelper::handleException($err);
        }

        return response()->json(['summary' => $summary]);
    }

    public function sendImage(Request $request)
    {
        $validated = $request->validate([
            'image' => 'required|file|image',
            'forceGeneration' => 'nullable|boolean',
        ]);

        try {
            /** @var UploadedFile $image */
            $image = $validated['image'];
            $forceGeneration = $validated['forceGeneration'] ?? false;

            $description = ImageDescription::generateImageDescription($image->getContent(), $forceGeneration);
        } catch (Exception $err) {
            return ExceptionHelper::handleException($err);
        }

        return response()->json(['summary' => $description]);
    }

    public function sendAudio(Request $request)
    {
        $validated = $request->validate([
            'audio' => 'required|file|image',
            'forceGeneration' => 'nullable|boolean',
        ]);

        try {
            /** @var UploadedFile $audio */
            $audio = $validated['audio'];
            $forceGeneration = $validated['forceGeneration'] ?? false;
        } catch (Exception $err) {
            return ExceptionHelper::handleException($err);
        }

        return response()->json(['summary' => null]);
    }
}
