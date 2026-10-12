export type InterviewType = "video" | "phone" | "in_person";

export interface ScheduleInterviewFormValues {
  interviewType: InterviewType;
  title: string;
  dateTime: string;
  date?: string;
  time?: string;
  duration: string;
  interviewers?: string;
  meetingLink: string;
  additionalNotes?: string;
}

export interface InterviewInvitation extends ScheduleInterviewFormValues {
  id: string;
  candidateId: string;
  candidateName: string;
  candidateEmail: string;
  jobTitle: string;
  jobSlug: string;
  createdAt: string;
  status: "scheduled" | "completed" | "cancelled";
}
