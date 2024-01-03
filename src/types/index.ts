export type IJobs = {
  task: string[];
  description: string[];
  id: string;
  location: {
    continent: string;
    country: string[];
  };

  jobtype: 'Full-time' | 'Part-time';
  roleType: string;
  whenToStart: string;
  projectTitle: string;
  employmentType: string;
  selectedSkills: string[];
  jobType: string;
  salary: string;
  roleCategory: string;
  roleName: string;
  tasks: string[]; // Array of tasks
  postedDate: Date;
};
export interface IMenuChildrenProps {
  id: string;
  title: string;
  type: 'item';
  url: string;
  icon: any;
  breadcrumbs: boolean;
}

export interface IMenuProps {
  id: string;
  title: string;
  roles: string[];
  type: 'group' | 'item';
  children: IMenuChildrenProps[];
}
