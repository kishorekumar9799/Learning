/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Landmark, ShieldCheck, Microscope, Globe, Milestone } from 'lucide-react';

export default function OverviewTab() {
  const [activeTimelineIdx, setActiveTimelineIdx] = useState(0);

  const timelineEvents = [
    {
      year: '1894',
      title: 'Foundations & Charter',
      desc: 'Established as an advanced science academy in royal colonial stone buildings, with 3 primary professors and 40 students.',
      icon: Landmark
    },
    {
      year: '1947',
      title: 'Modernization Act',
      desc: 'Re-chartered as a National Institute of Technology, introducing unified labs and establishing key chemistry research groups.',
      icon: Milestone
    },
    {
      year: '1980',
      title: 'The Digital Dawn',
      desc: 'Commissioned the first mainframe computer laboratory in the region, piloting early compiler designs and automated mathematics databases.',
      icon: Microscope
    },
    {
      year: '2012',
      title: 'Nanotech Installations',
      desc: 'Inauguration of the state-of-the-art $40M Cleanroom complex to pioneer advanced semiconductors research, attracting global researchers.',
      icon: Globe
    },
    {
      year: '2026',
      title: 'AI Paradigm Leap',
      desc: 'Formed the dedicated "AI & Data Science" Research school with generative intelligence, quantum sensors, and full-stack computational platforms.',
      icon: ShieldCheck
    }
  ];

  const pillars = [
    {
      id: 'i1',
      title: 'Uncompromising Rigor',
      description: 'Our curriculum is structured to expand problem-solving frameworks, ensuring graduates understand deep fundamental math and systems.',
      icon: ShieldCheck,
      color: 'border-l-4 border-[#0a2540] bg-[#0a2540]/5 dark:bg-[#0a2540]/10'
    },
    {
      id: 'i2',
      title: 'Innovative Labs',
      description: 'Scholars work on live, funded experiments backed by leading tech enterprises, spanning distributed compiler networks to structural automation.',
      icon: Microscope,
      color: 'border-l-4 border-blue-700 bg-blue-50/20 dark:bg-blue-900/10'
    },
    {
      id: 'i3',
      title: 'Inclusive Destiny',
      description: 'Offering generous financial grants and complete scholarship options, guaranteeing that intellectual potential knows no financial barrier.',
      icon: Landmark,
      color: 'border-l-4 border-[#b45309] bg-amber-50/20 dark:bg-amber-950/10'
    }
  ];

  return (
    <div className="space-y-16 py-8">
      {/* Introduction Intro Header details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 space-y-5"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50/75 dark:bg-blue-950/30 text-xs font-semibold uppercase tracking-wider text-[#0a2540] dark:text-sky-400">
            <Landmark className="w-3.5 h-3.5" />
            <span>Legacy & Values</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
            A Tradition of Innovation <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0a2540] to-[#b45309] dark:from-sky-400 dark:to-amber-305">
              Steeped in Scientific Discovery
            </span>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base">
            We blend historical architectural prestige with cutting-edge academic paradigms. Our campus is a thriving, diverse community where scholars from around the globe converge to answer fundamental mathematical questions, design quantum computers, and build practical autonomous platforms that guide our future.
          </p>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Rooted in rigorous research and an unyielding commitment to societal elevation, we guide tomorrow's scientists and leaders with ethical wisdom and technical depth.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 relative"
        >
          <div className="absolute -inset-2 bg-gradient-to-tr from-amber-400/20 to-blue-400/20 rounded-2xl blur-lg opacity-85 -z-10" />
          <div className="overflow-hidden rounded-2xl border border-[#0a2540]/10 dark:border-blue-800/25 shadow-xl">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZTVYt1Ck-yWlQWpusGTQMuZO4v1OKC3R1btmumGSf7iKxfn5alO_FiUOEEpuZvcseF99tWdlZ0Dho7H5V6Fjwmw_qeSk6Vrwm1SYfNeCeLNz9iwS-Uop0xUe3MPTlpEkL3rs7MlkgYKO7kpxaaUJTtqCGghF83_s983rMlphVnKEGGeNj2R-5ym7DaiPnDuSCwcFDyE2QZ5FYnUQKxtiCFgNMx6gFWEBhg78KsLYGD2rAv20-ASpu4RLvqeE0ipknMNW5NAHI1cUU" 
              alt="Campus Quadrangle" 
              className="w-full h-[320px] object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </motion.div>
      </div>

      {/* Core values pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pillars.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`p-6 rounded-xl border border-dashed border-[#0a2540]/10 dark:border-blue-800/15 shadow-xs hover:shadow-md transition-all ${item.color}`}
            >
              <div className="p-2.5 w-fit rounded-lg bg-white dark:bg-[#070d19] shadow-xs mb-4 text-[#0a2540] dark:text-sky-400">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2 font-serif">{item.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">{item.description}</p>
            </motion.div>
          );
        })}
      </div>

      {/* President's Quote Message Panel */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="bg-[#05152c] text-[#f1f5f9] rounded-2xl p-8 md:p-12 border border-blue-950/35 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none text-9xl font-serif">
          ”
        </div>
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-amber-400 shrink-0 shadow-lg">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6mKNWfTrGy2E-6B0ICo8yOJOsdlnhD0bjUvo1-d1No4N45Mc4eLvoVaUo-40qIePE6-XJHoC0rZF_i7khYoYwey6iTu-kYYVrTqSCj_I5DaYFALNc4oj1k_B9wo3O-rdfT7RzxfzEvD5sCSPvB74XfFlPRWLp4mNyblP7LJXymvwIryhEH3kEOOjVbdNJf7WB8HT4fP4CIvZfpnzTE9j68HE11fSaqezqiYkBSdQe4hZC5r_Y3L05L5uTXbNWSsOVjOzzpl221VBl" 
              alt="Dr. Eleanor Vance President Portrait" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-4">
            <blockquote className="font-serif italic text-lg md:text-xl text-sky-100/90 leading-relaxed tracking-wide">
              "Our mission is not merely to compile or transfer modern information. It is to cultivate the spark of curiosity, validate wisdom, and equip our engineers with values required to navigate and design an ethical global ecosystem."
            </blockquote>
            <div className="border-t border-blue-800/20 pt-3 flex flex-col md:flex-row md:items-center justify-between gap-2">
              <div>
                <cite className="not-italic font-bold text-amber-400 tracking-wide">Dr. Eleanor Vance</cite>
                <span className="text-xs text-slate-400 block font-mono">President & Institutional Principal</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                <Landmark className="w-3.5 h-3.5" />
                <span>The Oval Office Registry</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Interactive Timeline of historical breakthroughs */}
      <div className="space-y-8 select-none">
        <div className="text-center md:text-left space-y-2">
          <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white">Our Historic Milestones</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl font-mono">Click on any year to observe our historic evolution</p>
        </div>

        {/* Timeline Line & Triggers */}
        <div className="relative">
          {/* Horizontal connecting background line */}
          <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-gray-100 dark:bg-slate-800 -translate-y-1/2 hidden md:block" />
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 relative">
            {timelineEvents.map((evt, idx) => {
              const isActive = activeTimelineIdx === idx;
              const Icon = evt.icon;
              return (
                <button
                  key={evt.year}
                  onClick={() => setActiveTimelineIdx(idx)}
                  className={`p-4 rounded-xl text-left border transition-all duration-300 relative bg-[#fdfcfb] dark:bg-[#070d19]/40 cursor-pointer ${
                    isActive 
                      ? 'border-[#0a2540] shadow-md shadow-blue-950/5 dark:shadow-none dark:border-sky-400 scale-102 font-bold' 
                      : 'border-[#0a2540]/10 dark:border-blue-900/30 hover:border-[#0a2540]/15 dark:hover:border-blue-800/10'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-mono font-bold text-base md:text-lg ${isActive ? 'text-[#0a2540] dark:text-sky-400' : 'text-slate-400'}`}>
                      {evt.year}
                    </span>
                    <div className={`p-1.5 rounded-md ${isActive ? 'bg-blue-50 text-[#0a2540] dark:bg-blue-950/50 dark:text-sky-450' : 'bg-slate-100 text-slate-400 dark:bg-slate-800/50'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h4 className={`text-sm font-bold ${isActive ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400'}`}>
                    {evt.title}
                  </h4>
                </button>
              );
            })}
          </div>
        </div>

        {/* Details Card for selected year status */}
        <motion.div
          key={activeTimelineIdx}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="p-6 md:p-8 rounded-xl border border-dashed border-[#0a2540]/20 dark:border-blue-800/30 bg-blue-50/5 dark:bg-[#070d19]/30 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-2 max-w-2xl">
            <span className="font-mono text-xs font-bold uppercase py-0.5 px-2 rounded-full bg-blue-100/50 dark:bg-blue-950/40 text-[#0a2540] dark:text-sky-400">
              Breakthrough Highlight Year {timelineEvents[activeTimelineIdx].year}
            </span>
            <h4 className="font-serif text-xl font-bold text-slate-800 dark:text-white">
              {timelineEvents[activeTimelineIdx].title}
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
              {timelineEvents[activeTimelineIdx].desc}
            </p>
          </div>
          <div className="shrink-0 flex items-center justify-center w-16 h-16 rounded-full bg-[#0a2540]/10 dark:bg-[#0a2540]/30 text-[#0a2540] dark:text-sky-305 shadow-inner">
            <Milestone className="w-7 h-7" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
