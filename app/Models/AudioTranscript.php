<?php

namespace App\Models;

use App\Helpers\OpenAIHelpers;
use DateInterval;
use Illuminate\Support\Facades\Cache;
use UnexpectedValueException;
class AudioTranscript
{
    public static function generateAudioTranscript($audio, bool $force_generation = false): string
    {
        $base64_audio = base64_encode(file_get_contents($audio));


          $hash = hash('sha256', $base64_audio);
          if ((! $force_generation) && (Cache::has($hash))) {
              return Cache::get($hash);
          }


        $response = OpenAIHelpers::submitTrancription(
            "You will be provided with an audio file encoded in base64 that is delimited by three brackets. \
            Your task is to generate a full transcript of the audio file. \
            Only include speech in the transcript, ignore any background noise. \
            Ensure that the transcript is readable.",
            "What is in this recording?",
            "{{{" . $base64_audio . "}}}"
        );

        $json = json_decode($response);
        if (empty($json)) {
            throw new UnexpectedValueException("Empty JSON object returned by API while generating audio transcript.");
        }

        $transcript = $json->choices[0]->message->content;

        $duration = new DateInterval ('P1W');
        Cache::add($hash, $transcript, $duration);

        return $transcript;
    }
}
