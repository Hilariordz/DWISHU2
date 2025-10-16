<?php

use App\Http\Controllers\ProfileController;
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

Route::get('/gallery', function () {
    return Inertia::render('Gallery');
})->name('gallery');

// Ruta temporal para visualizar el diseño 404
Route::get('/test-404', function () {
    return Inertia::render('Errors/Error404');
})->name('test-404');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    // Rutas para las notas
    Route::apiResource('notas', \App\Http\Controllers\NotaController::class);
    Route::delete('/notas-multiple', [\App\Http\Controllers\NotaController::class, 'destroyMultiple'])->name('notas.destroy-multiple');
});

require __DIR__.'/auth.php';
