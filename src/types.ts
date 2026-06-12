/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Department {
  id: string;
  name: string;
  icon: string;
  description: string;
  image: string;
  hod: string;
}

export interface AcademicProgram {
  id: string;
  title: string;
  degree: 'B.Tech' | 'M.Tech' | 'Ph.D' | 'M.S.' | 'MBA';
  departmentId: string;
  duration: string;
  description: string;
  requirements: string[];
}

export interface AdmissionApplication {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  programId: string;
  transcriptGPA: number;
  previousSchool: string;
  statementOfPurpose: string;
  status: 'Pending' | 'Reviewing' | 'Accepted' | 'Declined';
  appliedAt: string;
}

export interface PlacementRecord {
  id: string;
  studentName: string;
  company: string;
  packageValue: number; // in USD per annum
  programId: string;
  sector: string;
  appliedYear: string;
}

export interface UniversityStats {
  enrollmentCount: number;
  nationalRanking: number;
  researchFundingMillions: number;
  placementRatePercent: number;
}
