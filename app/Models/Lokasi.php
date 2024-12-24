<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lokasi extends Model
{
    protected $table = 'kecamatan';
    protected $fillable = ['nama_kecamatan', 'kodepos'];
    
    // Search function
    public function scopeSearch($query, $search)
    {
        return $query->where('nama_kecamatan', 'like', '%' . $search . '%')
            ->orWhere('kodepos', 'like', '%' . $search . '%');
    }
}
