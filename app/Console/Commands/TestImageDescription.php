<?php

namespace App\Console\Commands;

use App\Models\ImageDescription;
use App\Helpers\OpenAIHelpers;
use Illuminate\Console\Command;
use UnexpectedValueException;

class TestImageDescription extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:test-image-description';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Tests image description prompts (will result in small charge.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $image = "C:\Users\unclu\Downloads\Dog Ear Picket.JPG";
    // Image sourced from myself.

        if (!file_exists($image)) {
            throw new UnexpectedValueException("Image file does not exist at provided path.");
        }

        $image_description = ImageDescription::generateImageDescription($image);

        echo $image_description . "\n";
    }
}
