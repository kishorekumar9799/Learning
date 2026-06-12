/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PlacementRecord, AcademicProgram } from '../types';
import { Search, Trophy, Briefcase, DollarSign, Pin, CheckCircle2, ChevronRight, SlidersHorizontal } from 'lucide-react';

interface PlacementsTabProps {
  placements: PlacementRecord[];
  programs: AcademicProgram[];
}

export default function PlacementsTab({ placements, programs }: PlacementsTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sectorFilter, setSectorFilter] = useState('All');

  // Static list of top sectors of employment
  const sectors = ['All', 'AI Systems Engineering', 'Fintech Software', 'Cloud Cryptography', 'Autonomous Agents', 'Aerospace Telemetry'];

  // Static list of premium recruiting partners
  const recruiterPartners = [
    { name: 'Stripe', logoText: 'S', color: 'bg-indigo-600 text-white', desc: 'Fintech Software API leader' },
    { name: 'NVIDIA', logoText: 'NV', color: 'bg-green-600 text-white', desc: 'GPU Deep Artificial Intelligence chips' },
    { name: 'Google', logoText: 'G', color: 'bg-blue-600 text-white', desc: 'Cloud infrastructure & search engine' },
    { name: 'Microsoft', logoText: 'MS', color: 'bg-sky-600 text-white', desc: 'Autonomous system solutions group' },
    { name: 'SpaceX', logoText: 'SX', color: 'bg-slate-900 text-white', desc: 'Aerospace avionics telemetry' }
  ];

  // Streaming salary statistics calculated across current active database
  const highestPackage = placements.length > 0 ? Math.max(...placements.map(p => p.packageValue)) : 145000;
  const averagePackage = placements.length > 0 ? (placements.reduce((acc, curr) => acc + curr.packageValue, 0) / placements.length) : 75000;

  const filteredPlacements = placements.filter(p => {
    const matchesSearch = p.studentName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSector = sectorFilter === 'All' || p.sector === sectorFilter;
    return matchesSearch && matchesSector;
  });

  // SVG Chart dataset representing stream comparisons
  const streamChartData = [
    { label: 'AI & Data Science', average: 135000, color: 'fill-teal-500' },
    { label: 'Computer Science', average: 121000, color: 'fill-indigo-500' },
    { label: 'Cybernetics Engineering', average: 95000, color: 'fill-amber-500' },
    { label: 'Nanotech Electronics', average: 88000, color: 'fill-rose-500' }
  ];

  return (
    <div className="space-y-12 py-8">
      
      {/* Dynamic placements parameters blocks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Highest Salary annual package card */}
        <div className="p-6 rounded-2xl bg-[#06152d] text-[#f1f5f9] border border-blue-950/45 shadow-lg relative overflow-hidden flex flex-col justify-between h-44 select-none">
          <div className="absolute top-0 right-0 p-4 opacity-5 text-8xl font-mono">
            $
          </div>
          <div className="space-y-1">
            <span className="font-mono text-[10px] tracking-wider uppercase text-amber-400 font-bold flex items-center gap-1">
              <Trophy className="w-3.5 h-3.5" />
              <span>Highest Package Cleared</span>
            </span>
            <div className="text-3xl font-serif font-bold text-white tracking-wide font-mono">
              ${highestPackage.toLocaleString()} / Yr
            </div>
          </div>
          <p className="text-xs text-slate-400 font-sans leading-relaxed">
            Acquired by our elite computer science division in advanced computational AI modeling groups.
          </p>
        </div>

        {/* average package salary parameters card */}
        <div className="p-6 rounded-2xl bg-[#fdfcfb] dark:bg-[#0a1220]/75 border border-[#0a2540]/10 dark:border-blue-900/15 shadow-md flex flex-col justify-between h-44 select-none">
          <div className="space-y-1">
            <span className="font-mono text-[10px] tracking-wider uppercase text-[#0a2540] dark:text-sky-400 font-bold flex items-center gap-1">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Average Cohort Career Salary</span>
            </span>
            <div className="text-3xl font-serif font-bold text-slate-900 dark:text-white tracking-wide font-mono">
              ${Math.round(averagePackage).toLocaleString()} / Yr
            </div>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-sans leading-relaxed">
            Representing consistent placement outcomes across B.Tech, M.Tech, and doctorate programs.
          </p>
        </div>

        {/* Verified on-boarding certificate stamp */}
        <div className="p-6 rounded-2xl bg-[#fdfcfb] dark:bg-[#0a1220]/75 border border-[#0a2540]/10 dark:border-blue-900/15 shadow-md flex flex-col justify-between h-44 select-none">
          <div className="space-y-1">
            <span className="font-mono text-[10px] tracking-wider uppercase text-blue-700 dark:text-sky-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Placement Assurance Rate</span>
            </span>
            <div className="text-3xl font-serif font-bold text-slate-900 dark:text-white tracking-wide font-mono">
              98.4%
            </div>
          </div>
          <p className="text-xs text-slate-405 dark:text-slate-400 font-sans leading-relaxed">
            Comprehensive pre-placement training programs guarantee early industry alignments.
          </p>
        </div>

      </div>

      {/* High-End Bespoke SVG Stream salary comparison charts */}
      <div className="bg-[#fdfcfb] dark:bg-[#0a1220]/75 border border-[#0a2540]/10 dark:border-blue-900/15 rounded-2xl p-6 shadow-sm space-y-6">
        <div className="space-y-1">
          <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white">Active Compensation Benchmarking by Stream</h3>
          <p className="text-xs text-slate-500 font-mono">Illustrates average annual base package metrics processed in current fiscal term</p>
        </div>

        <div className="space-y-4 pt-3">
          {streamChartData.map((data, i) => {
            const percentage = (data.average / 150000) * 100;
            return (
              <div key={i} className="space-y-1.5 select-none">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-700 dark:text-slate-350">{data.label}</span>
                  <span className="font-mono text-[#b45309] dark:text-[#fcd34d]">${data.average.toLocaleString()} avg</span>
                </div>
                {/* Horizontal custom beautiful bar */}
                <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800/50 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    className={`h-full rounded-full ${
                      i === 0 ? 'bg-[#0a2540]' : i === 1 ? 'bg-blue-600' : i === 2 ? 'bg-[#b45309]' : 'bg-orange-55/90'
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recruiter Showcase partner logo board */}
      <div className="space-y-4">
        <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white select-none">Strategic Recruitment Council</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {recruiterPartners.map((item) => (
            <div 
              key={item.name}
              className="p-4 bg-[#fdfcfb] dark:bg-[#0a1220]/75 border border-[#0a2540]/10 dark:border-blue-900/20 rounded-xl text-center flex flex-col justify-center items-center gap-3 shadow-xs"
            >
              <div className={`w-12 h-12 ${item.color} rounded-xl font-bold font-mono text-base flex items-center justify-center shadow-inner`}>
                {item.logoText}
              </div>
              <div>
                <div className="text-xs font-bold text-slate-800 dark:text-white">{item.name}</div>
                <div className="text-[10px] text-slate-400 font-sans mt-0.5 leading-tight">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Placement directory tables and searches */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <div className="space-y-1 select-none">
            <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white">Student Career Onboarding Records</h3>
            <p className="text-xs text-slate-500">Live verified placements registered through active database</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search scholar or partner..."
                className="w-full sm:w-64 pl-9 pr-3 py-2 bg-[#fdfcfb] dark:bg-[#070d19] border border-[#0a2540]/10 dark:border-[#070d19] rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-0"
              />
            </div>

            {/* Filter */}
            <div className="flex items-center gap-1.5">
              <SlidersHorizontal className="w-4 h-4 text-slate-400 shrink-0" />
              <select
                value={sectorFilter}
                onChange={(e) => setSectorFilter(e.target.value)}
                className="p-2 border border-[#0a2540]/10 dark:border-[#070d19] bg-[#fdfcfb] dark:bg-[#070d19] rounded-xl text-xs text-slate-700 dark:text-slate-350 focus:outline-none focus:border-blue-500"
              >
                {sectors.map(sec => (
                  <option key={sec} value={sec}>{sec === 'All' ? 'All Industries' : sec}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Directory records layout */}
        <div className="bg-[#fdfcfb] dark:bg-[#0a1220]/75 border border-[#0a2540]/10 dark:border-blue-900/15 rounded-2xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#0a2540]/10 dark:border-blue-900/15 bg-slate-50/50 dark:bg-slate-950/20 text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                  <th className="p-4 pl-6">Scholar Name</th>
                  <th className="p-4">Target Company</th>
                  <th className="p-4">Industrial Sector</th>
                  <th className="p-4">Degree stream</th>
                  <th className="p-4 text-right pr-6">Salary Package</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-blue-900/10">
                {filteredPlacements.length > 0 ? (
                  filteredPlacements.map((record) => {
                    const progName = programs.find(p => p.id === record.programId)?.title || 'B.Tech CS';
                    return (
                      <tr key={record.id} className="text-xs hover:bg-[#0a2540]/5 dark:hover:bg-blue-950/10 transition-colors">
                        <td className="p-4 pl-6 font-semibold text-slate-800 dark:text-slate-100">
                          {record.studentName}
                        </td>
                        <td className="p-4">
                          <span className="inline-flex items-center gap-1.5 py-1 px-2.5 bg-[#0a2540]/5 dark:bg-[#0a2540]/20 font-semibold text-[#0a2540] dark:text-sky-205 rounded-lg">
                            <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                            <span>{record.company}</span>
                          </span>
                        </td>
                        <td className="p-4 text-slate-500 font-sans font-medium">
                          {record.sector}
                        </td>
                        <td className="p-4 text-slate-400 font-mono">
                          {progName}
                        </td>
                        <td className="p-4 text-right pr-6 font-bold text-[#b45309] dark:text-[#fcd34d] font-mono">
                          ${record.packageValue.toLocaleString()} / Yr
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-405 dark:text-slate-500 font-mono">
                      No student records matched search triggers
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
