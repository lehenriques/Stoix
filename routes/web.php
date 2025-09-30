<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\TaskController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('tasks', function () {
    return Inertia::render('tasks');
})->name('tasks');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

// API Routes for Tasks
Route::prefix('api')->group(function () {
    Route::apiResource('tasks', TaskController::class);
    Route::get('csrf-token', function () {
        return response()->json(['token' => csrf_token()]);
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
