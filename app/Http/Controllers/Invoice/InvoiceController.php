<?php

namespace App\Http\Controllers\Invoice;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Pengirim;
use Finller\Invoice\Invoice;
use Finller\Invoice\InvoiceItem;
use Inertia\Inertia;
// gate for authorization
use Illuminate\Support\Facades\Gate;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Log;

class InvoiceController extends Controller
{
    public function index()
    {
        $invoices = Invoice::orderBy('created_at', 'desc')->get();
        return Inertia::render('Admin/InvoiceIndex', [
            'invoices' => $invoices,
        ]);
    }

    public function show($id)
    {
        $invoice = Invoice::with('items')->findOrFail($id);
        return Inertia::render('Admin/InvoiceShow', [
            'invoice' => $invoice,
        ]);
    }

    public function download($id)
    {
        /**
         * @var Invoice $invoice
         */
        $invoice = Invoice::where('id', $id)->firstOrFail();
        Log::info('User role: ' . auth()->user()->role);  // tambahkan ini
        Gate::authorize('view', $invoice);
        return $invoice->toPdfInvoice()->download();
    }

    public function create($pengirim_id)
    {
        $pengirim = Pengirim::with('barang')->findOrFail($pengirim_id);
        return Inertia::render('Admin/CreateNewInvoice', [
            'pengirim' => $pengirim
        ]);
    }

    public function store(Request $request) 
    {
        $request->validate([
            'pengirim_id' => 'required|exists:pengirim,id',
            'items' => 'required|array',
            'items.*.unit_price' => 'required|numeric|min:0',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        $pengirim = Pengirim::with('barang')->findOrFail($request->pengirim_id);
        
        try {
            $invoice = new Invoice();
            $invoice->seller_information = config('invoices.default_seller');
            $invoice->currency = 'IDR';
            $invoice->buyer_information = [
                'name' => $pengirim->nama_pengirim,
                'address' => [
                    'street' => $pengirim->alamat_pengirim,
                    'city' => $pengirim->kota ?? 'N/A',
                    'postal_code' => $pengirim->kode_pos ?? 'N/A',
                    'state' => $pengirim->provinsi ?? 'N/A',
                    'country' => 'Indonesia',
                ],
                'email' => $pengirim->email_pengirim,
                'phone_number' => $pengirim->no_telp ?? 'N/A',
                'company_number' => $pengirim->id
            ];
            $invoice->save();

            foreach ($request->items as $item) {
                $invoice->items()->create([
                    'label' => $item['nama_barang'],
                    'description' => $item['kategori'],
                    'unit_price' => $item['unit_price'],
                    'quantity' => $item['quantity'],
                ]);
            }

            return redirect()->route('admin.invoice.show', $invoice->id)
                ->with('message', 'Invoice berhasil dibuat');
        } catch (\Exception $e) {
            return redirect()->back()
                ->withErrors(['error' => 'Gagal membuat invoice: ' . $e->getMessage()]);
        }
    }
}