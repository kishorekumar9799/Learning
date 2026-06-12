/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import Navigation from './components/Navigation';
import HeroParallax from './components/HeroParallax';
import StatsBar from './components/StatsBar';
import OverviewTab from './components/OverviewTab';
import AcademicsTab from './components/AcademicsTab';
import AdmissionsTab from './components/AdmissionsTab';
import PlacementsTab from './components/PlacementsTab';
import AdminTab from './components/AdminTab';
import { Department, AcademicProgram, AdmissionApplication, PlacementRecord, UniversityStats } from './types';
import { Landmark, ArrowUp, Mail, MapPin, Phone, GraduationCap, Sparkles, Loader2, RefreshCw } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('overview');
  
  // Database datasets state
  const [departments, setDepartments] = useState<Department[]>([]);
  const [programs, setPrograms] = useState<AcademicProgram[]>([]);
  const [stats, setStats] = useState<UniversityStats>({
    enrollmentCount: 15000,
    nationalRanking: 8,
    researchFundingMillions: 54,
    placementRatePercent: 98
  });
  const [placements, setPlacements] = useState<PlacementRecord[]>([]);
  const [applications, setApplications] = useState<AdmissionApplication[]>([]);
  
  // Loading and Error parameters
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Scroll to top display indicator
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Master fetching routine
  const fetchUniversityData = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const [deptsRes, progsRes, statsRes, placementsRes, appsRes] = await Promise.all([
        fetch('/api/departments'),
        fetch('/api/programs'),
        fetch('/api/stats'),
        fetch('/api/placements'),
        fetch('/api/applications')
      ]);

      if (!deptsRes.ok || !progsRes.ok || !statsRes.ok || !placementsRes.ok || !appsRes.ok) {
        throw new Error('Some API resources failed loading.');
      }

      const depts = await deptsRes.json();
      const progs = await progsRes.json();
      const statsObj = await statsRes.json();
      const placementArr = await placementsRes.json();
      const applicationsArr = await appsRes.json();

      setDepartments(depts);
      setPrograms(progs);
      setStats(statsObj);
      setPlacements(placementArr);
      setApplications(applicationsArr);
    } catch (e: any) {
      console.error('Failed syncing university parameter feeds:', e);
      setErrorMessage(e.message || 'API syncing lost. Launch Node server properly.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUniversityData();

    const handleScrollEvent = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScrollEvent, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollEvent);
  }, []);

  const handleApplicationSuccess = (newApp: AdmissionApplication) => {
    // Supplement local cache lists safely
    setApplications(prev => [newApp, ...prev]);
  };

  const handleApplicationStatusChange = (id: string, newStatus: AdmissionApplication['status']) => {
    setApplications(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
  };

  const handleDeleteApplication = (id: string) => {
    setApplications(prev => prev.filter(a => a.id !== id));
  };

  const renderActiveTab = () => {
    switch (currentTab) {
      case 'overview':
        return <OverviewTab />;
      case 'academics':
        return <AcademicsTab departments={departments} programs={programs} />;
      case 'admissions':
        return <AdmissionsTab programs={programs} onApplicationSuccess={handleApplicationSuccess} />;
      case 'placements':
        return <PlacementsTab placements={placements} programs={programs} />;
      case 'admin':
        return (
          <AdminTab 
            applications={applications} 
            programs={programs} 
            onStatusChange={handleApplicationStatusChange} 
            onDeleteApplication={handleDeleteApplication} 
          />
        );
      default:
        return <OverviewTab />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f7fa] text-[#132a4a] dark:bg-[#070d19] dark:text-[#f1f5f9] selection:bg-[#0a2540] selection:text-white transition-all duration-300">
      
      {/* Dynamic top brand bar navigator */}
      <Navigation 
        currentTab={currentTab} 
        onChangeTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }} 
        applicationCount={applications.filter(a => a.status === 'Pending').length}
      />

      {/* Main Canvas Space */}
      <main className="flex-grow">
        
        {/* Render Parallax Section purely when on legacy/'overview' page */}
        {currentTab === 'overview' && (
          <HeroParallax 
            onExplorePrograms={() => {
              setCurrentTab('academics');
              window.scrollTo({ top: 380, behavior: 'smooth' });
            }}
            onApplyNow={() => {
              setCurrentTab('admissions');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Floating statistics cards bar rendered on legacy view */}
        {currentTab === 'overview' && <StatsBar stats={stats} />}

        {/* Content Wrapper */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          
          {/* Global Loading / Error Interceptors */}
          {isLoading ? (
            <div className="p-24 text-center space-y-4">
              <Loader2 className="w-8 h-8 text-[#0a2540] dark:text-sky-401 animate-spin mx-auto" />
              <span className="block text-xs font-mono text-slate-500 font-bold uppercase tracking-wider animate-pulse">
                Syncing University Records Feed...
              </span>
            </div>
          ) : errorMessage ? (
            <div className="p-16 max-w-xl mx-auto text-center border border-dashed border-red-200 bg-red-50/50 rounded-2xl space-y-4 mt-12">
              <RefreshCw className="w-8 h-8 text-red-600 mx-auto" />
              <h3 className="font-serif text-lg font-bold text-red-800">Connection Error</h3>
              <p className="text-xs text-red-600/90 font-mono leading-relaxed">
                {errorMessage}
              </p>
              <button
                onClick={fetchUniversityData}
                className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Retry API Syncing
              </button>
            </div>
          ) : (
            /* Root-level view changes wrapped in smooth micro-fade animations */
            <motion.div 
              key={currentTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-6 md:mt-10"
            >
              {renderActiveTab()}
            </motion.div>
          )}

        </div>
      </main>

      {/* Elegant Standard Institutional Footer */}
      <footer className="bg-[#0a2540] text-white border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
          
          <div className="space-y-4 col-span-1 md:col-span-2">
            <div className="flex items-center gap-2">
              <Landmark className="w-5 h-5 text-amber-300" />
              <span className="font-serif font-bold text-lg text-white">Institute of Higher Learning</span>
            </div>
            <p className="text-xs text-sky-100/70 max-w-md leading-relaxed">
              Empowering global scholars, engineers, and visionaries through uncompromising academic standards, state-funded lab centers, and direct placement opportunities since 1894.
            </p>
            <div className="flex items-center gap-1.5 text-[10px] font-mono tracking-widest text-[#ffe088]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Category-1 Autonomous University Status</span>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold tracking-widest uppercase text-amber-300">Contact Desk</h4>
            <ul className="space-y-2.5 text-xs text-sky-100/80">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span>Stone Quadrangle Rd, Univ. Campus</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-400" />
                <span>+1 (555) 900-1189</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-400" />
                <span>admissions@higher-learning.edu</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold tracking-widest uppercase text-amber-300">Legal Compliance</h4>
            <ul className="space-y-2.5 text-xs text-sky-100/80 font-mono">
              <li><a href="#" className="hover:underline">Academic Integrity Charter</a></li>
              <li><a href="#" className="hover:underline">Terms of Enrollment Services</a></li>
              <li><a href="#" className="hover:underline">Privacy Registers Directive</a></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-800/80 py-6 text-center text-xs text-slate-400 font-mono">
          <span>© {new Date().getFullYear()} Institute of Higher Learning. Verified Academic Record System.</span>
        </div>
      </footer>

      {/* Floating Scroll back to top icon */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 p-3 bg-[#0a2540] hover:bg-slate-900 border border-blue-900/40 text-white rounded-full shadow-xl shadow-slate-950/20 hover:shadow-blue-500/20 transition-all cursor-pointer z-50 hover:-translate-y-1"
          title="Scroll to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

    </div>
  );
}
