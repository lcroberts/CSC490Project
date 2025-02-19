<?php

namespace App\Models;

use App\Helpers\OpenAIHelpers;
use DateInterval;
use Illuminate\Support\Facades\Cache;
use UnexpectedValueException;
class AudioTranscript
{
    public static function getAudioTranscript($audio): string
    {
        /*
          $hash = hash('sha256', $note_content);
          if ((! $force_generation) && (Cache::has($hash))) {
              return Cache::get($hash);
         */

        $response = OpenAIHelpers::submitTrancription(
            "You will be provided with an audio file delimited by three brackets. \
            ",
            "{{{" . $audio . "}}}"
        );

        $json = json_decode($response);
        if (empty($json)) {
            throw new UnexpectedValueException("Empty JSON object returned by API while generating audio transcript.");
        }

        $transcript = $json->choices[0]->message->content;

        return $transcript;
    }
}
