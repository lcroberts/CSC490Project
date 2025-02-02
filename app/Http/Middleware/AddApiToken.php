<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class AddApiToken extends Middleware
{
    public function share(Request $request)
    {
        return array_merge(parent::share($request), ['apiToken' => $request->user()->getApiToken()]);
    }
}
