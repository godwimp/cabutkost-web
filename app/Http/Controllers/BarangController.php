<?php

namespace App\Http\Controllers;

use App\Models\Barang;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Inertia\Inertia;

class BarangController extends Controller
{
    public function index()
    {
        return Inertia::render('DetailBarang');
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'elektronik' => 'nullable|array',
                'furniture' => 'nullable|array',
                'etc' => 'nullable|string|max:255',
                'pengirim_id' => 'required|exists:pengirim,id',
            ]);

            if(!empty($validated['elektronik'])){
                foreach($validated['elektronik'] as $elektronik) {
                    Barang::create([
                        'kategori' => 'elektronik', 
                        'nama_barang' => $elektronik,
                        'pengirim_id' => $validated['pengirim_id'],
                    ]);
                }
            }

            if(!empty($validated['furniture'])){
                foreach($validated['furniture'] as $furniture) {
                    Barang::create([
                        'kategori' => 'furniture', 
                        'nama_barang' => $furniture,
                        'pengirim_id' => $validated['pengirim_id'],
                    ]);
                }
            }

            if(!empty($validated['etc'])){
                Barang::create([
                    'kategori' => 'etc', 
                    'nama_barang' => $validated['etc'],
                    'pengirim_id' => $validated['pengirim_id'],
                ]);
            }

            return redirect()->route('ringkasanpembayaran')
                ->with('message', 'Data barang berhasil disimpan');
        } catch (\Exception $e) {
            return redirect()
                ->back()
                ->withInput()
                ->with('message', 'Terjadi kesalahan saat menyimpan data barang');
        }
    }

    public function show($id)
    {
        try {
            $barang = Barang::where('pengirim_id', $id)->get();
            return response()->json($barang);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Barang tidak ditemukan',
            ], 404);
        }
    }
}