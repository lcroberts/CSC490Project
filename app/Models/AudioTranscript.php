<?php

namespace App\Models;

use App\Helpers\OpenAIHelpers;
use DateInterval;
use Illuminate\Support\Facades\Cache;
use UnexpectedValueException;
use Illuminate\Support\Facades\Log;
class AudioTranscript
{
    public static function generateAudioTranscript($audio, bool $force_generation = false): string
    {
        $force_generation = true;

        $hash = hash('sha256', file_get_contents($audio));
          if ((! $force_generation) && (Cache::has($hash))) {
              return Cache::get($hash);
          }


        $response = OpenAIHelpers::submitTranscription($audio);

        $json = json_decode($response);
        if (empty($json)) {
            throw new UnexpectedValueException("Empty JSON object returned by API while generating audio transcript.");
        }

        Log::debug(print_r($json, true));

        $transcript = $json->text;

        $duration = new DateInterval ('P1W');
        Cache::add($hash, $transcript, $duration);

        return $transcript;
    }
}
