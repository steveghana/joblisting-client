import { IClient } from '@/types/client';
import { IRoleData } from '@/types/roles';

// Dummy information for additional Client properties
const otherClientProperties = {
  aboutTheCompany: 'A tech company specializing in web development.',
  country: { name: 'United States', code: 'US' },
  avatar: 'client-avatar.png',
  communicationPreferences: 'Email',
  phoneNumber: '+1 123-456-7890',
  companyName: 'TechCorp',
  email: 'info@techcorp.com',
  numOfEmployees: '1000+',
  projectTitle: 'Exciting Projects',
  id: '1',
  startDate: new Date('2023-01-01'),
};

// Dummy information for additional Role properties
const otherRoleProperties = {
  devsNeeded: '2',
  id: '2',
  methodology: 'Agile',
  aboutTheProject: 'Exciting project description goes here.',
  experience: '3+ years',
  communicationPreferences: 'Slack',
  vacancy_status: 'Open',
};
export const getRoleOptions = (clientId: string, clients: IClient) => {
  const selectedClient = clients;
  const roles = selectedClient?.id
    ? selectedClient.roles?.map((role) => {
        return {
          title: role.title,
          id: role.id,
          aboutTheProject: role.aboutTheProject,
        };
      })
    : [];
  return roles;
};

export const getJobOptions = (roleId: string, selectedClient: IClient) => {
  const role = selectedClient?.roles?.find((role) => role.id === roleId);
  const jobs = role?.jobs || [];

  return jobs.map((job) => ({
    title: job.projectTitle,
    roleName: job.roleName,
    description: job.description,
    id: job.id,
  }));
};

// Dummy information for additional Job properties
const otherJobProperties = {
  joblink: 'https://example.com/job-link',
  employmentType: 'Full-time',
  country: 'United States',
  joblocation: 'Remote',
  id: '3',
  roleName: 'Software Engineer',
  jobType: 'Engineering',
  salary: '$80,000 - $100,000',
  tasks: ['Task 1: Develop new features', 'Task 2: Debug and troubleshoot'],
  roleCategory: 'Technology',
  postedDate: new Date(),
};

// Dummy information for additional Developer properties
const otherDeveloperProperties = {
  phone_number: '+1 987-654-3210',
  salary: 90000,
  id: '4',
  years_of_experience: '5+ years',
  address: '123 Main St, Cityville',
  devProfession: 'Software Developer',
  workStatus: 'Active',
  role_status: 'External',
};

export const clients = [
  { name: 'Client A', companyLogo: 'logo-a.png', ...otherClientProperties },
  { name: 'Client B', companyLogo: 'logo-b.png', ...otherClientProperties },
  // Add more clients as needed
];

// Dummy Roles
export const roles = [
  { title: 'Role X', ...otherRoleProperties },
  { title: 'Role Y', ...otherRoleProperties },
  // Add more roles as needed
];

// Dummy Jobs
export const jobs = [
  { description: 'Job 1', roleType: 'Remote', ...otherJobProperties },
  { description: 'Job 2', roleType: 'On-site', ...otherJobProperties },
  // Add more jobs as needed
];

// Dummy Developers
export const developers = [
  { firstName: 'John', lastName: 'Doe', skills: ['JavaScript', 'React'], ...otherDeveloperProperties },
  { firstName: 'Jane', lastName: 'Smith', skills: ['Node.js', 'TypeScript'], ...otherDeveloperProperties },
  // Add more developers as needed
];
