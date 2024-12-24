import React from 'react';
import { Head } from '@inertiajs/react';
import { ShippingCalculator } from '@/components/Home/ShippingCalculator';
import { Services } from '@/components/Home/Services';
import { WhyUs } from '@/components/Home/WhyUs';
import { FAQ } from '@/components/Home/FAQ';

const Home = () => {
  const services = [
    {
      name: 'Pengiriman Barang',
      icon: '/images/trukicon.png'
    },
    {
      name: 'Penitipan Barang',
      icon: '/images/pkgicon.png'
    }
  ];

  const features = [
    {
      title: 'Siap kapanpun dibutuhkan',
      description: 'Lorem ipsum dolor sit amet consectetur. Donec cursus porta',
      icon: '/images/partnericon.png'
    },
    {
      title: 'Tepat Waktu',
      description: 'Lorem ipsum dolor sit amet consectetur. Donec cursus porta',
      icon: '/images/partnericon.png'
    },
    {
      title: 'Harga Terjangkau',
      description: 'Lorem ipsum dolor sit amet consectetur. Donec cursus porta',
      icon: '/images/partnericon.png'
    }
  ];

  const faqData = [
    {
      question: "Apakah perlu reservasi terlebih dahulu?",
      answer: "Ya, Anda perlu melakukan reservasi terlebih dahulu untuk memastikan ketersediaan."
    },
    {
      question: "Bagaimana cara melakukan pembayaran?",
      answer: "Pembayaran dapat dilakukan melalui transfer bank atau metode pembayaran lainnya yang kami sediakan."
    },
    {
      question: "Apakah layanan tersedia 24/7?",
      answer: "Ya, kami menyediakan layanan 24/7 untuk memenuhi kebutuhan Anda."
    },
    {
      question: "Bisakah saya membatalkan reservasi?",
      answer: "Ya, pembatalan reservasi dapat dilakukan sesuai kebijakan pembatalan kami."
    },
    {
      question: "Apakah ada biaya tambahan untuk layanan tertentu?",
      answer: "Beberapa layanan mungkin memiliki biaya tambahan. Silakan hubungi kami untuk informasi lebih lanjut."
    }
  ];

  return (
    <>
      <Head title="Home" />
      <div className="pt-[60px]">
        <div className="container mx-auto px-4 md:px-[100px] py-16">
          <div className="grid grid-cols-2 gap-4 md:gap-16">
            <img src="/images/trukhome.png" alt="" className="w-[225px] md:w-[700px]" />
            <div className="flex flex-col w-full md:w-[500px]">
              <p className="font-bold text-xl md:text-5xl mb-6 md:mb-12">
                Jadikan Pindahan Kos Lebih Mudah, Cepat, dan Efisien
              </p>
              <div className="flex flex-row gap-4 md:gap-10 mb-6 md:mb-12">
                {[1, 2, 3].map((num) => (
                  <img
                    key={num}
                    src={`/images/icon${num}.png`}
                    alt=""
                    className="w-[40px] h-[40px] md:w-max md:h-max"
                  />
                ))}
              </div>
              
              {/* Desktop Calculator */}
              <div className="hidden md:block">
                <ShippingCalculator />
              </div>
            </div>
          </div>

          {/* Mobile Calculator */}
          <div className="md:hidden">
            <ShippingCalculator isMobile />
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-[100px] pb-16">
          <p className="font-semibold text-xl md:text-4xl">
            Pilihan Jasa yang Kami Sediakan
          </p>
          
          <Services services={services} />
          <WhyUs features={features} />
          <FAQ faqs={faqData} />
        </div>
      </div>
    </>
  );
};

export default Home;