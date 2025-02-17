<?php

namespace App\Models;

use pp\Helpers\OpenAIHelpers;
use DataInterval;
use Illuminate\Support\Facades\Cache;
use UnexpectedValueException;

class ImageDescription
{
    public static function generateImageDescription($image, bool $force_generation = false): string
    {
        $hash = hash('sha256', $image);
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

        $duration = new DataInterval('P1W');
        Cache::add($hash, $description, $duration);

        return $description;
    }
}
