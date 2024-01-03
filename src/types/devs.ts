import { Iinterviews } from './interviews';
import { IRoleData, IRoleStatus } from './roles';
import { IUser, Iuser } from './user';

export type IDev = {
  id?: string;
  firstName: string;
  clientName: string;
  userId?: string;
  user?: Iuser;
  interview?: Iinterviews;
  candidatInterview: Iinterviews;
  guestInterview: Iinterviews[];
  companyName: string;
  role?: string;
  lastName: string;
  roles: IRoleData[];
  email: string;
  jobTitle: string;
  startedAt?: Date;
  salary: number;
  startDate: Date;
  skills: string[];
  experience?: number;
  projectName: string;
  avatar: string;
  workStatus: 'Active' | 'Not Active';
  rolestatus: 'InHouse' | 'Pending' | 'External' | 'Accepted' | 'Interviewing';
};
export interface IPartialDev {
  id?: string;
  email: string;
  role?: string;
  firstName: string;
  lastName: string;
  skills: string[];
  phone_number: string;
  salary: number;
  address: string;
  role_status: IRoleStatus;
  years_of_experience: string;
}
