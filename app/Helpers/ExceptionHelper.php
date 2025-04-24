<?php

namespace App\Helpers;

use Exception;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Support\Facades\Log;

class ExceptionHelper
{
    private static function getStatusCode(Exception $exception)
    {
        if ($exception instanceof AuthenticationException) {
            return 401;
        }

        return 500;
    }

    public static function handleException(Exception $exception)
    {
        $response = [];
        $statusCode = self::getStatusCode($exception);

        switch ($statusCode) {
            case 401:
                $response['message'] = 'Unauthorized';
                break;
            default:
                $response['message'] = 'Whoops, something went wrong!';
                break;
        }

        Log::error(__METHOD__.$exception->getMessage().PHP_EOL.$exception->getTraceAsString());

        if (config('app.debug')) {
            $response['err_code'] = $exception->getCode();
            $response['trace'] = $exception->getTrace();
        }

        $response['status'] = $statusCode;

        return response()->json($response, $statusCode);
    }
}
