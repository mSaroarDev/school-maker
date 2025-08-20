"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2000); // show splash for 2s
    return () => clearTimeout(t);
  }, []);

  return (
    <div>
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="splash"
            className="fixed inset-0 flex items-center justify-center bg-white z-50"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              initial={{ scale: 0.8 }}
              animate={{ scale: 1.1 }}
              transition={{ repeat: Infinity, duration: 1, repeatType: "reverse" }}
              className="text-3xl font-bold"
            >
              🚀 My App
            </motion.h1>
          </motion.div>
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
