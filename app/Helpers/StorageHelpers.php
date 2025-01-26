<?php

namespace App\Helpers;

use Illuminate\Contracts\Filesystem\Cloud;
use Illuminate\Support\Facades\Storage;

class StorageHelpers
{
    /**
     * Generates an s3 disk that you can use for files. If the APP_ENV is set to local it will use a root directory based off of your computers hostname.
     * You can override the root directory by setting AWS_S3_ROOT in the .env file. You can also manually set the root as well.
     *
     * @param  string  $root  root path for the disk object
     * @return Cloud
     */
    public static function getS3Disk(?string $root = null)
    {
        if ($root === null && env('AWS_S3_ROOT') === null) {
            switch (env('APP_ENV', 'local')) {
                case 'local':
                    $root = env('HOSTNAME', 'unknown');
                    break;

                default:
                    $root = env('APP_ENV');
                    break;
            }
        } elseif ($root === null && env('AWS_S3_ROOT') !== null) {
            $root = env('AWS_S3_ROOT');
        }
        $config = config('filesystems.disks.s3');
        $config['root'] = $root;

        return Storage::build($config);
    }
}
