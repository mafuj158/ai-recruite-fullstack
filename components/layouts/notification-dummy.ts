import type { AppNotification } from "@/types/notification/notification.types";

export const MOCK_CANDIDATE_NOTIFICATIONS: AppNotification[] = [
  {
    id: "notif-c1",
    type: "interview_scheduled",
    title: "Final Interview Scheduled",
    description:
      "Technical interview with David Vance confirmed for Tuesday at 2:00 PM EST.",
    timestamp: "10 mins ago",
    isRead: false,
    actionUrl: "/candidate/interviews",
    actionLabel: "View Interview",
    targetRole: "candidate",
    metadata: {
      roleName: "Senior Frontend Engineer",
      companyName: "TechVision Labs",
    },
  },
  {
    id: "notif-c2",
    type: "shortlisted",
    title: "Application Shortlisted",
    description:
      "Acme Technologies moved your application to Shortlisted for UI/UX Product Designer.",
    timestamp: "2 hours ago",
    isRead: false,
    actionUrl: "/candidate/applied-jobs",
    actionLabel: "Track Application",
    targetRole: "candidate",
    metadata: {
      roleName: "UI/UX Product Designer",
      companyName: "Acme Technologies",
    },
  },
  {
    id: "notif-c3",
    type: "new_job_match",
    title: "New AI Job Match (94%)",
    description:
      "3 new job openings in Frontend Architecture closely match your updated CV skills.",
    timestamp: "Yesterday",
    isRead: false,
    actionUrl: "/candidate/find-jobs",
    actionLabel: "Explore Matches",
    targetRole: "candidate",
    metadata: {
      score: 94,
    },
  },
  {
    id: "notif-c4",
    type: "application_viewed",
    title: "Application Viewed",
    description:
      "CloudScale Systems hiring team viewed your CV and pre-screening responses.",
    timestamp: "2 days ago",
    isRead: true,
    actionUrl: "/candidate/applied-jobs",
    actionLabel: "View Status",
    targetRole: "candidate",
    metadata: {
      roleName: "Full Stack Developer",
      companyName: "CloudScale Systems",
    },
  },
];

export const MOCK_EMPLOYER_NOTIFICATIONS: AppNotification[] = [
  {
    id: "notif-e1",
    type: "new_application",
    title: "New Applicant Received",
    description:
      "Alex Morgan submitted an application for Senior Frontend Engineer.",
    timestamp: "15 mins ago",
    isRead: false,
    actionUrl: "/employer/candidates",
    actionLabel: "Review Candidate",
    targetRole: "employer",
    metadata: {
      candidateName: "Alex Morgan",
      roleName: "Senior Frontend Engineer",
    },
  },
  {
    id: "notif-e2",
    type: "high_ai_match",
    title: "High AI Match Alert (95%)",
    description:
      "Jordan Lee scored a 95% AI Compatibility match for UI/UX Product Designer.",
    timestamp: "1 hour ago",
    isRead: false,
    actionUrl: "/employer/candidates",
    actionLabel: "View Match Breakdown",
    targetRole: "employer",
    metadata: {
      candidateName: "Jordan Lee",
      score: 95,
      roleName: "UI/UX Product Designer",
    },
  },
  {
    id: "notif-e3",
    type: "ai_screening_completed",
    title: "AI Pre-Screening Completed",
    description:
      "Alex Morgan completed technical & behavioral questions with score 89%.",
    timestamp: "3 hours ago",
    isRead: false,
    actionUrl: "/employer/candidates",
    actionLabel: "Inspect Report",
    targetRole: "employer",
    metadata: {
      candidateName: "Alex Morgan",
      score: 89,
    },
  },
  {
    id: "notif-e4",
    type: "interview_accepted",
    title: "Interview Invitation Accepted",
    description:
      "Marcus Brookes accepted the system design interview for Thursday at 4:00 PM EST.",
    timestamp: "Yesterday",
    isRead: true,
    actionUrl: "/employer/interviews",
    actionLabel: "Open Schedule",
    targetRole: "employer",
    metadata: {
      candidateName: "Marcus Brookes",
    },
  },
];
