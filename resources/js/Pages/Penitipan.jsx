import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import SelectLokasi from '@/Components/SelectLokasi';

const Bak = "images/bakicon.png";

const Penitipan = () => {
    const [selectedLocation, setSelectedLocation] = useState(null);

    return (
        <div>
            <div className="container mx-auto pb-16 px-8 max-w-3xl pt-[100px]">
                <div className="space-y-4">
                    <div className="text-center mb-4">
                        <h2 className="text-2xl font-semibold">
                            Lokasi Jemput Barang (Kecamatan){" "}
                        </h2>
                    </div>
                    <div className="border border-black rounded-xl p-4 w-full">
                        <div className="flex items-center w-full">
                            <FontAwesomeIcon
                                icon={faMapMarkerAlt}
                                className="text-gray-500 mr-4"
                            />
                            <FontAwesomeIcon icon="fa-light fa-location-dot" />
                            <div className="flex-grow">
                                <SelectLokasi
                                    value={selectedLocation}
                                    onChange={setSelectedLocation}
                                    placeholder={"Pilih kecamatan penjemputan"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <p className="py-6 text-2xl font-semibold">
                    Informasi untuk tipe kendararan
                </p>
                <div className="space-y-4">
                    <div className="border border-black rounded-xl p-4">
                        <p className="text-lg font-semibold">Pick Up Bak</p>
                        <div className="my-6 flex justify-center">
                            <img src={Bak} alt="" className="h-auto w-auto" />
                        </div>
                        <p className="leading-tight">
                            Dimensi: 2 x 1.6 x 1.2 meter
                        </p>
                        <p className="mb-4 leading-tight">
                            Kapasitas Beban: Hingga 800 kg
                        </p>
                        <p className="font-semibold">Deskripsi</p>
                        <p className="leading-tight">
                            Solusi tepat untuk anak kos yang ingin pindahan
                            dengan banyak barang. Pickup bak ini mampu
                            mengangkut perabotan seperti kasur, meja belajar,
                            lemari kecil, hingga barang-barang lainnya dalam
                            sekali jalan. Efisien, praktis, dan membantu Anda
                            pindahan tanpa ribet!
                        </p>
                    </div>
                </div>
                <div className="flex justify-center pt-8">
                    <Link
                        href="/detailpenitip"
                        className="bg-gray-400 w-screen text-white py-3 rounded-xl transition font-semibold text-center"
                    >
                        Selanjutnya
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Penitipan;
