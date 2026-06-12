/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { AcademicProgram, AdmissionApplication } from '../types';
import { Clipboard, ShieldCheck, Mail, Phone, School, BookOpen, AlertCircle, HelpCircle, FileText } from 'lucide-react';

interface AdmissionsTabProps {
  programs: AcademicProgram[];
  onApplicationSuccess: (app: AdmissionApplication) => void;
}

export default function AdmissionsTab({ programs, onApplicationSuccess }: AdmissionsTabProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    programId: '',
    transcriptGPA: '',
    previousSchool: '',
    statementOfPurpose: ''
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedStatus, setSubmittedStatus] = useState<AdmissionApplication | null>(null);

  // Active FAQ accordion state
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: 'What is the target threshold GPA requirement for B.Tech programs?',
      a: 'While we review applications holistically, admission scholars universally look for high school Calculus/Math benchmarks matching an unweighted GPA minimum equivalent of 3.00, or a Grade A equivalent in relevant state board modules.'
    },
    {
      q: 'How long after submitting will I receive my evaluation results?',
      a: 'The administrative review board evaluates student credentials within 10 business days. Qualified candidates are contacted via the portal for immediate faculty panel review calendars.'
    },
    {
      q: 'Can I apply for multiple engineering streams concurrently?',
      a: 'To guarantee systematic consideration, applicants may only submit one active registration per semester. However, you can declare department overrides or minors once enrollment parameters are finalized in Term 1.'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.fullName.trim()) errors.fullName = 'Full Name is required.';
    if (!formData.email.trim()) {
      errors.email = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Specify a valid email address.';
    }
    if (!formData.programId) {
      errors.programId = 'You must select an academic course program.';
    }
    
    const gpa = parseFloat(formData.transcriptGPA);
    if (isNaN(gpa) || gpa < 0 || gpa > 4.0) {
      errors.transcriptGPA = 'Specify GPA as a numeric value between 0.0 and 4.0';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          programId: formData.programId,
          transcriptGPA: parseFloat(formData.transcriptGPA),
          previousSchool: formData.previousSchool,
          statementOfPurpose: formData.statementOfPurpose
        })
      });

      if (!response.ok) {
        throw new Error('API server failed processing application.');
      }

      const result: AdmissionApplication = await response.json();
      setSubmittedStatus(result);
      onApplicationSuccess(result);
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        programId: '',
        transcriptGPA: '',
        previousSchool: '',
        statementOfPurpose: ''
      });
    } catch (e) {
      console.error('Error submitting application form:', e);
      alert('Internal Application Error: Could not post details.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-8">
      
      {/* Informative column (5 spans) */}
      <div className="lg:col-span-5 space-y-10">
        <div className="space-y-4">
          <span className="text-xs uppercase font-mono py-1 px-3 bg-[#b45309]/10 text-[#b45309] dark:bg-amber-950/45 dark:text-amber-400 rounded-full font-bold">
            Admission Guide
          </span>
          <h2 className="font-serif text-3xl font-bold text-slate-900 dark:text-white leading-tight">
            Apply to the Legacy of Academic Rigor
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
            Our admissions metrics seek intellectual talent with high motivation ratios, critical structural reasoning, and solid foundational math skills. Complete our portal registration form to formalize key documentation files.
          </p>
        </div>

        {/* Dynamic step visual list */}
        <div className="space-y-6">
          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-950/50 text-[#0a2540] dark:text-sky-350 flex items-center justify-center shrink-0 font-mono font-bold text-sm shadow-inner">
              01
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800 dark:text-white font-serif">Online Submission</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                Log personal parameters, past GPA coefficients, target curriculum stream, and clear personal purpose statements.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-950/50 text-[#0a2540] dark:text-sky-350 flex items-center justify-center shrink-0 font-mono font-bold text-sm shadow-inner">
              02
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800 dark:text-white font-serif">Assessment Commission</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                Qualified applicants pass to structural panel reviews regarding engineering potential in 5 chosen streams.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-950/50 text-[#0a2540] dark:text-sky-350 flex items-center justify-center shrink-0 font-mono font-bold text-sm shadow-inner">
              03
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800 dark:text-white font-serif">Direct Verification Enrollment</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                Admitted students verify past official certificates, pay term fees, and initialize specialized orientation schedules.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Accordion list */}
        <div className="space-y-4 pt-6 border-t border-slate-100 dark:border-slate-800">
          <h3 className="font-serif text-lg font-bold text-slate-800 dark:text-white">Admissions FAQ Help</h3>
          <div className="space-y-2.5">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div 
                  key={index}
                  className="border border-[#0a2540]/10 dark:border-blue-900/15 rounded-lg overflow-hidden bg-[#fdfcfb] dark:bg-[#070d19]/35"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full p-4 text-left flex justify-between items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-850/20 text-xs font-semibold text-slate-700 dark:text-slate-200 cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <HelpCircle className={`w-3.5 h-3.5 text-slate-400 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="p-4 bg-[#fbfaf7] dark:bg-slate-900/10 border-t border-[#0a2540]/10 dark:border-blue-900/20 text-xs text-slate-500 leading-relaxed font-sans font-mono">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Interactive Form column (7 spans) */}
      <div className="lg:col-span-7">
        {submittedStatus ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 rounded-2xl bg-[#fdfcfb] dark:bg-[#0a1220]/75 border border-[#0a2540]/10 dark:border-blue-900/15 shadow-xl space-y-6 text-center select-none"
          >
            <div className="p-4 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-sky-400 rounded-full w-fit mx-auto mb-2 border border-blue-100 dark:border-blue-900 shadow-inner">
              <ShieldCheck className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="font-mono text-xs font-bold text-blue-600 uppercase">Application Submitted Successfully</span>
              <h3 className="font-serif text-2xl font-bold text-[#0a2540] dark:text-white">Congratulations, {submittedStatus.fullName}!</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                Your admission files was logged in the secure register under ticket ID: <span className="font-mono font-bold text-slate-800 dark:text-slate-100">{submittedStatus.id}</span>
              </p>
            </div>

            <div className="p-5 border border-dashed border-[#0a2540]/20 dark:border-[#0a2540]/30 rounded-xl max-w-sm mx-auto text-left space-y-3 bg-[#fbfaf7] dark:bg-slate-950/30 font-mono text-xs text-slate-600 dark:text-slate-350">
              <div className="flex justify-between"><span className="text-slate-400">STATUS:</span> <span className="font-bold py-0.5 px-2 bg-yellow-50 text-[#b45309] rounded-full">{submittedStatus.status}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">STREAM COURSE:</span> <span className="font-bold text-[#0a2540] dark:text-white text-right break-words max-w-1/2">{programs.find(p => p.id === submittedStatus.programId)?.title}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">ENTER DETAILS:</span> <span className="font-bold text-slate-800 dark:text-white">{submittedStatus.email}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">CGPA COEFFICIENT:</span> <span className="font-bold text-slate-850 dark:text-white">{Number(submittedStatus.transcriptGPA).toFixed(2)} / 4.00</span></div>
            </div>

            <p className="text-[10px] text-slate-400 max-w-xs mx-auto leading-normal">
              A verification parameters outline will be mailed to you shortly. You may monitor status indexes in the Admin Dashboard!
            </p>

            <button
              onClick={() => setSubmittedStatus(null)}
              className="px-6 py-2.5 bg-[#0a2540] hover:bg-blue-900 text-white dark:bg-amber-500 dark:text-slate-950 font-bold rounded-lg text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Submit another application
            </button>
          </motion.div>
        ) : (
          <form 
            onSubmit={handleSubmit}
            className="p-6 md:p-8 rounded-2xl bg-[#fdfcfb] dark:bg-[#0a1220]/75 border border-[#0a2540]/10 dark:border-blue-900/20 shadow-xl space-y-6"
          >
            <div className="space-y-1">
              <h3 className="font-serif text-xl font-bold text-slate-950 dark:text-white tracking-wide">
                Digital Admission Register Form
              </h3>
              <p className="text-xs text-slate-400 font-mono">Fill out all target configurations below cleanly</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 font-serif">Applicant's Full Name *</label>
                <div className="relative">
                  <Clipboard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="E.g. Sophia Henderson"
                    className={`w-full pl-9 pr-3 py-2 border rounded-lg text-sm focus:outline-none placeholder:text-slate-400 focus:border-blue-500 text-slate-800 dark:bg-slate-850 dark:border-slate-800 dark:text-slate-100 ${formErrors.fullName ? 'border-red-500' : 'border-[#0a2540]/10'}`}
                  />
                </div>
                {formErrors.fullName && <div className="text-[10px] text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{formErrors.fullName}</div>}
              </div>

              {/* Email Address */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 font-serif">Primary Email Address *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="sophia@student.edu"
                    className={`w-full pl-9 pr-3 py-2 border rounded-lg text-sm focus:outline-none placeholder:text-slate-400 focus:border-blue-500 text-slate-800 dark:bg-slate-850 dark:border-slate-800 dark:text-slate-100 ${formErrors.email ? 'border-red-500' : 'border-[#0a2540]/10'}`}
                  />
                </div>
                {formErrors.email && <div className="text-[10px] text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{formErrors.email}</div>}
              </div>

              {/* Phone Line */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 font-serif">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 321-4890"
                    className="w-full pl-9 pr-3 py-2 border border-[#0a2540]/10 dark:border-blue-800 rounded-lg text-sm focus:outline-none placeholder:text-slate-400 focus:border-blue-500 text-slate-800 dark:bg-[#070d19] dark:text-slate-100"
                  />
                </div>
              </div>

              {/* Selected Program Option */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 font-serif">Select engineering course stream *</label>
                <div className="relative">
                  <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <select 
                    name="programId"
                    value={formData.programId}
                    onChange={handleInputChange}
                    className={`w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-850 border rounded-lg text-sm focus:outline-none focus:border-blue-500 text-slate-800 dark:text-slate-100 ${formErrors.programId ? 'border-red-500' : 'border-slate-200 dark:border-slate-800'}`}
                  >
                    <option value="">-- Choose engineering program --</option>
                    {programs.map(p => (
                      <option key={p.id} value={p.id}>{p.title} ({p.degree})</option>
                    ))}
                  </select>
                </div>
                {formErrors.programId && <div className="text-[10px] text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{formErrors.programId}</div>}
              </div>

              {/* Past High School GPA Coefficient */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 font-serif">Past GPA (scaled / 4.00) *</label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="number" 
                    step="0.01"
                    name="transcriptGPA"
                    value={formData.transcriptGPA}
                    onChange={handleInputChange}
                    placeholder="3.95"
                    className={`w-full pl-9 pr-3 py-2 border rounded-lg text-sm focus:outline-none placeholder:text-slate-400 focus:border-blue-500 text-slate-805 dark:bg-[#070d19] dark:border-slate-800 dark:text-slate-100 ${formErrors.transcriptGPA ? 'border-red-500' : 'border-[#0a2540]/10'}`}
                  />
                </div>
                {formErrors.transcriptGPA && <div className="text-[10px] text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{formErrors.transcriptGPA}</div>}
              </div>

              {/* Past Academy School */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 font-serif">Preceding High School Name / Academy</label>
                <div className="relative">
                  <School className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    name="previousSchool"
                    value={formData.previousSchool}
                    onChange={handleInputChange}
                    placeholder="E.g. Pinecrest High Academy"
                    className="w-full pl-9 pr-3 py-2 border border-[#0a2540]/10 dark:border-slate-800 rounded-lg text-sm focus:outline-none placeholder:text-slate-400 focus:border-blue-500 text-slate-800 dark:bg-[#070d19] dark:text-slate-100"
                  />
                </div>
              </div>
            </div>

            {/* Statement Purpose Statement */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 font-serif">Statement of Purpose / Academic Vision / Letter of Intent</label>
              <textarea 
                rows={4}
                name="statementOfPurpose"
                value={formData.statementOfPurpose}
                onChange={handleInputChange}
                placeholder="Declare why you plan to study at the Institute and detailing any past code projects or mathematics honors..."
                className="w-full p-3.5 border border-[#0a2540]/10 dark:border-slate-800 rounded-lg text-sm focus:outline-none focus:border-blue-500 text-slate-800 dark:bg-slate-850 dark:text-slate-100 placeholder:text-slate-400"
              />
            </div>

            <div className="text-[10px] text-slate-400 font-mono">
              * Required fields. By registering, you confirm the details are entirely authentic and subject to direct certificate validation.
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-[#0a2540] hover:bg-blue-900 dark:bg-amber-500 dark:text-slate-900 text-[#f4f7fa] font-bold rounded-xl text-xs uppercase tracking-widest transition-all shadow-md active:scale-98 cursor-pointer disabled:opacity-40"
            >
              {isSubmitting ? 'Submitting registration files...' : 'Submit Admission Register File'}
            </button>
          </form>
        )}
      </div>

    </div>
  );
}
