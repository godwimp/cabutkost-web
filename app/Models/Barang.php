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
        'status',
    ];

    const STATUS_DIPROSES = 'Diproses';
    const STATUS_SEDANG_DIAMBIL = 'Sedang Diambil';
    const STATUS_SEDANG_DIKIRIM = 'Sedang Dikirim';
    const STATUS_SAMPAI = 'Sampai';

    public function pengirim()
    {
        return $this->belongsTo(Pengirim::class);
    }

    public function getStatusColorAttribute()
    {
        return match($this->status) {
            self::STATUS_DIPROSES => 'bg-yellow-100 text-yellow-800',
            self::STATUS_SEDANG_DIAMBIL => 'bg-blue-100 text-blue-800',
            self::STATUS_SEDANG_DIKIRIM => 'bg-purple-100 text-purple-800',
            self::STATUS_SAMPAI => 'bg-green-100 text-green-800',
            default => 'bg-gray-100 text-gray-800'
        };
    }
}