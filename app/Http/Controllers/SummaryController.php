<?php

namespace App\Http\Controllers;

use App\Helpers\ExceptionHelper;
use App\Models\Summary;
use Exception;
use Illuminate\Http\Request;
use function Webmozart\Assert\Tests\StaticAnalysis\string;

class SummaryController extends Controller
{
    public function sendText(Request $request)
    {
        $request->validate([
            'noteContent' => 'required',
            'forceGeneration' => 'nullable|boolean',
            'nParagraphs' => 'nullable|integer',
            'includeVocabList' => 'nullable|boolean',
        ]);


        try {
            $noteContent = $request->input('noteContent');
            $forceGeneration = $request->input('forceGeneration', false);
            $nParagraphs = $request->input('nParagraphs', 1);
            $includeVocabList = $request->input('includeVocabList', false);

            $summary = Summary::generateTextSummary($noteContent, $forceGeneration);
        } catch (Exception $err) {
            return ExceptionHelper::handleException($err);
        }

        return response()->json(['summary' => $summary]);
    }
}
