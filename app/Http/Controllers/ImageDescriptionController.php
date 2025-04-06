<?php

namespace App\Http\Controllers;

use App\Helpers\ExceptionHelper;
use App\Models\ImageDescription;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Log;

class ImageDescriptionController extends Controller
{
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
}
