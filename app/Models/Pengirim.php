<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pengirim extends Model
{
    use HasFactory;
    protected $table = 'pengirim';
    protected $fillable = [
        'nama_pengirim',
        'nomor_hp_pengirim',
        'email_pengirim',
        'tanggal_pengiriman',
        'kecamatan_pengirim',
        'alamat_pengirim',
        'patokan',
        'nomor_kamar_pengirim',
    ];

    protected $casts = [
        'tanggal_pengiriman' => 'datetime',
    ];

    public function penerima()
    {
        return $this->hasOne(Penerima::class);
    }

    public function barang()
    {
        return $this->hasMany(Barang::class);
    }
}
