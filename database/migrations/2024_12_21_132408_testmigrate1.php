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
        Schema::create('pengirim', function (Blueprint $table) {
            $table->id();
            $table->string('nama_pengirim');
            $table->string('nomor_hp_pengirim');
            $table->string('email_pengirim');
            $table->date('tanggal_pengiriman');
            $table->string('kecamatan_pengirim');
            $table->string('alamat_pengirim');
            $table->string('patokan');
            $table->string('nomor_kamar_pengirim');
            $table->timestamps();
        });

        Schema::create('penerima', function (Blueprint $table) {
            $table->id();
            $table->string('nama_penerima');
            $table->string('nomor_hp_penerima');
            $table->string('email_penerima');
            $table->string('kecamatan_penerima');
            $table->string('alamat_penerima');
            $table->string('nomor_kamar_penerima');
            $table->timestamps();
        });

        Schema::create('barang', function (Blueprint $table) {
            // in the form submission, the barang is by checklist, for example, if they checklist 'Televisi', then it will be inputted to the database
            $table->id();
            $table->string('barang');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pengirim');
        Schema::dropIfExists('penerima');
        Schema::dropIfExists('barang');
    }
};
