<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Lokasi;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;

class LokasiController extends Controller
{
    public function getLokasi(Request $request)
    {
        $search = $request->input('search', '');

        try {
            $lokasi = Lokasi::search($search)->get();
            return response()->json([
                'success' => true,
                'message' => 'Data lokasi berhasil diambil',
                'data' => $lokasi,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Data lokasi gagal diambil',
                'errors' => $e->getMessage(),
            ], 500);
        }
    }

    public function setLokasi(Request $request)
    {
        // Validasi input
        $validator = Validator::make($request->all(), [
            'nama_kecamatan' => 'required|string|max:255',
            'kodepos' => 'required|string|max:255',
        ]);

        // Jika validasi gagal
        if ($validator->fails()){
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Simpan data lokasi

        $lokasi = Lokasi::create([
            'nama_kecamatan' => $request->nama_kecamatan,
            'kodepos' => $request->kodepos,
        ]);

        // Return respon json
        return response()->json([
            'success' => true,
            'message' => 'Data lokasi berhasil disimpan',
            'data' => $lokasi,
        ], 201);
    }
}
