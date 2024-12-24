<?php

namespace App\Http\Controllers;

use App\Models\Penerima;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Inertia\Inertia;

class PenerimaController extends Controller
{
    public function index()
    {
        return Inertia::render('DetailPenerima');
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'nama_penerima' => 'required|string|max:255',
                'nomor_hp_penerima' => 'required|string|max:20',
                'email_penerima' => 'required|string|email|max:255',
                'kecamatan_penerima' => 'required|string|max:255',
                'alamat_penerima' => 'required|string',
                'nomor_kamar_penerima' => 'nullable|string',
                'pengirim_id' => 'required|exists:pengirim,id',
            ]);

            $penerima = Penerima::create($validated);

            return redirect()
                ->route('informasibarang')
                ->with('message', 'Data penerima berhasil disimpan')
                ->with('pengirim_id', $penerima->pengirim_id);
        } catch (\Exception $e) {
            return redirect()
                ->back()
                ->withInput()
                ->with('message', 'Terjadi kesalahan saat menyimpan data penerima');
        }
    }

    public function show($id)
    {
        try {
            $penerima = Penerima::findOrFail($id);
            return response()->json([
                'nama_penerima' => $penerima->nama_penerima,
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Penerima tidak ditemukan',
            ], 404);
        }
    }
}