<?php

namespace App\Http\Controllers;

use App\Helpers\ExceptionHelper;
use App\Models\ImageDescription;
use Illuminate\Http\Request;
use Exception;

class ImageDescriptionController extends Controller
{
    public function sendImage(Request $request)
    {
        $request->validate([
            'image' => 'required|file|image',
            'forceGeneration' => 'nullable|boolean',
        ]);

        try {
            $image = $request -> file('image');
            $forceGeneration = $request->input("forceGeneration", false);

            $description = ImageDescription::generateImageDescription(file_get_contents($image), $forceGeneration);
        } catch(Exception $err) {
            return ExceptionHelper::handleException($err);
        }


        return response()->json($description);
    }
}
