/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Department, AcademicProgram } from '../types';
import { Search, SlidersHorizontal, BookOpen, Clock, ClipboardCheck, ArrowUpRight, GraduationCap } from 'lucide-react';

interface AcademicsTabProps {
  departments: Department[];
  programs: AcademicProgram[];
}

export default function AcademicsTab({ departments, programs }: AcademicsTabProps) {
  const [degreeFilter, setDegreeFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDeptId, setSelectedDeptId] = useState<string | null>(null);
  const [expandedProgramId, setExpandedProgramId] = useState<string | null>(null);

  // Filter degrees dynamically
  const degrees = ['All', 'B.Tech', 'M.Tech', 'M.S.', 'Ph.D'];

  const filteredPrograms = programs.filter(prog => {
    const matchesDegree = degreeFilter === 'All' || prog.degree === degreeFilter;
    const matchesSearch = prog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          prog.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = !selectedDeptId || prog.departmentId === selectedDeptId;
    return matchesDegree && matchesSearch && matchesDept;
  });

  return (
    <div className="space-y-12 py-8">
      
      {/* Search and Filters panel */}
      <div className="bg-[#fdfcfb] dark:bg-[#0a1220]/75 border border-[#0a2540]/10 dark:border-blue-900/15 rounded-2xl p-6 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <div className="space-y-1">
            <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white">Scientific Disciplines & Programs</h3>
            <p className="text-xs text-slate-500 font-mono">Explore active university curriculum options and departmental parameters</p>
          </div>
          
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search programs core keywords..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#fbfaf7] dark:bg-[#070d19]/80 border border-[#0a2540]/10 dark:border-blue-950 rounded-xl text-sm focus:outline-none focus:border-blue-500 placeholder:text-slate-400 text-slate-800 dark:text-slate-100 transition-colors"
            />
          </div>
        </div>

        {/* Filters Group */}
        <div className="flex flex-wrap gap-2.5 items-center border-t border-[#0a2540]/10 dark:border-blue-900/15 pt-5">
          <div className="flex items-center gap-2 mr-2 text-xs text-slate-500 font-bold uppercase tracking-wider font-mono">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#b45309] dark:text-amber-400" />
            <span>Select Tier:</span>
          </div>
          {degrees.map(deg => (
            <button
              key={deg}
              onClick={() => setDegreeFilter(deg)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                degreeFilter === deg 
                  ? 'bg-[#0a2540] text-[#f4f7fa] dark:bg-amber-500 dark:text-slate-950 font-bold shadow-xs' 
                  : 'bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/20 dark:hover:bg-blue-900/35 text-slate-600 dark:text-slate-300'
              }`}
            >
              {deg === 'All' ? 'All Degrees' : deg}
            </button>
          ))}
        </div>
      </div>

      {/* Departments Grid section */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white">Governing Academic Departments</h3>
          {selectedDeptId && (
            <button 
              onClick={() => setSelectedDeptId(null)}
              className="text-xs text-[#b45309] dark:text-amber-500 hover:underline font-mono cursor-pointer"
            >
              [Clear Department Selection]
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {departments.map((dept) => {
            const isSelected = selectedDeptId === dept.id;
            return (
              <motion.div
                key={dept.id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedDeptId(isSelected ? null : dept.id)}
                className={`rounded-2xl border transition-all overflow-hidden cursor-pointer select-none ${
                  isSelected 
                    ? 'border-[#0a2540] bg-[#0a2540]/5 dark:border-sky-400 dark:bg-blue-950/20 shadow-lg' 
                    : 'border-[#0a2540]/10 bg-[#fdfcfb] dark:border-blue-900/15 dark:bg-[#0a1220]/75 shadow-xs'
                }`}
              >
                <div className="h-32 relative overflow-hidden bg-slate-100">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070d19] via-slate-900/40 to-transparent z-10" />
                  <img src={dept.image} alt={dept.name} className="w-full h-full object-cover" />
                  <div className="absolute bottom-4 left-4 z-20">
                    <span className="text-[10px] uppercase tracking-widest text-amber-300 font-mono font-bold">
                      HOD Lead: {dept.hod}
                    </span>
                    <h4 className="text-base font-bold text-white tracking-wide font-serif">{dept.name}</h4>
                  </div>
                </div>
                
                <div className="p-5 space-y-4">
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                    {dept.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs font-semibold pt-3 border-t border-[#0a2540]/10 dark:border-blue-900/25">
                    <span className="text-slate-400 font-mono">
                      {programs.filter(p => p.departmentId === dept.id).length} Degree Streams
                    </span>
                    <span className={`flex items-center gap-1 font-mono transition-colors ${isSelected ? 'text-[#0a2540] dark:text-[#f4f7fa]' : 'text-slate-400'}`}>
                      {isSelected ? 'Focused view active' : 'Click to filter programs'} <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Program offerings listings */}
      <div className="space-y-6">
        <div className="flex justify-between items-center border-b border-gray-100 dark:border-slate-800 pb-3">
          <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white">Active Degrees Catalog</h3>
          <span className="text-xs font-mono py-1 px-3 bg-slate-100 dark:bg-slate-800 rounded-full font-bold text-slate-500">
            {filteredPrograms.length} catalog options matching filters
          </span>
        </div>

        {filteredPrograms.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {filteredPrograms.map((prog) => {
              const isExpanded = expandedProgramId === prog.id;
              const deptName = departments.find(d => d.id === prog.departmentId)?.name || 'General';
              
              return (
                <div 
                  key={prog.id}
                  className="bg-[#fdfcfb] dark:bg-[#070d19]/40 border border-[#0a2540]/10 dark:border-blue-950/30 rounded-xl overflow-hidden transition-all duration-300 shadow-xs hover:shadow-md"
                >
                  <div 
                    onClick={() => setExpandedProgramId(isExpanded ? null : prog.id)}
                    className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer select-none"
                  >
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded bg-[#0a2540] text-[#f4f7fa] dark:bg-sky-500 dark:text-slate-950 font-mono text-[10px] font-bold">
                          {prog.degree}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">
                          • {deptName}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-slate-800 dark:text-white font-serif tracking-wide">
                        {prog.title}
                      </h4>
                    </div>

                    <div className="flex items-center gap-6 text-sm text-slate-500 shrink-0">
                      <div className="flex items-center gap-1.5 font-mono text-xs">
                        <Clock className="w-4 h-4 text-[#b45309] dark:text-amber-500" />
                        <span>{prog.duration}</span>
                      </div>
                      <span className="text-xs text-[#b45309] dark:text-sky-400 font-semibold font-mono">
                        {isExpanded ? '[Collapse details]' : '[View requirements & syllabus]'}
                      </span>
                    </div>
                  </div>

                  {isExpanded && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-[#0a2540]/10 dark:border-blue-900/15 bg-blue-50/5 dark:bg-[#070d19]/40 p-5 md:p-6 space-y-5"
                    >
                      <div className="space-y-2">
                        <h5 className="font-semibold text-xs text-slate-700 dark:text-slate-300 uppercase tracking-wider font-mono">
                          Program Academic Charter
                        </h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                          {prog.description}
                        </p>
                      </div>

                      <div className="space-y-2.5">
                        <h5 className="font-semibold text-xs text-amber-700 dark:text-amber-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
                          <ClipboardCheck className="w-4 h-4" />
                          <span>Admission Eligibility Pre-requisites</span>
                        </h5>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                          {prog.requirements.map((req, i) => (
                            <li key={i} className="flex items-center gap-2 pl-3.5 relative text-slate-600 dark:text-slate-300 font-mono">
                              <span className="absolute left-0 w-1.5 h-1.5 rounded-full bg-[#0a2540]" />
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-12 text-center rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
            <BookOpen className="w-8 h-8 text-slate-300 mx-auto mb-3" />
            <span className="block text-sm font-semibold text-slate-600 dark:text-slate-400">No programs found</span>
            <p className="text-xs text-slate-400 mt-1">Try resetting the tier selection filter or search terms</p>
          </div>
        )}
      </div>
    </div>
  );
}
