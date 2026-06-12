/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { AdmissionApplication, AcademicProgram } from '../types';
import { ShieldCheck, UserCheck, Trash2, Mail, ExternalLink, Calendar, PlusCircle, Award, CheckCircle2, XCircle } from 'lucide-react';

interface AdminTabProps {
  applications: AdmissionApplication[];
  programs: AcademicProgram[];
  onStatusChange: (id: string, newStatus: AdmissionApplication['status']) => void;
  onDeleteApplication: (id: string) => void;
}

export default function AdminTab({ applications, programs, onStatusChange, onDeleteApplication }: AdminTabProps) {
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [loadingId, setLoadingId] = useState<string | null>(null);

  // Status lists
  const statusOptions = ['All', 'Pending', 'Reviewing', 'Accepted', 'Declined'];

  // Filter application dataset
  const filteredApps = applications.filter(app => {
    return filterStatus === 'All' || app.status === filterStatus;
  });

  // Numeric KPI statistics
  const totalApps = applications.length;
  const pendingCount = applications.filter(a => a.status === 'Pending').length;
  const acceptedCount = applications.filter(a => a.status === 'Accepted').length;
  
  const averageGpa = totalApps > 0 
    ? (applications.reduce((acc, curr) => acc + curr.transcriptGPA, 0) / totalApps).toFixed(2)
    : '0.00';

  const handleStatusUpdateLocally = async (id: string, status: AdmissionApplication['status']) => {
    setLoadingId(id);
    try {
      const res = await fetch(`/api/applications/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });

      if (!res.ok) {
        throw new Error('API server rejected state update');
      }

      onStatusChange(id, status);
    } catch (e) {
      console.error('Error updating state via API:', e);
      alert('Could not update status: API parameter mismatch.');
    } finally {
      setLoadingId(null);
    }
  };

  const handleDeleteLocally = async (id: string) => {
    if (!confirm('Are you absolutely sure you want to completely delete this student application from records? This action is durable.')) {
      return;
    }
    setLoadingId(id);
    try {
      const res = await fetch(`/api/applications/${id}`, {
        method: 'DELETE'
      });

      if (!res.ok) {
        throw new Error('API server rejected deletion request');
      }

      onDeleteApplication(id);
    } catch (e) {
      console.error('Error deleting student registration:', e);
      alert('Could not delete registration entry.');
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="space-y-10 py-8 select-none">
      
      {/* Banner / Admin Credentials info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-[#031d16] border border-emerald-950/45 rounded-2xl text-white">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-mono font-bold tracking-wider">
            <ShieldCheck className="w-4 h-4 animation-pulse" />
            <span>Verifying Admin Credentials</span>
          </div>
          <h2 className="font-serif text-2xl font-bold font-serif text-[#fbfaf7]">Registries Board Admission Console</h2>
          <p className="text-xs text-slate-400 font-sans">
            Oversee, filter, authenticate, and process active student application files.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-emerald-900/30 p-3 rounded-xl border border-emerald-800/30 shrink-0 font-mono text-xs">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-slate-300">Live Server sync active</span>
        </div>
      </div>

      {/* KPI Statistic cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        
        {/* Total Submitted metric */}
        <div className="p-5 bg-[#fdfcfb] dark:bg-[#031a14] border border-[#0b3b2c]/10 dark:border-emerald-800/20 rounded-xl shadow-xs">
          <div className="text-xs font-semibold text-slate-400 font-mono uppercase tracking-wide">Total Applications</div>
          <div className="text-3xl font-bold text-[#0b3b2c] dark:text-white mt-1.5 font-mono">{totalApps}</div>
          <div className="text-[10px] text-slate-400 mt-1 font-mono">Durable document register</div>
        </div>

        {/* Pending review required */}
        <div className="p-5 bg-[#fdfcfb] dark:bg-[#031a14] border border-[#0b3b2c]/10 dark:border-emerald-800/20 rounded-xl shadow-xs">
          <div className="text-xs font-semibold text-slate-400 font-mono uppercase tracking-wide">Pending Action</div>
          <div className="text-3xl font-bold mt-1.5 font-mono text-[#b45309] dark:text-amber-400">{pendingCount}</div>
          <div className="text-[10px] text-slate-400 mt-1 font-mono">Requires decision processing</div>
        </div>

        {/* Accepted admitted */}
        <div className="p-5 bg-[#fdfcfb] dark:bg-[#031a14] border border-[#0b3b2c]/10 dark:border-emerald-800/20 rounded-xl shadow-xs">
          <div className="text-xs font-semibold text-slate-400 font-mono uppercase tracking-wide">Accepted Scholar Entries</div>
          <div className="text-3xl font-bold mt-1.5 font-mono text-emerald-600 dark:text-emerald-400">{acceptedCount}</div>
          <div className="text-[10px] text-slate-400 mt-1 font-mono">Admitted orientation scheduled</div>
        </div>

        {/* average gpa applicant pool coefficient */}
        <div className="p-5 bg-[#fdfcfb] dark:bg-[#031a14] border border-[#0b3b2c]/10 dark:border-emerald-800/20 rounded-xl shadow-xs">
          <div className="text-xs font-semibold text-slate-400 font-mono uppercase tracking-wide">Avg Applicant GPA</div>
          <div className="text-3xl font-bold mt-1.5 font-mono text-[#b45309] dark:text-amber-400">{averageGpa}</div>
          <div className="text-[10px] text-slate-400 mt-1 font-mono">Weighted pool parameter</div>
        </div>

      </div>

      {/* Control panel and filters option */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white">Active Registrations Grid</h3>
          
          {/* Status filters buttons */}
          <div className="flex flex-wrap gap-1.5 bg-emerald-55/10 dark:bg-[#031d16] p-1.5 rounded-xl border border-[#0b3b2c]/10 dark:border-emerald-800/15">
            {statusOptions.map(st => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  filterStatus === st 
                    ? 'bg-[#0b3b2c] text-[#fbfaf7] dark:bg-amber-500 dark:text-slate-950 font-bold shadow-xs' 
                    : 'text-slate-500 hover:text-[#0b3b2c] dark:hover:text-emerald-400'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Master datagrid lists */}
        {filteredApps.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {filteredApps.map((app) => {
              const programName = programs.find(p => p.id === app.programId)?.title || 'B.Tech IT';
              
              // Status Styling logic
              const statusStyleMap = {
                Pending: 'bg-yellow-50 text-[#b45309] border-yellow-105 dark:bg-yellow-950/20 dark:text-yellow-400',
                Reviewing: 'bg-blue-50 text-blue-750 border-blue-150 dark:bg-blue-950/20 dark:text-blue-400',
                Accepted: 'bg-emerald-50 text-emerald-750 border-emerald-150 dark:bg-teal-950/20 dark:text-[#a7f3d0]',
                Declined: 'bg-rose-50 text-rose-755 border-rose-150 dark:bg-rose-950/20 dark:text-rose-400'
              };

              return (
                <div 
                  key={app.id}
                  className="p-6 bg-[#fdfcfb] dark:bg-[#031d16]/45 border border-[#0b3b2c]/10 dark:border-emerald-850/30 rounded-2xl shadow-sm space-y-4 hover:border-[#0b3b2c]/15 dark:hover:border-emerald-700 transition-[#0b3b2c] duration-300"
                >
                  {/* Top line detail */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-[#0b3b2c]/10 dark:border-emerald-800/15">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5">
                        <span className="font-serif font-bold text-lg text-[#0b3b2c] dark:text-slate-100">{app.fullName}</span>
                        <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-mono font-bold uppercase tracking-wider ${statusStyleMap[app.status]}`}>
                          {app.status}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 font-mono">
                        <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {app.email}</span>
                        <span>• TICKET ID: {app.id}</span>
                      </div>
                    </div>

                    <div className="text-right font-mono text-xs text-slate-400">
                      <span>Submitted: {new Date(app.appliedAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Program details details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
                    <div className="space-y-1">
                      <span className="text-slate-400 font-mono block">TARGET STREAM COURSE:</span>
                      <span className="font-bold text-slate-805 dark:text-slate-200">{programName}</span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-slate-400 font-mono block">APPLICANT GPA SCORES:</span>
                      <span className="font-bold text-[#b45309] dark:text-[#fcd34d] font-mono">{app.transcriptGPA.toFixed(2)} / 4.00</span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-slate-400 font-mono block">PRECEDING SCHOOL:</span>
                      <span className="font-semibold text-slate-700 dark:text-slate-300">{app.previousSchool || 'Private Prep'}</span>
                    </div>
                  </div>

                  {/* Letter statement area */}
                  {app.statementOfPurpose && (
                    <div className="p-3 bg-emerald-55/10 dark:bg-[#02130e]/40 border border-[#0b3b2c]/10 dark:border-emerald-800/10 rounded-xl text-xs text-slate-500 leading-relaxed font-sans">
                      <strong className="block text-slate-600 dark:text-slate-350 mb-1 font-mono uppercase text-[9px] tracking-wide">Letter of Intent Statement:</strong>
                      "{app.statementOfPurpose}"
                    </div>
                  )}

                  {/* Review Board Decision Controls */}
                  <div className="flex flex-wrap justify-between items-center gap-3 pt-3">
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs text-slate-400 flex items-center font-mono py-1 pr-1">Promote State:</span>
                      
                      {app.status === 'Pending' && (
                        <button
                          onClick={() => handleStatusUpdateLocally(app.id, 'Reviewing')}
                          className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold font-mono text-[10px] rounded-lg border border-blue-200 uppercase tracking-wide transition-all cursor-pointer"
                        >
                          Send to Review
                        </button>
                      )}

                      {(app.status === 'Pending' || app.status === 'Reviewing') && (
                        <>
                          <button
                            onClick={() => handleStatusUpdateLocally(app.id, 'Accepted')}
                            className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold font-mono text-[10px] rounded-lg border border-emerald-200 uppercase tracking-wide transition-all cursor-pointer flex items-center gap-1"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Accept</span>
                          </button>

                          <button
                            onClick={() => handleStatusUpdateLocally(app.id, 'Declined')}
                            className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-800 font-bold font-mono text-[10px] rounded-lg border border-rose-200 uppercase tracking-wide transition-all cursor-pointer flex items-center gap-1"
                          >
                            <XCircle className="w-3.5 h-3.5 text-rose-600" />
                            <span>Decline</span>
                          </button>
                        </>
                      )}

                      {(app.status === 'Accepted' || app.status === 'Declined') && (
                        <button
                          onClick={() => handleStatusUpdateLocally(app.id, 'Pending')}
                          className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold font-mono text-[10px] rounded-lg border border-slate-200 uppercase tracking-wide transition-all cursor-pointer"
                        >
                          Change status back to Pending
                        </button>
                      )}
                    </div>

                    {/* Delete entry altogether */}
                    <button
                      onClick={() => handleDeleteLocally(app.id)}
                      className="p-2 bg-slate-50 hover:bg-rose-50 hover:text-rose-600 rounded-xl text-slate-400 border border-slate-150 transition-all cursor-pointer flex items-center gap-1 shrink-0"
                      title="Permanently Delete Application"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="text-[10px] font-bold font-mono uppercase tracking-normal">Delete Application</span>
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-16 text-center rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
            <UserCheck className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h4 className="text-sm font-semibold text-slate-600 dark:text-slate-400">Registry list represents zero records</h4>
            <p className="text-xs text-slate-400 mt-1 font-mono">No student portfolios match the filtered state category index.</p>
          </div>
        )}
      </div>

    </div>
  );
}
