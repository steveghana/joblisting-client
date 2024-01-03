import { IDev } from '../../types/devs';
import { ApplicantsSubmission } from '../../types/roles';

export const projectRequirementFields = {
  technicalRequirements: '',
  designPreferences: '',
  targetAudience: '',
  competitorAnalysis: '',
  aboutTheProject: '',
  securityCompliance: '',
  DevsNeeded: '0',
  integrationsAPIs: '',
  experience: 'midlevel',
  testingQA: '',
  milestones: [],
  selectedSkills: [],
  name: '',
  phoneNumber: '',
  email: '',

  methodology: '',
};
export const ReviewLabelObj = {
  companyName: 'Company Name',
  projectTitle: 'Project Title',
  description: 'Description',
  name: 'Client Name',
  country: 'Country',
  employmentType: 'Employment Type',
  numOfEmployees: 'Number of Employees',
  durationForEmployment: 'Employment Duration',
  whenToStart: 'When To Start',
  phoneNumber: 'Phone Number',
  email: 'Email',
  selectedSkills: 'Selected Skills',
  DevsNeeded: 'Developers Needed For the Project',
  methodology: ' Development Methodology',
  dataContent: 'Any Additional Data',
  experience: 'Experience Level',
  testingQA: 'Testing Type',
  location: 'Job Location',
  roleCategory: ' Role Category',
  roleName: 'Name of the Role',
  salary: 'Salary for the role',
  tasks: 'Tasks to perform in the role',
  companyLogo: 'Company Logo link',
  jobType: 'Job Type',
  roleType: 'Role Type',
  aboutTheCompany: 'Information about the company',
  devsNeeded: 'Developers needed for the Project',
  aboutTheProject: 'Information about the Project',
  communicationPreferences: ' Choice of communication',
};

export const experienceLevel = [
  { label: 'Senior', value: 'senior' },
  { label: 'Mid-Level', value: 'midlevel' },
  { label: 'Junior/Entry level', value: 'entry' },
  { label: 'Intern', value: 'intern' },
];
export const methodologyOptions = [
  { label: 'Agile', value: 'agile' },
  { label: 'Waterfall', value: 'waterfall' },
  { label: 'Scrum', value: 'scrum' },
  // Add more options as needed
];
