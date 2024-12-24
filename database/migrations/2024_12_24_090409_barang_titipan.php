<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('barang_titipan', function (Blueprint $table) {
            $table->id();
            $table->foreignId('penitip_id')->constrained('penitip')->onDelete('cascade'); // Foreign key to penitip
            $table->string('nama_barang', 255); // Specify length explicitly
            $table->integer('jumlah_barang')->default(1); // Default minimum value
            $table->decimal('berat_barang', 10, 2); // Adjust precision and scale
            $table->text('deskripsi_barang')->nullable();
            $table->string('foto_barang')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('barang_titipan');
    }
};
