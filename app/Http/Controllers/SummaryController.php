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
        ]);

         
        try {
            $noteContent = $request->input('noteContent');
            $forceGeneration = $request->input('forceGeneration', false);

            $summary = Summary::generateTextSummary($noteContent, $forceGeneration);
        } catch (Exception $err) {
            return ExceptionHelper::handleException($err);
        }

        return response()->json(['summary' => $summary]);
    }
}
