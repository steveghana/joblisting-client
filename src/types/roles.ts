import { IJobs } from '.';
import { userRole } from '../lib/data/roles';
import { IClient } from './client';
import { IDev } from './devs';

// export type IRole = "Ceo" | "developer" | "hr";
export type IProfession = 'Ceo' | 'Marketing' | 'Recruitment' | 'Developer' | 'CTO';
export type IRoleStatus = 'InHouse' | 'Pending' | 'External' | 'Accepted' | 'Interviewing';
export type UserRoleSelection = IProfession[]; // UserRole is defined as in the previous answer
export interface IRoleData {
  id?: string;

  client?: IClient;

  // developer: any;
  aboutTheProject: string;
  link?: string;
  aboutCompany?: string;
  title: string;
  durationForEmployment: string;
  hiringRole: string;
  roleType: string;
  DevsNeeded: string;
  methodology: string;
  experience: string;
  employmentType: string;
  whenToStart: string;
  dataContent: string;
  createdAt: string;
  communicationPreferences?: string;

  // description: string;
  numOfEmployees: string;

  skills_required: string[]; // Store skills as JSON

  vacancy_status: 'Open' | 'Closed'; // Open, Closed

  interviews?: any[];
  developers?: IDev[];
  application?: ApplicantsSubmission[];

  jobs: IJobs[];
}
export type IStatusApplication = 'PendingShortlist' | 'Shortlisted' | 'Rejected' | 'Accepted';
export interface ApplicantsSubmission {
  id?: string;
  name: string;
  email: string;
  roleApplyingFor: string;
  roleId?: string;
  jobId?: string;
  avatar?: string;
  phoneNumber: string;
  status?: IStatusApplication;
  coverLetter: string;
  address: string;
  file: Record<string, any>;
  selectedSkills: string[];
  years_of_experience: string;
}
