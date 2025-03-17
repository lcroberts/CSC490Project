<?php

namespace App\Http\Controllers;

use App\Models\Summary;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SummaryController extends Controller
{
    public function generate(Request $request)
    {
        $noteContent = $request->input('noteContent');
        $forceGeneration = $request->input('forceGeneration', false);

        $summary = Summary::generateTextSummary($noteContent, $forceGeneration);

        return response()->json(['summary' => $summary]);
    }
}
