<?php

use App\Http\Controllers\BarangController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\LokasiController;
use App\Http\Controllers\TrackController;
use App\Http\Controllers\PengirimController;
use App\Http\Controllers\PenerimaController;
use App\Http\Controllers\PenitipController;
use App\Http\Controllers\BarangTitipanController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


require __DIR__.'/api.php';
require __DIR__.'/auth.php';

// fallback route
Route::fallback(function () {
    return Inertia::render('NoPage');
});

// Public routes
Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

// Route ke Rates
Route::get('/rates', function () {
    return Inertia::render('Rates');
})->name('rates');

// ROUTING PENGIRIMAN
// PENGIRIMAN PAGE
Route::get('/pengiriman', function () {
    return Inertia::render('Pengiriman');
})->name('pengiriman');

// DETAIL PENGIRIM
Route::get('/detailpengirim', function () {
    return Inertia::render('DetailPengirim', [
        'pengirim_id' => request()->query('pengirim_id'),
    ]);
})->name('detailpengirim');

Route::post('/pengirim', [PengirimController::class, 'store'])->name('pengirim.store');

// DETAIL PENERIMA
Route::get('/detailpenerima', function () {
    return Inertia::render('DetailPenerima', [
        'pengirim_id' => request()->query('pengirim_id'),
    ]);
})->name('detailpenerima');

Route::post('/penerima', [PenerimaController::class, 'store'])->name('penerima.store');

// DETAIL BARANG
Route::get('/informasibarang', function () {
    return Inertia::render('InformasiBarang', [
        'pengirim_id' => request()->query('pengirim_id'),
    ]);
})->name('informasibarang');

Route::post('/barang', [BarangController::class, 'store'])->name('barang.store');

// RINGKASAN PEMBAYARAN
Route::get('/ringkasanpembayaran', function () {
    return Inertia::render('RingkasanPembayaranKirim');
})->name('ringkasanpembayaran');

//ROUTING PENITIPAN
// PENITIPAN PAGE
Route::get('/penitipan', function () {
    return Inertia::render('Penitipan');
})->name('penitipan');

// DETAIL PENITIP
Route::get('/detailpenitip', function () {
    return Inertia::render('DetailPenitip');
})->name('detailpenitip');

Route::post('/penitip', [PenitipController::class, 'store'])->name('penitip.store');

// INFORMASI BARANG TITIPAN
Route::get('/informasibarangtitipan', function () {
    return Inertia::render('InformasiBarangTitipan', [
        'penitip_id' => request()->query('penitip_id'),
    ]);
})->name('informasibarangtitipan');

Route::post('/barangtitipan', [BarangTitipanController::class, 'store'])->name('barangtitipan.store');

// RINGKASAN PEMBAYARAN TITIPAN
Route::get('/ringkasanpembayarantitipan', function () {
    return Inertia::render('RingkasanPembayaranTitipan');
})->name('ringkasanpembayarantitipan');


// ROUTE UNTUK USER TRACKING
Route::get('/track', [TrackController::class, 'index'])->name('track.index');
Route::post('/track/search', [TrackController::class, 'search'])->name('track.search');

// Authentication routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Admin/Dashboard');
    })->name('dashboard');

    Route::controller(ProfileController::class)->group(function () {
        Route::get('/profile', 'edit')->name('profile.edit');
        Route::patch('/profile', 'update')->name('profile.update');
        Route::delete('/profile', 'destroy')->name('profile.destroy');
    });
});

