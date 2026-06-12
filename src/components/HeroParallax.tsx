/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, GraduationCap } from 'lucide-react';

interface HeroParallaxProps {
  onExplorePrograms: () => void;
  onApplyNow: () => void;
}

export default function HeroParallax({ onExplorePrograms, onApplyNow }: HeroParallaxProps) {
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX - window.innerWidth / 2) / 35;
      const y = (clientY - window.innerHeight / 2) / 35;
      setMousePos({ x, y });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Calculate parallax offsets
  const skyOffset = scrollY * 0.45;
  const mountainsOffset = scrollY * 0.25;
  const contentOffset = scrollY * 0.15;

  return (
    <section 
      className="relative w-full h-[620px] md:h-[680px] bg-[#02130e] text-white overflow-hidden flex items-center justify-center select-none"
      id="hero-parallax-section"
    >
      {/* Background Layer 1: Sky & Atmosphere (slowest movement) */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-100 ease-out"
        style={{
          transform: `translateY(${skyOffset}px) translate(${mousePos.x * 0.2}px, ${mousePos.y * 0.2}px) scale(1.1)`,
          backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuC9OaVXt_I-zJ16DnYOtQwy5JrxLRe3nlWu58R7qwFpb9xHQHSyXV1hADai4Fi4WM4XMhyj667HbqsY5RB18uSbPavG2Ca4RfrB9Cf4mzOp2yML1lzRfOj_QclD7X330KAf2tvMZwIAFUY7dAYC8KKhz1S1MBrN-DdoHTFeOGaXk0BLQVu0D9moRabwDaUPYGINqTAeNHwVte0ktyvrZqrXdCKo56huc6FQgv2lf6-Vq1bhxB7qIfOmFZ2ufUBUteILyttLB2ICTDvB')`,
          filter: 'brightness(0.65) contrast(1.15) saturate(0.95)'
        }}
      />

      {/* Atmospheric Forest Emerald & Amber Gradient Layer */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#02130e]/95 via-[#0b3b2c]/90 to-[#0c4a35]/65 z-1" />

      {/* Background Accent Particles */}
      <div className="absolute inset-0 pointer-events-none z-2 overflow-hidden opacity-40">
        <div className="absolute w-2 h-2 bg-amber-400 rounded-full top-1/4 left-1/5 animate-ping" style={{ animationDuration: '4s' }} />
        <div className="absolute w-1.5 h-1.5 bg-sky-300 rounded-full top-1/3 right-1/4 animate-ping" style={{ animationDuration: '6s' }} />
        <div className="absolute w-2.5 h-2.5 bg-white rounded-full top-2/3 left-1/3 animate-pulse" />
      </div>

      {/* Content Text overlay */}
      <div 
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left flex flex-col items-center md:items-start transition-transform duration-100 ease-out"
        style={{
          transform: `translateY(${contentOffset}px) translate(${mousePos.x * 0.8}px, ${mousePos.y * 0.8}px)`
        }}
      >
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-6 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-lg text-sm"
        >
          <Sparkles className="w-4 h-4 text-amber-400 fill-amber-400" />
          <span className="font-semibold font-mono tracking-wider text-xs text-emerald-100 uppercase">
            Established 1894 • Academic Heritage
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold mb-6 select-none max-w-3xl leading-tight text-white drop-shadow-lg"
        >
          Shaping the Future <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-emerald-50 font-serif">
            Through Timeless Institution
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-base sm:text-lg md:text-xl text-emerald-50/90 max-w-2xl font-sans font-light leading-relaxed mb-10 text-center md:text-left text-shadow-sm"
        >
          A premier global institution dedicated to scholarly rigor, innovative physical engineering research, and cultivating outstanding critical thinkers.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <button
            onClick={onExplorePrograms}
            className="group flex items-center justify-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-450 text-slate-950 font-bold rounded-xl transition-all shadow-xl hover:shadow-amber-500/15 active:scale-95 text-sm uppercase tracking-wider cursor-pointer"
          >
            <span>Explore Programs</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5 duration-300" />
          </button>

          <button
            onClick={onApplyNow}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/15 border border-white/35 hover:border-white/50 text-white font-bold rounded-xl transition-all backdrop-blur-md active:scale-95 text-sm uppercase tracking-wider cursor-pointer"
          >
            <GraduationCap className="w-5 h-5 text-amber-300" />
            <span>Apply Admissions</span>
          </button>
        </motion.div>
      </div>

      {/* Dynamic diagonal divider overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-[#fbfaf7] dark:bg-[#02130e]" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }} />
    </section>
  );
}
