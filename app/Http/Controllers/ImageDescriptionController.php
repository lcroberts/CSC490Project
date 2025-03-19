<?php

namespace App\Http\Controllers;

use App\Models\ImageDescription;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ImageDescriptionController extends Controller
{
    public function sendImage(Request $request)
    {
        $image = $request -> input('image');
        $forceGeneration = $request->input("forceGeneration", false);

        $description = ImageDescription::generateImageDescription($image, $forceGeneration);

        return response()->json($description);
    }
}
