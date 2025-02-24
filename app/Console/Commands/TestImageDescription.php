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
        $image = "https://www.wiley.com/storefront-pdp-assets/_next/image?url=https%3A%2F%2Fmedia.wiley.com%2Fproduct_data%2FcoverImage300%2F66%2F11198003%2F1119800366.jpg&w=640&q=75";
    // Image provided by Logan via Discord.

       /* if (!file_exists($image)) {
        throw new UnexpectedValueException("Image file does not exist at provided path.");
        } */

        $image_description = ImageDescription::generateImageDescription($image, /*true*/);

        echo $image_description . "\n";
    }
}
