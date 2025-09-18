"use client";
import heroImage from "@/assets/images/hero.png";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

const HeroSection = () => {
  const {push} = useRouter();

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mr-auto place-self-center lg:col-span-7"
        >
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white"
          >
            Create your school <br /> website in minutes.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400"
          >
            This free and open-source landing page template was built using the utility classes from{" "}
            <a href="https://tailwindcss.com" className="hover:underline">Tailwind CSS</a> and based on the components from the{" "}
            <a href="https://flowbite.com/docs/getting-started/introduction/" className="hover:underline">Flowbite Library</a> and the{" "}
            <a href="https://flowbite.com/blocks/" className="hover:underline">Blocks System</a>.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="space-y-4 sm:flex sm:space-y-0 sm:space-x-4"
          >
            <Button onClick={()=> push("/login")} size="lg">Register & Get Started</Button>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="hidden lg:mt-0 lg:col-span-5 lg:flex"
        >
          <Image src={heroImage} alt="hero image" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
