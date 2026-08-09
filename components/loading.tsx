// app/components/Loading.tsx
import { motion } from "motion/react";

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="text-center space-y-6">
        {/* Animated Logo */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-20 h-20 bg-slate-900 rounded-xl flex items-center justify-center mx-auto shadow-lg"
        >
          <span className="text-white font-bold text-2xl">BCS</span>
        </motion.div>

        {/* Loading Text with Animated Dots */}
        <div className="space-y-2">
          <p className="text-slate-600 font-medium">Loading BlockSherpa</p>
          <div className="flex justify-center gap-1.5">
            <motion.div
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}
              className="w-2 h-2 bg-blue-600 rounded-full"
            />
            <motion.div
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: 0.3 }}
              className="w-2 h-2 bg-blue-600 rounded-full"
            />
            <motion.div
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: 0.6 }}
              className="w-2 h-2 bg-blue-600 rounded-full"
            />
          </div>
        </div>

        {/* Subtle spinner */}
        <div className="relative w-12 h-12 mx-auto">
          <div className="absolute inset-0 border-2 border-slate-200 rounded-full"></div>
          <div className="absolute inset-0 border-2 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
}