import { IDev } from './devs';
import { IRoleData } from './roles';

export interface Iinterviews {
  id?: string;

  // role: IRoleData;

  guests: IDev[];
  eventType: string;
  candidate: IDev;
  candidateId: string;
  comments?: TInterviewComment[];
  eventOption: string;
  description: string;
  eventLInk: string;
  starttime: Date;
  endtime: Date;
  startDate: Date;
  endDate: Date;
  createdAt?: Date;
  updatedAt?: Date;

  status: 'Scheduled' | 'Completed' | 'Canceled'; //
}
export type InterviewAdd = Omit<Iinterviews, 'guests'> & {
  guests: string[];
  interviewType: string;
};
export type TInterviewComment = {
  id?: string;
  name: string;
  message: string;
  // interviewerId: string;
  interviewId: string;
};
export interface InterviewFormValue {
  // candidate: "",
  eventType: string;
  eventOption: string;
  description: string;
  eventLInk: string;
  starttime: Date;
  endtime: Date;
  startDate: Date;
  endDate: Date;
  candidate: string;
  guests: string[];
}
