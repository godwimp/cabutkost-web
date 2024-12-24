<?php

namespace App\Http\Controllers;

use App\Models\Penitip;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Inertia\Inertia;

class PenitipController extends Controller
{
    public function index()
    {
        return Inertia::render('DetailPenitip');
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'nama_penitip' => 'required|string|max:255',
                'nomor_hp_penitip' => 'required|string|min:10|max:13',
                'email_penitip' => 'required|email|max:255',
                'tanggal_mulai' => 'required|date',
                'tanggal_selesai' => 'required|date|after:tanggal_mulai',
                'kecamatan_penitip' => 'required|string|max:255',
                'alamat_penitip' => 'required|string',
                'patokan' => 'nullable|string|max:255',
                'nomor_kamar_penitip' => 'nullable|string|max:255',
            ]);

            $penitip = Penitip::create($validated);

            return redirect()
                ->route('informasi-barang-titipan')
                ->with('message', 'Data penitip berhasil disimpan')
                ->with('penitip_id', $penitip->id);
        } catch (\Exception $e) {
            return redirect()
                ->back()
                ->withInput()
                ->with('message', 'Terjadi kesalahan saat menyimpan data penitip');
        }
    }

    public function show($id)
    {
        try {
            $penitip = Penitip::findOrFail($id);
            return response()->json([
                'nama_penitip' => $penitip->nama_penitip,
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Penitip tidak ditemukan',
            ], 404);
        }
    }
}