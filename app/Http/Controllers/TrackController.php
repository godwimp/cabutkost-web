<?php

namespace App\Http\Controllers;

use App\Models\Pengirim;
use App\Models\Barang;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class TrackController extends Controller
{
    public function index()
    {
        return Inertia::render('Track');
    }

    public function search(Request $request)
    {
        try {
            $request->validate([
                'pengirim_id' => 'required|string'
            ]);

            $pengirim = Pengirim::findOrFail($request->pengirim_id);
            $barang = Barang::where('pengirim_id', $pengirim->id)->get();

            return response()->json([
                'pengirim' => $pengirim,
                'barang' => $barang
            ]);
        } catch (\Exception $e) {
            Log::error('Track search error: ' . $e->getMessage());
            return response()->json([
                'message' => 'Terjadi kesalahan saat mencari data'
            ], 500);
        }
    }
}