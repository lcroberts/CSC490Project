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
            'image' => 'required',
            'forceGeneration' => 'required|boolean',
        ]);

        try {
            $image = $request -> input('image');
            $forceGeneration = $request->input("forceGeneration", false);

            $description = ImageDescription::generateImageDescription($image, $forceGeneration);
        } catch(Exception $err) {
            return ExceptionHelper::handleError($err);
        }


        return response()->json($description);
    }
}
