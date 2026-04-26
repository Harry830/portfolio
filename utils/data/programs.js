/**
 * Builder programs / startup ecosystem milestones.
 * Used in the Programs section of the homepage.
 */
export const programsData = [
  {
    id: "createx",
    name: "CreateX",
    affiliation: "Georgia Tech",
    role: "Summer Cohort",
    status: "current",
    statusLabel: "Now",
    timeline: "Summer 2026",
    description:
      "Building startup ideas inside Georgia Tech's flagship founder program — customer discovery, product velocity, and the path from prototype to real users.",
    asset: {
      // drop createx logo into /public/image/programs/createx.svg or .png
      placeholderInitials: "CX",
      suggestedFile: "/image/programs/createx.svg",
    },
  },
  {
    id: "genesis",
    name: "Startup Exchange Genesis",
    affiliation: "Spring Batch",
    role: "Builder",
    status: "completed",
    statusLabel: "Completed",
    timeline: "Spring 2026",
    description:
      "Completed the Genesis Spring batch — a hands-on builder track that pushed early ideas through structured iteration, mentorship, and demo milestones.",
    asset: {
      placeholderInitials: "SE",
      suggestedFile: "/image/programs/startup-exchange.svg",
    },
  },
];
