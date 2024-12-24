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
        Schema::create('penitip', function (Blueprint $table) {
            $table->id();
            $table->string('nama_penitip', 255);
            $table->string('nomor_hp_penitip', 15); // Limit phone number length
            $table->string('email_penitip')->unique(); // Ensure unique emails
            $table->date('tanggal_mulai');
            $table->date('tanggal_selesai');
            $table->string('kecamatan_penitip', 100); // Limit district name length
            $table->text('alamat_penitip');
            $table->string('patokan', 255)->nullable();
            $table->string('nomor_kamar_penitip', 50)->nullable(); // Specify length explicitly
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('penitip');
    }
};
