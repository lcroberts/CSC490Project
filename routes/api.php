<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->name('api.')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    })->name('user');
});
