<?php

namespace App\Models;

use App\Helpers\OpenAIHelpers;
use DateInterval;
use Illuminate\Support\Facades\Cache;
use UnexpectedValueException;

class Summary
{
    public int $id;

    public string $content;

    public static function generateTextSummary(string $note_content, bool $force_generation = false, int $nParagraphs, bool $includeVocabList): string
    {
        $hash = hash('sha256', $note_content);
        if ((! $force_generation) && (Cache::has($hash))) {
            return Cache::get($hash);
        }
        if ($includeVocabList) {
            $response = OpenAIHelpers::submitCompletion(
                "You will be provided with a document delimited by three brackets. \
            First, summarize the document in ".$nParagraphs." paragraphs with a prefix that says 'Summary:'. \
            Write the summary in markdown format. \
            Each paragraph should be at most 150 words, with the exception of markdown formatting and special characters. \
            Ensure that the summary is detailed and thorough, covering the core ideas of the text and providing relevant information for those core ideas to be understood. \
            Rely only on the provided text, do not include external information. \
            Then, write a list of all vocabulary terms in the text and their definitions, with a prefix that says 'Vocabulary'. \
            The vocabulary list should be formatted as 'word': 'definition'.",
                '{{{'.$note_content.'}}}'
            ); // Response is a JSON object
        } else {
            $response = OpenAIHelpers::submitCompletion(
                "You will be provided with a document delimited by three brackets. \
                First, summarize the document in ".$nParagraphs." paragraphs with a prefix that says 'Summary:'. \
                Write the summary in markdown format. \
                Each paragraph should be at most 150 words, with the exception of markdown format and special characters. \
                Ensure that the summary is detailed and thorough, covering the core ideas of the text and providing relevant information for those core ideas to be understood. \
                Rely only on the provided text, do not include external information." ,
                '{{{'.$note_content.'}}}'
            );
        }


        // Decode JSON object to extract only plain text summary
        $json = json_decode($response);
        if (empty($json)) {
            throw new UnexpectedValueException('Empty JSON object was returned by API while generating summary.');
        }

        // Extract summary as string
        $summary = $json->choices[0]->message->content;

        $duration = new DateInterval('P1W');
        Cache::add($hash, $summary, $duration);

        return $summary;
    }
}
