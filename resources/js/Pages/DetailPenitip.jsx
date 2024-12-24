import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import SelectLokasi from '@/Components/SelectLokasi';
import { useStorage } from '@/contexts/StorageContext';

const ArrowRight = "images/panah.png";

const DetailPenitip = () => {
  const { setStorageData } = useStorage();
  const [formData, setFormData] = useState({
    nama_penitip: '',
    nomor_hp_penitip: '',
    email_penitip: '',
    tanggal_mulai: '',
    tanggal_selesai: '',
    kecamatan_penitip: '',
    alamat_penitip: '',
    patokan: '',
    nomor_kamar_penitip: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleLokasiChange = (selectedLocation) => {
    setFormData(prevState => ({
      ...prevState,
      kecamatan_penitip: selectedLocation ? selectedLocation.label : ''
    }));
  };

  const validateForm = () => {
    const errors = [];
    if (!formData.nama_penitip.trim()) errors.push("Isi nama penitip terlebih dahulu!");
    if (!formData.nomor_hp_penitip.trim()) errors.push("Isi nomor HP penitip terlebih dahulu!");
    if (!/^[0-9]{10,13}$/.test(formData.nomor_hp_penitip)) errors.push("Nomor HP tidak valid");
    if (!formData.email_penitip.trim()) errors.push("Isi email penitip terlebih dahulu!");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email_penitip)) errors.push("Format Email tidak valid");
    if (!formData.tanggal_mulai) errors.push("Isi tanggal mulai terlebih dahulu!");
    if (!formData.tanggal_selesai) errors.push("Isi tanggal selesai terlebih dahulu!");
    if (!formData.kecamatan_penitip) errors.push("Pilih kecamatan terlebih dahulu!");
    if (!formData.alamat_penitip.trim()) errors.push("Isi alamat terlebih dahulu!");
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      alert("Error: \n" + validationErrors.join("\n"));
      return;
    }

    router.post('/penitip', formData, {
      preserveScroll: true,
      onSuccess: (page) => {
        const penitip_id = page.props?.flash?.penitip_id;
        if (penitip_id) {
          setStorageData({ penitip_id });
          router.visit('/informasibarangtitipan');
        }
      },
      onError: (errors) => {
        const errorMessages = Object.values(errors).flat();
        alert("Error saat menyimpan data: \n" + errorMessages.join("\n"));
      }
    });
  };

  return (
      <>
          <Head title="Detail Penitip" />
          <div className="flex flex-col items-center pt-[100px] py-[60px] px-[100px]">
              {/* Navigation Steps */}
              <div className="bg-white p-6 rounded-3xl shadow-md w-full">
                  <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                          <div className="flex items-center justify-center h-8 w-8 bg-btncolor text-white rounded-full ml-10">
                              1
                          </div>
                          <p className="text-xl font-bold">Detail Penitip</p>
                      </div>
                      <span className="text-gray-500">
                          <img src={ArrowRight} alt="" />
                      </span>
                      <div className="flex items-center gap-2">
                          <div className="flex items-center justify-center h-8 w-8 bg-gray-400 text-white rounded-full">
                              2
                          </div>
                          <p className="text-xl">Informasi Barang</p>
                      </div>
                      <span className="text-gray-500">
                          <img src={ArrowRight} alt="" />
                      </span>
                      <div className="flex items-center gap-2">
                          <div className="flex items-center justify-center h-8 w-8 bg-gray-400 text-white rounded-full">
                              3
                          </div>
                          <p className="text-xl mr-10">Ringkasan Pembayaran</p>
                      </div>
                  </div>
              </div>

              {/* Form */}
              <form
                  onSubmit={handleSubmit}
                  className="bg-white p-6 rounded-3xl shadow-md w-full mt-12"
              >
                  <div className="flex flex-row items-center justify-start gap-3 mb-4">
                      <div className="flex items-center justify-center h-9 w-9 bg-btncolor text-white rounded-full">
                          1
                      </div>
                      <p className="text-xl font-medium">Informasi Penitip</p>
                  </div>

                  <div className="flex flex-row items-center justify-center gap-6">
                      <div className="flex-1 mb-4">
                          <label className="block text-gray-700 font-medium mb-1">
                              Nama Penitip
                          </label>
                          <input
                              type="text"
                              name="nama_penitip"
                              value={formData.nama_penitip}
                              onChange={handleChange}
                              placeholder="Masukkan Nama"
                              className="w-full border rounded-lg px-3 py-2 text-gray-700 focus:outline-none"
                          />
                      </div>
                      <div className="flex-1 mb-4">
                          <label className="block text-gray-700 font-medium mb-1">
                              Nomor Handphone
                          </label>
                          <input
                              type="tel"
                              name="nomor_hp_penitip"
                              value={formData.nomor_hp_penitip}
                              onChange={handleChange}
                              placeholder="Masukkan Nomor Handphone"
                              className="w-full border rounded-lg px-3 py-2 text-gray-700 focus:outline-none"
                          />
                      </div>
                      <div className="flex-1 mb-4">
                          <label className="block text-gray-700 font-medium mb-1">
                              Email
                          </label>
                          <input
                              type="email"
                              name="email_penitip"
                              value={formData.email_penitip}
                              onChange={handleChange}
                              placeholder="Masukkan Email"
                              className="w-full border rounded-lg px-3 py-2 text-gray-700 focus:outline-none"
                          />
                      </div>
                  </div>

                  <div className="flex flex-row items-center justify-center gap-6">
                      <div className="flex-1 mb-4">
                          <label className="block text-gray-700 font-medium mb-1">
                              Tanggal Mulai
                          </label>
                          <input
                              type="date"
                              name="tanggal_mulai"
                              value={formData.tanggal_mulai}
                              onChange={handleChange}
                              className="w-full border rounded-lg px-3 py-2 text-gray-700 focus:outline-none"
                          />
                      </div>
                      <div className="flex-1 mb-4">
                          <label className="block text-gray-700 font-medium mb-1">
                              Tanggal Selesai
                          </label>
                          <input
                              type="date"
                              name="tanggal_selesai"
                              value={formData.tanggal_selesai}
                              onChange={handleChange}
                              className="w-full border rounded-lg px-3 py-2 text-gray-700 focus:outline-none"
                          />
                      </div>
                  </div>

                  <div className="flex flex-row items-center justify-center gap-6">
                      <div className="flex-1 mb-4">
                          <label className="block text-gray-700 font-medium mb-1">
                              Kecamatan
                          </label>
                          <SelectLokasi
                              value={formData.kecamatan_penitip}
                              onChange={handleLokasiChange}
                              placeholder="Pilih kecamatan beserta kodepos"
                          />
                      </div>
                      <div className="flex-1 mb-4">
                          <label className="block text-gray-700 font-medium mb-1">
                              Alamat
                          </label>
                          <input
                              type="text"
                              name="alamat_penitip"
                              value={formData.alamat_penitip}
                              onChange={handleChange}
                              placeholder="Alamat Lengkap"
                              className="w-full border rounded-lg px-3 py-2 text-gray-700 focus:outline-none"
                          />
                      </div>
                  </div>

                  <div className="flex flex-row items-center justify-center gap-6">
                      <div className="flex-1 mb-4">
                          <label className="block text-gray-700 font-medium mb-1">
                              Patokan (Opsional)
                          </label>
                          <input
                              type="text"
                              name="patokan"
                              value={formData.patokan}
                              onChange={handleChange}
                              placeholder="Masukkan Patokan"
                              className="w-full border rounded-lg px-3 py-2 text-gray-700 focus:outline-none"
                          />
                      </div>
                      <div className="flex-1 mb-4">
                          <label className="block text-gray-700 font-medium mb-1">
                              Nomor Kamar dan Lantai (Opsional)
                          </label>
                          <input
                              type="text"
                              name="nomor_kamar_penitip"
                              value={formData.nomor_kamar_penitip}
                              onChange={handleChange}
                              placeholder="Masukkan lantai dan kamar"
                              className="w-full border rounded-lg px-3 py-2 text-gray-700 focus:outline-none"
                          />
                      </div>
                  </div>

                  <div className="flex justify-end py-4">
                      <button
                          type="submit"
                          className="bg-gray-400 w-[400px] text-white py-3 rounded-xl transition font-semibold hover:bg-opacity-90"
                      >
                          Selanjutnya
                      </button>
                  </div>
              </form>
          </div>
      </>
  );
};

export default DetailPenitip;