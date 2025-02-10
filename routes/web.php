<?php

use App\Http\Controllers\ProfileController;
use App\Http\Middleware\AddApiToken;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Authenticated routes go here
Route::middleware(['auth', AddApiToken::class])->group(function () {
    // Route::group([
    //     'prefix' => 'example', // Route prefix, in this case all routes in this group start with '/example/'
    //     'name' => 'example.', // Route name prefix, in this case all route names start with 'example.'
    // ], function () {
    //     // This is an example route. Since it is the example group it's prefixed with '/example'
    //     // Since it has the name of index, it's full route name is 'example.index' so a url to it can be generated
    //     // using `route('example.index')`
    //     // The route uses the index function on the ExampleModelController class to handle the request
    //     Route::get('/', [ExampleModelController::class, 'index'])->name('index');

    //     // {id} indicates a route parameter.
    //     Route::get('/get/{id}', [ExampleModelController::class, 'get'])->name('get');

    //     // Normally update routes would be a post request with a form submit but this is a simplified example.
    //     Route::get('/update/{id}', [ExampleModelController::class, 'update'])->name('update');

    //     // Create should also normally be a post request and be handled in a controller
    //     Route::get('/create', function (Request $request) {
    //         $obj = new ExampleModel;
    //         $obj->test1 = 'Hello world';
    //         $obj->test2 = 292992;
    //         $obj->save($request->user()->id);
    //     });
    // });

    Route::get('/editor', function () {
        return Inertia::render('EditorTest', []);
    })->name('editor');
});

// Here's a route where I'm testing the sidebar (Philip)
Route::get('/sidebar', function () {
    return Inertia::render('SidebarTest', []);
})->name('sidebar');

// Unauthenticated routes go here
Route::middleware([])->group(function () {});

require __DIR__.'/auth.php';
