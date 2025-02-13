"use client";

import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <div className="relative -mx-4 sm:-mx-6 md:-mx-8 lg:-mx-12 xl:-mx-16 mb-16">
      <div className="bg-gradient-to-r from-green-500/40 to-purple-500/40 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-12">
        <div className="space-y-6 max-w-4xl mx-auto container">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold leading-[1.2]"
          >
            Enjoy
            <br />
            Next-Level
            <br />
            Cursor AI
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.4 }}
            className="text-lg text-black/90 max-w-xl"
          >
            Cursor AI를 더욱 효과적으로 활용할 수 있는 도구들을 제공합니다.
            <br />
            PRD 작성부터 IA 설계까지, 개발 생산성을 높이는 다양한 도구를
            경험해보세요.
          </motion.p>
        </div>
      </div>
    </div>
  );
}
