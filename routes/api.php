<?php

use App\Http\Controllers\BarangController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\LokasiController;
use App\Http\Controllers\PengirimController;
use App\Http\Controllers\PenitipController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Inertia\Inertia;

// API routes
Route::prefix('api')->group(function () {
    Route::get('/lokasi', [LokasiController::class, 'getLokasi'])->name('api.lokasi');
    Route::get('/pengirim/{id}', [PengirimController::class, 'show'])->name('api.pengirim');
    Route::get('/penitip/{id}', [PenitipController::class, 'show'])->name('api.penitip');
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return response()->json(['user' => $request->user()]);
});