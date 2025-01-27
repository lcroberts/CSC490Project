<?php

namespace App\Console\Commands;

use App\Helpers\OpenAIHelpers;
use Illuminate\Console\Command;

class TestApi extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:test-api';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Ensures that contact with the OpenAI API is functioning (will result in small charge)';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $result = OpenAIHelpers::submitCompletion("You are a helpful assistant.", "Write a haiku about recursion in programming.");
        echo $result;
    }
}
