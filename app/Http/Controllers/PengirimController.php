<?php

namespace App\Http\Controllers;

use App\Models\Pengirim;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class PengirimController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('DetailPengirim');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_pengirim' => 'required|string|max:255',
            'nomor_hp_pengirim' => 'required|string|max:20',
            'email_pengirim' => 'required|string|email|max:255',
            'tanggal_pengiriman' => 'required|date',
            'kecamatan_pengirim' => 'required|string|max:255',
            'alamat_pengirim' => 'required|string',
            'patokan' => 'nullable|string',
            'nomor_kamar_pengirim' => 'nullable|string',
        ]);

        $pengirim = Pengirim::create([
            'nama_pengirim' => $validated['nama_pengirim'],
            'nomor_hp_pengirim' => $validated['nomor_hp_pengirim'],
            'email_pengirim' => $validated['email_pengirim'],
            'tanggal_pengiriman' => $validated['tanggal_pengiriman'],
            'kecamatan_pengirim' => $validated['kecamatan_pengirim'],
            'alamat_pengirim' => $validated['alamat_pengirim'],
            'patokan' => $validated['patokan'],
            'nomor_kamar_pengirim' => $validated['nomor_kamar_pengirim'],
        ]);

        return to_route('detailpenerima') ->with([
            'pengirim_id' => $pengirim->id,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        try {
            $pengirim = Pengirim::findOrFail($id);
            return response()->json([
                'nama_pengirim' => $pengirim->nama_pengirim,
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Hayo mau nyari siapa? Pengirim tidak ditemukan',
            ], 404);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pengirim $pengirim)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pengirim $pengirim)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pengirim $pengirim)
    {
        //
    }
}
