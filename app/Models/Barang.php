<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Barang extends Model
{
    use HasFactory;

    protected $table = 'barang';
    protected $fillable = [
        'nama_barang',
        'kategori',
        'pengirim_id',
    ];

    public function pengirim()
    {
        return $this->belongsTo(Pengirim::class);
    }
}
