<?php

namespace App\Http\Controllers;

use App\Models\BarangTitipan;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Inertia\Inertia;

class BarangTitipanController extends Controller
{
    public function index()
    {
        return Inertia::render('DetailBarangTitipan');
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'penitip_id' => 'required|exists:penitip,id',
                'jumlah_barang' => 'required|integer|min:1',
                'berat_barang' => 'required|numeric|min:0.1',
                'deskripsi_barang' => 'nullable|string',
                'foto_barang' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            ]);

            if ($request->hasFile('foto_barang')) {
                $file = $request->file('foto_barang');
                $path = $file->store('public/uploads/barang_titipan', 'public');
                $validated['foto_barang'] = $path;
            }

            $barangTitipan = BarangTitipan::create($validated);

            return redirect()
                ->route('ringkasan-pembayaran')
                ->with('message', 'Data barang titipan berhasil disimpan')
                ->with('barang_titipan_id', $barangTitipan->id);
        } catch (\Exception $e) {
            return redirect()
                ->back()
                ->withInput()
                ->with('message', 'Terjadi kesalahan saat menyimpan data barang titipan');
        }
    }

    public function show($id)
    {
        try {
            $barangTitipan = BarangTitipan::findOrFail($id);
            return response()->json($barangTitipan);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Barang titipan tidak ditemukan',
            ], 404);
        }
    }

    public function updateStatus(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required|exists:barang_titipan,id',
            'status' => 'required|in:Diproses,Dijemput,Disimpan,Diambil',
        ]);

        $barangTitipan = BarangTitipan::findOrFail($validated['id']);
        $barangTitipan->status = $validated['status'];
        $barangTitipan->save();

        return redirect()
            ->back()
            ->with('message', 'Status barang titipan berhasil diubah');
    }
}