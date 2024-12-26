<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Barang;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PindahanController extends Controller
{
    public function index()
    {
        $pindahan = Barang::with(['pengirim.penerima'])
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($barang) {
                return [
                    'id' => $barang->id,
                    'nama_barang' => $barang->nama_barang,
                    'kategori' => $barang->kategori,
                    'status' => $barang->status,
                    'status_color' => $barang->status_color,
                    'pengirim' => [
                        'nama_pengirim' => $barang->pengirim->nama_pengirim,
                        'alamat_pengirim' => $barang->pengirim->alamat_pengirim,
                    ],
                    'penerima' => [
                        'alamat_penerima' => $barang->pengirim->penerima->alamat_penerima ?? null,
                    ],
                ];
            });

        return Inertia::render('Admin/ManagePindahan', [
            'pindahan' => $pindahan,
        ]);
    }

    public function updateStatus(Request $request)
    {
        $request->validate([
            'id' => 'required|exists:barang,id',
            'status' => 'required|in:' . implode(',', [
                Barang::STATUS_DIPROSES,
                Barang::STATUS_SEDANG_DIAMBIL,
                Barang::STATUS_SEDANG_DIKIRIM,
                Barang::STATUS_SAMPAI
            ])
        ]);

        $barang = Barang::findOrFail($request->id);
        $barang->status = $request->status;
        $barang->save();

        return back()->with('message', 'Status berhasil diperbarui');
    }
}