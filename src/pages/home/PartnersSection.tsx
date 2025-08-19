"use client";

import airbnb from "@/assets/images/airbnb.svg";
import google from "@/assets/images/google.svg";
import microsoft from "@/assets/images/microsoft.svg";
import spotify from "@/assets/images/spotify.svg";
import mailchimp from "@/assets/images/mailchimp.svg";
import Image from "next/image";
import { motion } from "framer-motion";

const logos = [
  { src: airbnb, alt: "Airbnb Logo" },
  { src: google, alt: "Google Logo" },
  { src: microsoft, alt: "Microsoft Logo" },
  { src: spotify, alt: "Spotify Logo" },
  { src: mailchimp, alt: "Mailchimp Logo" },
];

const PartnersSection = () => {
  return (
    <section className="py-12 bg-white dark:bg-gray-900">
      <div className="flex items-center gap-10 justify-between max-w-screen-xl mx-auto px-4">
        {logos.map((logo, index) => (
          <motion.div
            key={logo.alt}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            whileHover={{ scale: 1.1 }}
            className="w-36 h-14 relative"
          >
            <Image src={logo.src} alt={logo.alt} fill className="object-contain" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PartnersSection;
