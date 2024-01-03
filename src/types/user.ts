import { IDev } from './devs';
import { IProfession } from './roles';

export interface IUser {
  id: string;
  token: string;
  role: IProfession;
  savedCards: number;
  firstName: string;
  lastName: string;
  avatar: string;
  description: string;
  jobtitle: string;
  location: string;
  email: string;
  developer: IDev;
  emailAddresses?: any[];
  googleVerified?: boolean;
  linkedinVerified?: boolean;
  githubVerified?: boolean;
  bio?: string;
  website?: string;
  github?: string;
  linkedin?: string;
  createdAt?: Date;
  updatedAt?: Date;
  address?: string;
}
export type Iuser = { user: Omit<IUser, 'token' | 'role'> };
