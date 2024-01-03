import { CountryType } from '../components/settings/CountrySelector';
import { IDev } from './devs';
import { IRoleData } from './roles';
export interface IClient {
  id?: string;
  avatar?: string;
  name: string;
  email: string;
  industry: string[];
  numOfEmployees: string;
  developersLength: number;
  developers?: IDev[];
  rolesOpen: number;
  countrylabel: string;
  companyName: string;
  phoneNumber: string;
  projectTitle: string;
  roles?: IRoleData[];
  startDate: Date;
  companyLogo: string;
  aboutTheCompany: string;
  country: Record<string, any>;
}
export interface JobInfo {
  roleId: string;
  description: string[];
  jobLocation: string;
  employmentType: string;
  salary: string;
  location: string;
  roleCategory: string;
  postedDate: Date;
  roleName: string;
  tasks: string[]; // Array of tasks
}
export interface ClientFormDataState {
  ['Client Info']: {
    name: string;
    email: string;
    companyLogo: string;
    industry: string[];
    phoneNumber: string;
    numOfEmployees: string;
    country: CountryType;
    companyName: string;
    projectTitle: string;
    aboutTheCompany: string;
  };
  ['Project Details']: {
    devsNeeded: string;
    aboutTheProject: string;
    title: string;
    methodology: string;
    experience: string;
    communicationPreferences: string;
  };
  ['Role Info']: {
    roleName: string;
    selectedSkills: string[];
    description: string;
    durationForEmployment: string;
    whenToStart: Date;
    salary: string;
    roleCategory: string;
    tasks: string[]; // Array of tasks
    employmentType: string; // Employment types related to the role
    roleType: string;
    jobType: string;

    // roleName: string;
  };
}
interface LocationInfo {
  continent: string;
  country: string;
}
export type ClientFormDataAction =
  | {
      type: 'updateProjectInfo';
      payload: ClientFormDataState['Project Details'];
    }
  | { type: 'updateclientInfo'; payload: ClientFormDataState['Client Info'] }
  | {
      type: 'updateRoleInfo';
      payload: ClientFormDataState['Role Info'];
    }
  | { type: 'reset'; payload: ClientFormDataState };
export interface ClientFormDataContextProps {
  formDataState: ClientFormDataState;
  dispatch: (action: ClientFormDataAction) => void;
}
