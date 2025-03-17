<?php

use App\Http\Controllers\NoteController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::prefix('notes')->group(function () {
        Route::get('/', [NoteController::class, 'index'])->name('index');
        Route::get('/{note_id}', [NoteController::class, 'get'])->name('get');
        Route::delete('/{note_id}/delete', [NoteController::class, 'delete'])->name('delete');

        Route::post('/create', [NoteController::class, 'store'])->name('create');
        Route::put('/save', [NoteController::class, 'alter'])->name('save');
    });
    Route::prefix('media')->group(function() {
        Route::get('/{note_id}', [NoteController::class, 'indexMedia'])->name('index');
        Route::get('/{note_id}/{name}', [NoteController::class, 'getMedia'])->name('get');
        Route::delete('/{note_id}/{name}/delete', [NoteController::class, 'deleteMedia'])->name('delete');

        Route::post('/create', [NoteController::class, 'addMedia'])->name('add');
    });
});
