<?php

use App\Http\Controllers\ImageDescriptionController;
use App\Http\Controllers\NoteController;
use App\Http\Controllers\SummaryController;
use App\Http\Controllers\AudioTranscriptController;
use App\Http\Controllers\TagController;
use App\Http\Middleware\AddApiToken;
use App\Http\Middleware\AddAuthStatus;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum', AddApiToken::class, AddAuthStatus::class])->group(function () {
    Route::prefix('notes')->group(function () {
        Route::get('/', [NoteController::class, 'index'])->name('index');
        Route::get('/{note_id}', [NoteController::class, 'get'])->name('get');
        Route::delete('/{note_id}/delete', [NoteController::class, 'delete'])->name('delete');

        Route::post('/create', [NoteController::class, 'store'])->name('create');
        Route::put('/save', [NoteController::class, 'alter'])->name('save');
    });
    Route::prefix('media')->group(function () {
        Route::get('/{note_id}', [NoteController::class, 'indexMedia'])->name('index');
        Route::get('/{note_id}/{name}', [NoteController::class, 'getMedia'])->name('get');
        Route::delete('/{note_id}/{name}/delete', [NoteController::class, 'deleteMedia'])->name('delete');

        Route::post('/create', [NoteController::class, 'addMedia'])->name('add');
    });
    Route::prefix('tags')->group(function () {
        Route::get('/{note_id}', [TagController::class, 'get'])->name('get');
        Route::post('/{note_id}', [TagController::class, 'generate'])->name('create');
        Route::delete('/{tag_id}/delete', [TagController::class, 'delete'])->name('delete');
    });
    Route::prefix('summary')->group(function () {
        Route::post('/send', [SummaryController::class, 'sendText'])->name('send');
    });
    Route::prefix('description')->group(function () {
        Route::post('/send', [ImageDescriptionController::class, 'sendImage'])->name('send');
    });
    Route::prefix('transcript')->group(function () {
       Route::post('/send', [AudioTranscriptController::class, 'sendAudio'])->name('send');
    });
});
