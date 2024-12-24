import MainLayout from '@/Layouts/MainLayout';
import React from 'react';

const About1 = "images/about1.png";
const About2 = "images/about2.png";
const AboutIcon1 = "images/abouticon1.png";
const AboutIcon2 = "images/abouticon2.png";
const AboutIcon3 = "images/abouticon3.png";

const About = () => {
    return (
        <div className="pt-60">
            <div className="px-100px py-16">
                <div className="grid grid-cols-2">
                    <img src={About1} alt="" className="w-[488px]" />
                    <div className="flex flex-col w-[553px]">
                        <h2 className="text-5xl font-bold mb-8">
                            Tentang Kami
                        </h2>
                        <p className="text-lg">
                            CabutKost adalah sebuah platform digital yang
                            dirancang khusus untuk memenuhi kebutuhan
                            terutamanya mahasiswa atau masyarakat dalam
                            memindahkan barang-barang kost dan jasa penitipan
                            barang. Dengan semakin padatnya jadwal perkuliahan
                            dan aktivitas masyarakat, CabutKost hadir sebagai
                            solusi praktis yang menghemat waktu dan tenaga.
                            Melalui platform ini, pengguna dapat dengan mudah
                            memesan layanan pemindahan barang, mulai dari
                            pengemasan hingga pengiriman ke tujuan yang
                            diinginkan.
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-2 py-16">
                    <div className="flex flex-col">
                        <p className="text-5xl font-bold mb-8">
                            Bagaimana Kita Membantu
                        </p>
                        <p className="mr-12 mb-8 text-lg">
                            CabutKost menyediakan kemudahan pemesanan layanan
                            pindah kost dan penitipan barang melalui platform
                            digital yang praktis, dengan fitur jadwal fleksibel
                            dan opsi layanan sesuai kebutuhan, mulai dari
                            pengemasan hingga pengiriman.
                        </p>
                        <div className="flex flex-row mb-4 items-center">
                            <img
                                src={AboutIcon1}
                                className="w-[65px] h-[65px] mr-8"
                            />
                            <div className="flex flex-col">
                                <p className="text-xl font-bold mb-2">
                                    Kemudahan dalam Pemesanan
                                </p>
                                <p className="text-lg">
                                    Pengguna dapat memesan layanan pemindahan
                                    dan penitipan barang melalui platform
                                    digital yang mudah digunakan, dilengkapi
                                    dengan fitur jadwal fleksibel dan pemilihan
                                    jenis layanan sesuai kebutuhan, mulai dari
                                    pengemasan hingga pengiriman.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-row mb-4 items-center">
                            <img
                                src={AboutIcon2}
                                className="w-[65px] h-[65px] mr-8"
                            />
                            <div className="flex flex-col">
                                <p className="text-xl font-bold mb-2">
                                    Efisiensi Waktu dan Tenaga
                                </p>
                                <p className="text-lg">
                                    Dengan CabutKost, pengguna tidak perlu repot
                                    mengatur logistik sendiri. Tim profesional
                                    akan menangani proses pemindahan barang
                                    secara menyeluruh, sehingga pengguna dapat
                                    fokus pada aktivitas perkuliahan atau
                                    pekerjaan.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-row mb-4 items-center">
                            <img
                                src={AboutIcon3}
                                className="w-[65px] h-[65px] mr-8"
                            />
                            <div className="flex flex-col">
                                <p className="text-xl font-bold mb-2">
                                    Layanan Penitipan Barang yang Aman
                                </p>
                                <p className="text-lg">
                                    Platform ini menyediakan solusi penitipan
                                    barang untuk mereka yang membutuhkan tempat
                                    penyimpanan sementara, dengan jaminan
                                    keamanan dan harga yang bersahabat.
                                </p>
                            </div>
                        </div>
                    </div>
                    <img src={About2} alt="" />
                </div>
            </div>
        </div>
    );

}

export default About;