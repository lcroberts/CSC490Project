<?php

namespace App\Console\Commands;

use App\Models\AudioTranscript;
use Illuminate\Console\Command;
use UnexpectedValueException;

class TestAudioTranscript extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:test-audio-transcript';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $file = "tests/TestData/General American 1 ｜ IDEA： International Dialects of English Archive (1) [general-american-1-1].mp3";

        if (!file_exists($file)) {
            throw new UnexpectedValueException("Audio transcript not found.");
        }

        $audio_transcript = AudioTranscript::generateAudioTranscript($file);

        print_r($audio_transcript);
    }
}
