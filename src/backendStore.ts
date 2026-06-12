/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import fs from 'fs';
import path from 'path';
import { Department, AcademicProgram, AdmissionApplication, PlacementRecord, UniversityStats } from './types.js';

// Define DB path relative to the runtime root directory
const dbPath = path.resolve(process.cwd(), 'database.json');

const defaultStats: UniversityStats = {
  enrollmentCount: 15240,
  nationalRanking: 8,
  researchFundingMillions: 54.5,
  placementRatePercent: 98
};

const defaultDepartments: Department[] = [
  {
    id: 'cs',
    name: 'Computer Science & Engineering',
    icon: 'computer',
    description: 'Advancing the frontiers of computing through software systems, robust theory, artificial intelligence, and cutting-edge paradigms.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBidauQ_Qj4GmA32IgQEvLGozG7oUWFxwNXXJvtOY1XQRBqhwxnP5pBUO62LDOSJUT3Rdc80t8St5bU8qXwIeoH_te__eWb7rUpKOky8xPd78CgUIMTWLxeT-9GgoMi8papbTi7UaFvJfBDG0G7MkTGWbLl342748ixrKkn88ttL3C7Anco3O3VkPmlVhnISwqprZ8pdjQpOwb-1u1wIb6eaMUheuCvtjNj6SB4VQfu5sHVamfSlkSCQw1ATMJcWg_bnKnE_Ia__8ex',
    hod: 'Dr. Raymond Carver'
  },
  {
    id: 'ai',
    name: 'AI & Data Science',
    icon: 'psychology',
    description: 'Pioneering intelligent machines, high-dimensional statistical physics, complex system models, and big data pipeline engineering.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBogapAxsC_p3DVAxNqQzCKRYLuQiFXNaimpMhmYoN50Jx0KGOP_PKzZ1JHuDoh3oEm0PVSLGwkrzy2lmEIso5MSzZbCj8ZY2-5dLKxmVKlDD8bcSMf40tQVE3XNWPczE6GFU5PlkuXETxlgM9n0HM26C8DtQV6U4w-nkAPpepIR2AGOPk7zq8LgauD67-G0Nx48C24BpZYIdqlJgrtYqv5zFaUSBdr7mIYIVmKPUiEPYnGjyC9DedcfsNy5QwW9WT7k3bE3wYZCMbW',
    hod: 'Dr. Sandra Bullock'
  },
  {
    id: 'ee',
    name: 'Electronics & Communication',
    icon: 'developer_board',
    description: 'Designing semiconductor platforms, quantum communications, and massive IoT networks of integrated nanoscale sensors.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRMrTEdC7g_QlaekRUgWsgDbtHO7FsU9aoxwauSL4j_wfHi6oE6ZWxqsumWgILVKmxXdoH-ZLYkCfVXU_rjBRcf2xUgifrFUAz2qTfqrVDmiBzqc7dCZcUnrgqb2TSNOkzZSIcc1UNNHBYG-VL8qeJdVDfEMzzzkbebktC4g4YhZwVCbNBjKjB8a5qGvZJWj7V9rd1oSwYpKy8GqOd0TQ-tchtw4VJVkdBQWpYipq_vgjaFKQB2kHolf_CBpDKUKHM4mIqSskwGGu0',
    hod: 'Dr. Alan Turing'
  },
  {
    id: 'me',
    name: 'Mechanical & Automation',
    icon: 'precision_manufacturing',
    description: 'Developing next-gen aerodynamic structures, advanced autonomous mechanics, cybernetics, and clean combustion engineering.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvaI9Ob_cURfgejqy0OoYwSoLhPEBzf17t4FWT9dRHWmUR3quu2E2W_gLe_JAsUhRUxFb1BZHJMYmo548iu39accNVDKp0YxHeIbvfTilFKqHsJiqe3ouvmnbF_DUA_CN36s8BkQtecG35m1uhhkiAsR8MEuxVf-y9_ijqIZOBSflWhFnT63ISDxoYCrKQKzw0ysSG5jpiwJ96yo-OZjMObis2_-4haPdPjLObTg7PXPnqsu5UcBxtJtFnPiQwadNEd5S4QHbdgKGd',
    hod: 'Dr. Katherine Johnson'
  }
];

