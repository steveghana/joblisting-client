export interface ICompany {
  clientDetails: {
    companyName: string;
    companyLogo: string;
    briefIntroduction: string;
    developerRoles: { role: string; description: string }[];
    aboutTheCompany: string;
    teamMembers: { name: string; role: string; profile: string }[];
    projectShowcase: { title: string; description: string }[];
    clientReviews: { name: string; position: string; review: string }[];
    companySizeAndLocation: { companySize: string; location: string };
    additionalInformation: string;
  };
}
export type IinitialValues = {
  projectName: string;
  projectDescription: string;
  projectGoals: string;
  budget: string;
  startDate: string;
  projectDuration: string;
  technicalRequirements: string;
  designPreferences: string;
  targetAudience: string;
  competitorAnalysis: string;
  dataContent: string;
  securityCompliance: string;
  integrationsAPIs: string;
  testingQA: string;
  milestones: string;
  methodology: string;
  communicationPreferences: [];
  additionalComments: string;
};
