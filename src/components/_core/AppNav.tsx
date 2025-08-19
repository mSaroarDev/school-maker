"use client";
import { CloudSun, Headset, Star } from "lucide-react";
import { Button } from "../ui/button";
import Menus from "./Menus";
import Logo from "./Logo";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";


const AppNav = () => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const variants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <motion.div
        variants={variants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3 }}
        className={`hidden md:block w-full p-4 ${isSticky
          ? "bg-white dark:bg-gray-900 shadow-md fixed top-0 left-0 z-50"
          : "bg-transparent"
          }`}
        key={isSticky ? "sticky" : "normal"}
      >
        <main>
          <div className="flex items-center justify-between">
            <Logo />
            <div>
              <Menus />
            </div>
            <div className="flex items-center gap-2">
              <Button className="rounded-full" size="icon" variant="outline"><CloudSun /></Button>
              <Button variant="outline"><Star size={18} /> Feedback</Button>
              <Button>Get Started </Button>
            </div>
          </div>
        </main>
      </motion.div>

      <div className="md:hidden bg-primary px-3 py-2">
        <div className="flex items-center justify-between">
          <Logo isDark />
          <Headset size={20} className="text-white" />
        </div>
      </div>
    </>
  );
};

export default AppNav;