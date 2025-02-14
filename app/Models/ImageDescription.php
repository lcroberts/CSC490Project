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
    public static function generateImageDescription($image): string{
        $response = OpenAIHelpers::submitCompletion();

        $json = json_decode($response);
        if (empty($json)) {
            throw new UnexpectedValueException("Empty JSON object was returned from API while generating excerpts.");
        }

        $description = $json->choices[0]->message->content;

        return $description;
    }
}
