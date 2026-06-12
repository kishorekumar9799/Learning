/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { School, Menu, X, Landmark, BookOpen, GraduationCap, Trophy, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';

interface NavigationProps {
  currentTab: string;
  onChangeTab: (tab: string) => void;
  applicationCount: number;
}

export default function Navigation({ currentTab, onChangeTab, applicationCount }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'overview', label: 'Legacy & Overview', icon: Landmark },
    { id: 'academics', label: 'Programs & Departments', icon: BookOpen },
    { id: 'admissions', label: 'Admissions Center', icon: GraduationCap },
    { id: 'placements', label: 'Placement Cell', icon: Trophy },
    { id: 'admin', label: 'Admin Dashboard', icon: ShieldAlert, badge: applicationCount }
  ];

  const handleItemClick = (id: string) => {
    onChangeTab(id);
    setIsOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#f4f7fa]/90 dark:bg-[#070d19]/90 backdrop-blur-md border-b border-[#0a2540]/10 dark:border-blue-900/30 shadow-xs transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
          
          {/* Logo Brand Brand */}
          <div 
            onClick={() => handleItemClick('overview')} 
            className="flex items-center gap-3 cursor-pointer active:opacity-90 select-none"
            id="logo-container"
          >
            <div className="p-2.5 bg-[#0a2540]/5 dark:bg-[#0a2540]/20 text-[#0a2540] dark:text-sky-400 rounded-xl flex items-center justify-center border border-[#0a2540]/15 dark:border-blue-800/40 shadow-inner">
              <School className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-headline-md text-xl md:text-2xl font-bold text-[#0a2540] dark:text-[#f1f5f9] tracking-tight leading-tight font-serif">
                Institute of Higher Learning
              </h1>
              <p className="text-[10px] uppercase tracking-widest text-[#b45309] dark:text-amber-400 font-bold font-mono">
                Academic Excellence Portal
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1.5 h-full">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  id={`nav-tab-${item.id}`}
                  className={`relative flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold tracking-wide transition-all duration-300 group ${
                    isActive 
                      ? 'text-[#0a2540] dark:text-sky-400 font-bold' 
                      : 'text-gray-500 hover:text-[#0a2540] dark:text-gray-450 dark:hover:text-[#f1f5f9] hover:bg-[#0a2540]/5 dark:hover:bg-[#0a2540]/10'
                  }`}
                >
                  <Icon className={`w-4 h-4 transition-transform duration-300 group-hover:scale-115 ${isActive ? 'stroke-[2.5px]' : 'stroke-[1.8px]'}`} />
                  <span>{item.label}</span>
                  
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="ml-1 px-1.5 py-0.5 text-[10px] font-bold bg-[#b45309] text-white dark:bg-amber-500 dark:text-slate-950 rounded-full animate-pulse">
                      {item.badge}
                    </span>
                  )}
 
                  {isActive && (
                    <motion.div 
                      layoutId="navIndicator"
                      className="absolute bottom-[-14px] left-4 right-4 h-0.75 bg-[#0a2540] dark:bg-sky-400 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsOpen(true)}
              className="p-2.5 rounded-xl border border-gray-100 hover:bg-gray-50 dark:border-slate-800 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-200 transition-colors"
              aria-label="Open navigation drawer"
              id="mobile-drawer-trigger"
            >
              <Menu className="w-5.5 h-5.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Side Navigation Drawer for Mobile Screen */}
      {isOpen && (
        <>
          <div 
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-[190] cursor-pointer"
            id="drawer-overlay"
          />
          <nav
            className="fixed inset-y-0 right-0 w-80 max-w-full bg-[#f4f7fa] dark:bg-[#070d19] shadow-2xl z-[200] flex flex-col p-6 transition-transform duration-300"
            id="navigation-drawer"
          >
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#0a2540]/5 dark:border-blue-900/30">
              <div>
                <span className="font-serif font-bold text-lg text-[#0a2540] dark:text-[#f1f5f9]">University Portal</span>
                <p className="text-[10px] tracking-wider text-blue-800/60 dark:text-sky-400/60 font-mono">Navigate departments & tools</p>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-blue-50 dark:hover:bg-[#0a2540]/20 text-gray-400 hover:text-gray-600 transition-colors"
                id="drawer-close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col gap-2.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className={`flex items-center justify-between w-full p-3.5 rounded-xl text-left font-semibold transition-all ${
                      isActive 
                        ? 'bg-[#0a2540] text-[#f4f7fa] shadow-md shadow-[#0a2540]/10' 
                        : 'text-gray-600 hover:bg-blue-50 dark:text-gray-300 dark:hover:bg-[#0a2540]/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge !== undefined && item.badge > 0 && (
                      <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${isActive ? 'bg-amber-400 text-slate-900' : 'bg-red-500 text-white'}`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-auto border-t border-[#0a2540]/5 dark:border-blue-900/30 pt-6">
              <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 pl-2">
                <School className="w-4 h-4 text-[#b45309] dark:text-amber-500" />
                <span className="font-mono text-xs text-[#0a2540] dark:text-sky-405">Term: Fall 2025-26</span>
              </div>
            </div>
          </nav>
        </>
      )}
    </>
  );
}
