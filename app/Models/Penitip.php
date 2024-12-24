<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Penitip extends Model
{
    use HasFactory;
    protected $table = 'penitip';
    
    protected $fillable = [
        'nama_penitip',
        'nomor_hp_penitip',
        'email_penitip',
        'tanggal_mulai',
        'tanggal_selesai',
        'kecamatan_penitip',
        'alamat_penitip',
        'patokan',
        'nomor_kamar_penitip'
    ];

    protected $casts = [
        'tanggal_mulai' => 'date',
        'tanggal_selesai' => 'date',
    ];

    public function barangTitipan(): HasMany
    {
        return $this->hasMany(BarangTitipan::class);
    }
}
