import React from 'react';

export const WhyUs = ({ features }) => (
    <div className="grid grid-cols-2 gap-4 md:gap-8 py-16">
        <img
            src="/images/partner.png"
            alt="Partner Benefits"
            className="w-full"
        />
        <div className="flex flex-col gap-1 md:gap-8">
            <p className="font-semibold text-lg md:text-4xl">Mengapa Kami?</p>
            {features.map((feature, index) => (
                <div key={index} className="flex items-center">
                    <img
                        src={feature.icon}
                        alt={feature.title}
                        className="mr-2 md:mr-8 w-[25px] h-[25px] md:w-max md:h-max"
                    />
                    <div>
                        <p className="font-semibold text-xs md:text-2xl">
                            {feature.title}
                        </p>
                        <p className="md:mt-1 text-[10px] leading-tight md:leading-normal md:text-lg">
                            {feature.description}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);