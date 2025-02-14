<?php

namespace App\Models;

use App\Helpers\OpenAIHelpers;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use UnexpectedValueException;

class ImageDescription
{
    public static function generateImageDescription($image, bool $force_generation = false): string
    {
        $hash = Hash::make($image);
        if ((!$force_generation) && (Cache::has($hash))) {
            return Cache::get($hash);
        }

        $response = OpenAIHelpers::submitCompletion(
            "You will be provided with an image file delimited by tree brackets. \
            Your task is to provide a one paragraph long description of the image. \
            Ensure that the description detailed and thorough, providing all necessary information to understand the content of the image. \
            Rely only on the provided image, do not include external information.",
            "{{{$image}}}"
        );

        $json = json_decode($response);
        if (empty($json)) {
            throw new UnexpectedValueException("Empty JSON object was returned from API while generating excerpts.");
        }

        $description = $json->choices[0]->message->content;

        Cache::add($hash, $description);

        return $description;
    }
}
