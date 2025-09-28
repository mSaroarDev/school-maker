"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import airbnb from "@/assets/images/airbnb.svg";
import Image from "next/image";
import SplashScreen from "@/components/_core/SplashScreen";

export default function SplashWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div>
      <AnimatePresence mode="wait">
        {loading ? (
          <SplashScreen />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
