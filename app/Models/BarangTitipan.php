<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BarangTitipan extends Model
{
    protected $table = 'barang_titipan';
    
    protected $fillable = [
        'penitip_id',
        'jumlah_barang',
        'berat_barang',
        'deskripsi_barang',
        'foto_barang'
    ];

    public function penitip(): BelongsTo
    {
        return $this->belongsTo(Penitip::class);
    }
}
