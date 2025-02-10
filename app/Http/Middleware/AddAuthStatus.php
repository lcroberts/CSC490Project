<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Middleware;

class AddAuthStatus extends Middleware
{
    public function share(Request $request)
    {
        return array_merge(parent::share($request), [
            'isLoggedIn' => Auth::user() ? true : false,
        ]);
    }
}
