<?php

namespace App\Models;

use App\Helpers\OpenAIHelpers;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use UnexpectedValueException;

class Summary
{
    public int $id;
    public string $content;

    public static function generateAndSave(string $note_content): string
    {
        $response = OpenAIHelpers::submitCompletion(
            "You will be provided with a document delimited by three brackets. \
            First, summarize the document in 2 paragraphs with a prefix that says 'Summary:'. \
            Ensure that the summary is detailed and thorough, covering the core ideas of the text and providing relevant information for those core ideas to be understood. \
            Rely only on the provided text, do not include external information. \
            Then, write a list of all vocabulary terms in the text and their definitions, with a prefix that says 'Vocabulary'. \
            The vocabulary list should be formatted as word: definition.",
            "{{{" . $note_content . "}}}"
        );

        if (empty($response)) {
            throw new UnexpectedValueException("Empty string was returned by API while generating summary.");
        }

        return $response;
    }
}
