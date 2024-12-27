<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Pengirim;
use Illuminate\Http\Request;
use Finller\Invoice\Invoice;
use Inertia\Inertia;

class PindahanController extends Controller
{
    public function index()
    {
        $pindahan = Pengirim::with(['barang', 'penerima'])
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($pengirim) {
                // Check if invoice exists for this pengirim
                $hasInvoice = Invoice::where('buyer_information->name', $pengirim->nama_pengirim)->exists();
                
                return [
                    'id' => $pengirim->id,
                    'nama_pengirim' => $pengirim->nama_pengirim,
                    'alamat_awal' => $pengirim->alamat_pengirim,
                    'alamat_akhir' => $pengirim->penerima->alamat_penerima ?? null,
                    'barang' => $pengirim->barang->map(function ($barang) {
                        return [
                            'nama_barang' => $barang->nama_barang,
                            'kategori' => $barang->kategori,
                            'status' => $barang->status,
                        ];
                    }),
                    'status' => $pengirim->barang->first()?->status ?? 'Diproses',
                    'status_color' => $pengirim->barang->first()?->status_color ?? 'bg-yellow-100 text-yellow-800',
                    'has_invoice' => $hasInvoice,
                ];
            });

        return Inertia::render('Admin/ManagePindahan', [
            'pindahan' => $pindahan,
        ]);
    }

    public function updateStatus(Request $request)
    {
        $request->validate([
            'pengirim_id' => 'required|exists:pengirim,id',
            'status' => 'required|in:Diproses,Sedang Diambil,Sedang Dikirim,Sampai'
        ]);

        $pengirim = Pengirim::findOrFail($request->pengirim_id);
        $pengirim->barang()->update(['status' => $request->status]);

        return back()->with('message', 'Status berhasil diperbarui');
    }
}