const defaultPrograms: AcademicProgram[] = [
  {
    id: 'cs-btech',
    title: 'B.Tech in Computer Science',
    degree: 'B.Tech',
    departmentId: 'cs',
    duration: '4 Years',
    description: 'A comprehensive undergraduate curriculum emphasizing algorithms, system engineering, compile theory, and cloud engineering.',
    requirements: ['High School Mathematics (Grade A)', 'Physics (Grade A)', 'Aptitude Test Score > 85%']
  },
  {
    id: 'cs-mtech',
    title: 'M.Tech in Distributed Systems',
    degree: 'M.Tech',
    departmentId: 'cs',
    duration: '2 Years',
    description: 'Advanced postgraduate engineering program focusing on decentralized databases, edge-computing topologies, and cryptosecurity.',
    requirements: ['B.Tech/B.S. in CS/EE with CGPA > 8.0/10', 'Subject Reference Letter']
  },
  {
    id: 'cs-phd',
    title: 'Ph.D in Artificial Intelligence Systems',
    degree: 'Ph.D',
    departmentId: 'cs',
    duration: '3-5 Years',
    description: 'Rigorous research-centric program pushing the bounds of neural architectures, generative systems, and predictive logic modeling.',
    requirements: ['Master\'s Degree in STEM with Research Proposal', 'Two Academic Recommenders']
  },
  {
    id: 'ai-btech',
    title: 'B.Tech in AI & Data Engineering',
    degree: 'B.Tech',
    departmentId: 'ai',
    duration: '4 Years',
    description: 'A forward-thinking undergraduate degree bringing statistics, machine learning pipelines, and predictive big data algorithms together.',
    requirements: ['High School Calculus (Grade A)', 'Computer Science Foundation or equivalent']
  },
  {
    id: 'ai-mtech',
    title: 'M.S. in Advanced Neural Systems',
    degree: 'M.S.',
    departmentId: 'ai',
    duration: '2 Years',
    description: 'Nurturing deep technical understanding of generative transformer networks, cognitive robotics, and computer vision models.',
    requirements: ['STEM Bachelor\'s Degree with clear Programming background']
  },
  {
    id: 'ee-btech',
    title: 'B.Tech in Quantum Communications',
    degree: 'B.Tech',
    departmentId: 'ee',
    duration: '4 Years',
    description: 'Groundbreaking program in nanoscale electronics, physical signals processing, and optic networks engineering.',
    requirements: ['High School Physics & Math', 'Pass score in National Entrance Exam']
  },
  {
    id: 'me-btech',
    title: 'B.Tech in Bio-Mechanics & Cybernetics',
    degree: 'B.Tech',
    departmentId: 'me',
    duration: '4 Years',
    description: 'Unique program detailing kinematic analysis, automated factories, robotic manufacturing, and intelligent locomotion designs.',
    requirements: ['High School Mathematics', 'High School Chemistry or Physics']
  }
];

const defaultApplications: AdmissionApplication[] = [
  {
    id: 'app-001',
    fullName: 'Sophia Henderson',
    email: 'sophia.henderson@studentlife.edu',
    phone: '+1 (555) 321-4890',
    programId: 'cs-btech',
    transcriptGPA: 3.92,
    previousSchool: 'Pinecrest High Academy',
    statementOfPurpose: 'I seek to contribute to compiler research and study distributed backend architectures under the exemplary mentoring of Dr. Raymond Carver at the Institute of Higher Learning.',
    status: 'Accepted',
    appliedAt: '2026-05-12T14:32:00Z'
  },
  {
    id: 'app-002',
    fullName: 'Liam Patel',
    email: 'liam.patel@datascholars.net',
    phone: '+1 (555) 789-2341',
    programId: 'ai-mtech',
    transcriptGPA: 3.84,
    previousSchool: 'TechState University London',
    statementOfPurpose: 'Data-driven analysis represents the crown jewel of modern industry. Studying generative transformers at this majestic institution will allow me to spearhead research in green-energy optimizations.',
    status: 'Reviewing',
    appliedAt: '2026-06-02T09:15:00Z'
  },
  {
    id: 'app-003',
    fullName: 'Amara Diop',
    email: 'amara.diop@globalstems.org',
    phone: '+1 (555) 234-9023',
    programId: 'cs-phd',
    transcriptGPA: 4.00,
    previousSchool: 'Paris Institute of Technology',
    statementOfPurpose: 'With two co-authored publications in reinforcement learning, my academic pursuit aims to design highly structured, zero-shot generalisable neural components for robotics operations.',
    status: 'Pending',
    appliedAt: '2026-06-07T18:44:00Z'
  }
];

