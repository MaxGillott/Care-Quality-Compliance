import {
  reviewAreas,
  tenderStages,
  assessmentPurposes,
} from "@/lib/practice-tools";
export const consultancyPaths = [
  {
    id: "inspection",
    label: "An inspection is on the horizon",
    title: "Start with a clear view of your service.",
    intro:
      "An independent quality review can help you see the gaps before you plan your next steps.",
    steps: [
      "Review care records, governance and day-to-day practice.",
      "Identify priorities and organise the evidence you already have.",
      "Agree a practical improvement plan with your team.",
    ],
    outcome: "A focused service review and a prioritised action plan.",
    enquiry:
      "I would like support preparing for an inspection, including an independent service review and a prioritised action plan.",
  },
  {
    id: "quality",
    label: "I want to improve everyday quality",
    title: "Make good practice part of every day.",
    intro:
      "We can look at the systems and habits that shape your care, then help you strengthen them.",
    steps: [
      "Listen to the people delivering and receiving your service.",
      "Review care planning, safeguarding and governance.",
      "Support changes your team can put into practice.",
    ],
    outcome: "A practical quality improvement programme.",
    enquiry:
      "I would like to discuss improving everyday quality, including governance, care planning and practical support for my team.",
  },
  {
    id: "growth",
    label: "We are starting or growing a service",
    title: "Build the foundations for what comes next.",
    intro:
      "Growth is easier to plan when your people, processes and evidence are ready for it.",
    steps: [
      "Understand your service model and responsibilities.",
      "Review policies, workforce plans and management systems.",
      "Prepare for new services or procurement opportunities.",
    ],
    outcome: "A service-readiness plan built around your next step.",
    enquiry:
      "I would like to discuss service readiness, including policies, workforce planning and management systems for a new or growing service.",
  },
] as const;
export const trainingTopics = [
  {
    id: "safeguarding",
    label: "Safeguarding",
    description: "Recognising concerns. Knowing how to respond.",
  },
  {
    id: "capacity",
    label: "Mental Capacity Act",
    description: "Supporting decisions with confidence.",
  },
  {
    id: "planning",
    label: "Care planning",
    description: "Keeping the person at the centre.",
  },
  {
    id: "leadership",
    label: "Leadership & management",
    description: "Helping managers guide stronger teams.",
  },
  {
    id: "records",
    label: "Record keeping",
    description: "Clear records that support good care.",
  },
  {
    id: "risk",
    label: "Risk assessment",
    description: "Making proportionate, informed decisions.",
  },
  {
    id: "communication",
    label: "Effective communication",
    description: "Listening well and working together.",
  },
  {
    id: "inspection",
    label: "Preparing for inspection",
    description: "Understanding evidence and good practice.",
  },
  {
    id: "person-centred",
    label: "Person-centred care",
    description:
      "Understanding wishes, needs and the choices that matter to the person.",
  },
  {
    id: "quality",
    label: "Quality assurance",
    description:
      "Using evidence and feedback to support better everyday practice.",
  },
  {
    id: "boundaries",
    label: "Professional boundaries",
    description:
      "Understanding roles, responsibilities and professional relationships.",
  },
  {
    id: "incidents",
    label: "Incident management",
    description: "Responding, recording and learning when things go wrong.",
  },
] as const;
export const trainingTeams = [
  "Care team",
  "Managers",
  "Whole organisation",
] as const;
export function enquiryOutline(params: {
  focus?: string;
  topics?: string;
  team?: string;
  service?: string;
  area?: string;
  stage?: string;
  purpose?: string;
}) {
  if (params.service === "care-provider-consultancy")
    return consultancyPaths.find((p) => p.id === params.focus)?.enquiry || "";
  if (params.service === "quality-and-compliance")
    return reviewAreas.find((p) => p.id === params.area)?.enquiry || "";
  if (params.service === "procurement-and-contracts")
    return tenderStages.find((p) => p.id === params.stage)?.enquiry || "";
  if (params.service === "independent-assessments")
    return (
      assessmentPurposes.find((p) => p.id === params.purpose)?.enquiry || ""
    );
  if (params.service !== "training-and-development") return "";
  const ids = Array.from(new Set((params.topics || "").split(","))).slice(0, 4);
  const topics = trainingTopics.filter((t) => ids.includes(t.id));
  if (!topics.length) return "";
  const team = trainingTeams.find((t) => t === params.team) || "our team";
  return `I would like to discuss a tailored training programme for ${team.toLowerCase()}. Our starting priorities are: ${topics.map((t) => t.label).join("; ")}. Please help us explore suitable content and delivery options.`;
}
