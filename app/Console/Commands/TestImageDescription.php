<?php

namespace App\Console\Commands;

use App\Models\ImageDescription;
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
    $image = fopen("filenamehere", "r") or die("Unable to open file!");

    if (empty($image)) {
        throw new UnexpectedValueException("Empty image provided.");
    }

    $image_description = ImageDescription::generateImageDescription($image, true);

    echo $image_description . "\n";
    fclose($image);
    }
}