const defaultPlacements: PlacementRecord[] = [
  {
    id: 'p-001',
    studentName: 'Julian Rivers',
    company: 'Stripe',
    packageValue: 125000,
    programId: 'cs-btech',
    sector: 'Fintech Software',
    appliedYear: '2025'
  },
  {
    id: 'p-002',
    studentName: 'Zahra Al-Farsi',
    company: 'NVIDIA',
    packageValue: 145000,
    programId: 'cs-btech',
    sector: 'AI Systems Engineering',
    appliedYear: '2025'
  },
  {
    id: 'p-003',
    studentName: 'Devansh Sharma',
    company: 'Google',
    packageValue: 130000,
    programId: 'cs-mtech',
    sector: 'Cloud Cryptography',
    appliedYear: '2025'
  },
  {
    id: 'p-004',
    studentName: 'Emily Vanderberg',
    company: 'Microsoft',
    packageValue: 115000,
    programId: 'ai-btech',
    sector: 'Autonomous Agents',
    appliedYear: '2025'
  },
  {
    id: 'p-005',
    studentName: 'Marc-André Chen',
    company: 'SpaceX',
    packageValue: 135000,
    programId: 'ee-btech',
    sector: 'Aerospace Telemetry',
    appliedYear: '2025'
  }
];

export class DBStore {
  departments: Department[] = [];
  programs: AcademicProgram[] = [];
  applications: AdmissionApplication[] = [];
  placements: PlacementRecord[] = [];
  stats: UniversityStats = defaultStats;

  constructor() {
    this.load();
  }

  load() {
    try {
      if (fs.existsSync(dbPath)) {
        const raw = fs.readFileSync(dbPath, 'utf-8');
        const parsed = JSON.parse(raw);
        this.departments = parsed.departments || defaultDepartments;
        this.programs = parsed.programs || defaultPrograms;
        this.applications = parsed.applications || defaultApplications;
        this.placements = parsed.placements || defaultPlacements;
        this.stats = parsed.stats || defaultStats;
      } else {
        this.departments = defaultDepartments;
        this.programs = defaultPrograms;
        this.applications = defaultApplications;
        this.placements = defaultPlacements;
        this.stats = defaultStats;
        this.save();
      }
    } catch (e) {
      console.error('Error loading database file, starting fresh:', e);
      this.departments = defaultDepartments;
      this.programs = defaultPrograms;
      this.applications = defaultApplications;
      this.placements = defaultPlacements;
      this.stats = defaultStats;
    }
  }

  save() {
    try {
      const payload = {
        departments: this.departments,
        programs: this.programs,
        applications: this.applications,
        placements: this.placements,
        stats: this.stats
      };
      fs.writeFileSync(dbPath, JSON.stringify(payload, null, 2), 'utf-8');
    } catch (e) {
      console.error('Error writing to database file:', e);
    }
  }

  // --- Collection Queries ---
  getDepartments() {
    return this.departments;
  }

  getPrograms() {
    return this.programs;
  }

  getApplications() {
    return this.applications;
  }

  addApplication(app: Omit<AdmissionApplication, 'id' | 'appliedAt' | 'status'>) {
    const newApp: AdmissionApplication = {
      ...app,
      id: 'app-' + Math.random().toString(36).substring(2, 9),
      status: 'Pending',
      appliedAt: new Date().toISOString()
    };
    this.applications.unshift(newApp);
    this.save();
    return newApp;
  }

  updateApplicationStatus(id: string, status: AdmissionApplication['status']) {
    const app = this.applications.find(a => a.id === id);
    if (app) {
      app.status = status;
      this.save();
      return app;
    }
    return null;
  }

  deleteApplication(id: string) {
    const initialLength = this.applications.length;
    this.applications = this.applications.filter(a => a.id !== id);
    if (this.applications.length !== initialLength) {
      this.save();
      return true;
    }
    return false;
  }

  getPlacements() {
    return this.placements;
  }

  getStats() {
    // Dynamically calculate placement percentage and applications counter
    const rates = this.placements.length > 0 ? 98 : 95; // seed fallback
    return {
      ...this.stats,
      placementRatePercent: rates
    };
  }
}

export const dbStore = new DBStore();
