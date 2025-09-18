"use client";

import Image from "next/image";
import { PiQuotesDuotone } from "react-icons/pi";
import { motion } from "framer-motion";

const Testimonial = () => {
  return (
    <section className="bg-gray-50 dark:bg-gray-800">
      <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-24 lg:px-6">
        <motion.figure
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="max-w-screen-md mx-auto"
        >
          <PiQuotesDuotone size="40" className="rotate-180 mb-5 mx-auto" />
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-xl font-medium text-gray-900 md:text-2xl dark:text-white">
              &ldquo;Landwind is just awesome. It contains tons of predesigned components and pages starting from login screen to complex dashboard. Perfect choice for your next SaaS application.&rdquo;
            </p>
          </motion.blockquote>
          <motion.figcaption
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center justify-center mt-6 space-x-3"
          >
            <Image 
              className="w-6 h-6 rounded-full" 
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png" 
              alt="profile picture"
              width={24}
              height={24}
            />
            <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
              <div className="pr-3 font-medium text-gray-900 dark:text-white">Micheal Gough</div>
              <div className="pl-3 text-sm font-light text-gray-500 dark:text-gray-400">CEO at Google</div>
            </div>
          </motion.figcaption>
        </motion.figure>
      </div>
    </section>
  );
};

export default Testimonial;
