import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import heroImage from "../assets/hero.jpg";

const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* 🔹 Moving Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center animate-slowPan"
        style={{ backgroundImage: `url(${heroImage})` }}
      ></div>

      {/* 🔹 Overlay for readability */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* 🔹 Content */}
      <div className="relative z-10 flex flex-col justify-center h-full pl-8 md:pl-20 lg:pl-32 max-w-lg">
        <h1 className="text-6xl font-extrabold mb-4 text-white drop-shadow-lg">
          iShop
        </h1>
        <p className="text-lg text-white mb-6 drop-shadow-md">
          Your one stop solution for all kinds of new and used Apple products.
          Discover the best deals on your favorite gadgets and accessories!
        </p>

        {/* 📞 Call Buttons */}
        <div className="flex flex-col space-y-3">
          <a
            href="tel:+923068399990"
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-center 
            transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(59,130,246,0.7)]"
          >
            <FaPhoneAlt className="text-white text-lg" />
            +92 306 8399990
          </a>

          <a
            href="tel:+923048399105"
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-center 
            transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(59,130,246,0.7)]"
          >
            <FaPhoneAlt className="text-white text-lg" />
            +92 304 8399105
          </a>
        </div>
      </div>

      {/* 🔹 Decorative Wave Bottom */}
      <svg
        className="absolute bottom-0 w-full"
        viewBox="0 0 1440 150"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#ffffff"
          d="M0,64 C360,192 1080,0 1440,128 L1440,150 L0,150 Z"
        ></path>
      </svg>
    </section>
  );
};

export default Hero;
