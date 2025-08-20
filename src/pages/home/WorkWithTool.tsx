"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import airbnb from "@/assets/images/airbnb.svg";
import google from "@/assets/images/google.svg";
import microsoft from "@/assets/images/microsoft.svg";
import spotify from "@/assets/images/spotify.svg";
import mailchimp from "@/assets/images/mailchimp.svg";
import meshable from "@/assets/images/meshable.svg";

const logos = [
  { src: airbnb, alt: "Airbnb" },
  { src: google, alt: "Google" },
  { src: microsoft, alt: "Microsoft" },
  { src: spotify, alt: "Spotify" },
  { src: mailchimp, alt: "Mailchimp" },
  { src: meshable, alt: "Meshable" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // delay between each logo
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function LogosSection() {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="max-w-screen-xl px-4 pb-8 mx-auto lg:pb-16">
        <motion.div
          className="grid grid-cols-2 gap-8 text-gray-500 sm:gap-12 sm:grid-cols-3 lg:grid-cols-6 dark:text-gray-400"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }} // animate once when visible
        >
          {logos.map((logo, i) => (
            <motion.a
              key={i}
              href="#"
              className="flex items-center lg:justify-center"
              variants={itemVariants}
              whileHover={{ scale: 1.1 }} // little hover bounce
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                className="h-9 w-auto"
              />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
