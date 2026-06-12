/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Users, Award, Landmark, TrendingUp } from 'lucide-react';
import { UniversityStats } from '../types';
import { motion } from 'motion/react';

interface StatsBarProps {
  stats: UniversityStats;
}

export default function StatsBar({ stats }: StatsBarProps) {
  const statItems = [
    {
      id: 'scholars',
      value: `${(stats.enrollmentCount / 1000).toFixed(1)}k+`,
      label: 'Global Alumni & Scholars',
      description: 'Academics across 4 continents',
      icon: Users,
      color: 'text-[#0b3b2c] bg-emerald-50 dark:bg-emerald-950/30 dark:text-emerald-350'
    },
    {
      id: 'ranking',
      value: `Top ${stats.nationalRanking}`,
      label: 'NIRF National Rank',
      description: 'Accredited Category-1 Status',
      icon: Award,
      color: 'text-[#b45309] bg-amber-50 dark:bg-amber-950/30 dark:text-amber-400'
    },
    {
      id: 'funding',
      value: `$${stats.researchFundingMillions}M`,
      label: 'Active Research Grants',
      description: 'Funded laboratory installations',
      icon: Landmark,
      color: 'text-emerald-700 bg-emerald-100/40 dark:bg-teal-950/30 dark:text-teal-300'
    },
    {
      id: 'placements',
      value: `${stats.placementRatePercent}%`,
      label: 'Career Placements',
      description: 'Direct industry onboarding rate',
      icon: TrendingUp,
      color: 'text-amber-700 bg-orange-50 dark:bg-orange-950/30 dark:text-orange-300'
    }
  ];

  return (
    <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 md:-mt-20 mb-16">
      <div className="bg-[#fdfcfb] dark:bg-[#031a14] border border-[#0b3b2c]/10 dark:border-emerald-800/20 rounded-2xl shadow-xl shadow-emerald-950/5 divide-y md:divide-y-0 md:divide-x divide-emerald-950/5 dark:divide-emerald-800/20 grid grid-cols-1 md:grid-cols-4 overflow-hidden">
        {statItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 md:p-8 flex flex-col items-center text-center group cursor-default transition-all hover:bg-emerald-50/20 dark:hover:bg-emerald-950/10 select-none"
            >
              <div className={`p-3 rounded-2xl mb-4 transition-transform duration-300 group-hover:scale-110 ${item.color}`}>
                <Icon className="w-6 h-6 stroke-[2px]" />
              </div>

              <div className="font-serif text-3xl md:text-4xl font-bold text-[#0b3b2c] dark:text-[#eaf5f1] mb-1.5 font-mono">
                {item.value}
              </div>

              <div className="text-sm font-semibold text-slate-800 dark:text-stone-200 mb-0.5">
                {item.label}
              </div>

              <div className="text-xs text-slate-400 dark:text-emerald-400/40 font-mono">
                {item.description}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
