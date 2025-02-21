<?php

namespace App\Models;

use App\Helpers\OpenAIHelpers;
use DateInterval;
use Illuminate\Support\Facades\Cache;
use UnexpectedValueException;
class AudioTranscript
{
    public static function generateAudioTranscript($audio): string
    {
        /*
          $hash = hash('sha256', $note_content);
          if ((! $force_generation) && (Cache::has($hash))) {
              return Cache::get($hash);
         */

        $response = OpenAIHelpers::submitTrancription(
            "You will be provided with an audio file delimited by three brackets. \
            Your task is to generate a full transcript of the audio file. \
            Only include speech in the transcript, ignore any background noise. \
            Ensure that the transcript is readable.",
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
