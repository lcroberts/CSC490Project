<?php

namespace App\Helpers;

class OpenAIHelpers
{
    /**
     * @param string    $endpoint   OpenAI API Endpoint
     * @param string    $content    The POST payload
     *
     * __NOTE: CALLING THIS FUNCTION SUBMITS TO THE API AND *DOES* COST MONEY__
     */
    private static function submitAny(string $endpoint, string $content)
    {
        $client = curl_init();

        $headers = [
            'Content-Type: application/json',
            'Authorization: Bearer ' . env('OPENAI_KEY'),
        ];

        curl_setopt($client, CURLOPT_URL, "https://api.openai.com/v1/" . $endpoint);
        curl_setopt($client, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($client, CURLOPT_POSTFIELDS, $content);
        curl_setopt($client, CURLOPT_RETURNTRANSFER, true);

        $result = curl_exec($client);
        curl_close($client);

        return $result;
    }

    /**
     * Submits a request to the chat completion API.
     *
     * @param string    $system Text payload for the prolog / system role
     * @param string    $user   Text payload for the user prompt.
     *
     * To create similar function calls for other endpoints, simply submitAny to the requisite
     * endpoint after doing whatever data translation is required.
     */
    public static function submitCompletion(string $system, string $user)
    {
        $system = json_encode([
            'role' => 'system',
            'content' => $system,
        ]);
        $user = json_encode([
            'role' => 'user',
            'content' => $user,
        ]);

        $content = json_encode(array(
            'model' => env('OPENAI_MODEL'),
            'messages' => array(
                array('role' => 'system', 'content' => $system),
                array('role' => 'user', 'content' => $user),
            ),
        ));

        $result = OpenAIHelpers::submitAny("chat/completions", $content);
        return $result;
    }

    public static function submitImage(string $system, string $user, string $image){
        $system = json_encode([
            'role' => 'system',
            'content' => $system,
        ]);
        $user = json_encode([
            'role' => 'user',
            'content' => array(
                array('type' => 'text', 'text' => $user),
                array('type' => 'image_url', 'image_url' => array('url' => "data:image/webp;base64,{$image}")),
            ),
        ]);

        print_r($user);

        $content = json_encode(array(
            'model' => env('OPENAI_MODEL'),
            'messages' => array(
                array('role' => 'system', 'content' => $system),
                array('role' => 'user', 'content' => $user),
            )
        ));

        $result = OpenAIHelpers::submitAny("chat/completions", $content);
        return $result;
    }

    public static function submitTrancription($audio)
    {
        $content = json_encode(array(
            'file' => $audio,
            'model' => 'whisper-1',
        ));

        $result = OpenAIHelpers::submitWhisper("audio/transcriptions", $content);
        return $result;

    }
}
