import React from 'react';

export const Services = ({ services }) => (
    <div className="grid grid-cols-2 gap-4 md:gap-16 pt-4 md:pt-8 md:py-16">
        {services.map((service, index) => (
            <div
                key={index}
                className="border-2 border-black rounded-xl h-[110px] md:h-64 flex flex-col items-center justify-center"
            >
                <img src={service.icon} alt={service.name} />
                <p className="font-semibold text-md md:text-2xl my-1 md:my-3">
                    {service.name}
                </p>
            </div>
        ))}
    </div>
);