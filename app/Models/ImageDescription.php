<?php

namespace App\Models;

use App\Helpers\OpenAIHelpers;
use DateInterval;
use Illuminate\Support\Facades\Cache;
use UnexpectedValueException;

class ImageDescription
{
    public static function generateImageDescription(string $image, bool $force_generation = false): string
    {
        // Encode image in base64 to send to API
        $base64_image = base64_encode($image);

        $hash = hash('sha256', $base64_image);
        if ((! $force_generation) && (Cache::has($hash))) {
            return Cache::get($hash);
        }

        $response = OpenAIHelpers::submitImage(
            "You will be provided with a base64 encoded image file. \
            Your task is to provide a one paragraph description of the image. \
            Ensure that the description is detailed and thorough, providing all necessary information to understand the content of the image. \
            Rely only on the provided image, do not include external information.",
            'What is in this image?',
            $base64_image
        );

        $json = json_decode($response);
        if (empty($json)) {
            throw new UnexpectedValueException('Empty JSON object was returned from API while generating excerpts.');
        }

        $description = $json->choices[0]->message->content;

        $duration = new DateInterval('P1W');
        Cache::add($hash, $description, $duration);

        return $description;
    }
}
