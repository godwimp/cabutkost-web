import React from 'react';

const LogoImg = "images/logo.jpeg";

const Footer = () => {
    return (
        <footer className="border-t border-gray-300 bg-white">
            <div className="container mx-auto flex justify-between items-start py-16 px-4 sm:px-6 lg:px-8">
                <div className="flex items-center">
                    <img src={LogoImg} alt="Logo" className="h-16" />
                </div>
                <div className="flex-1 mx-10 max-w-3xl">
                    <p className="text-sm">
                        CabutKost adalah sebuah platform digital yang dirancang khusus untuk memenuhi kebutuhan terutama mahasiswa atau masyarakat dalam memindahkan barang-barang kost dan jasa penitipan barang. Dengan semakin padatnya jadwal perkuliahan dan aktivitas masyarakat, CabutKost hadir sebagai solusi praktis yang menghemat waktu dan tenaga. Melalui platform ini, pengguna dapat dengan mudah memesan layanan pemindahan barang, mulai dari pengemasan hingga pengiriman ke tujuan yang diinginkan.
                    </p>
                </div>
                <div>
                    <h2 className="font-bold">Support</h2>
                    <ul className="mt-2">
                        <li className="mt-1"><a href="#" className="text-gray-600">Help Center</a></li>
                        <li className="mt-1"><a href="#" className="text-gray-600">Privacy Policy</a></li>
                        <li className="mt-1"><a href="#" className="text-gray-600">Terms and Conditions</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
