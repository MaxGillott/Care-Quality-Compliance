export const reviewAreas = [
  {
    id: "care-records",
    label: "Care records",
    title: "Does the record reflect the person?",
    intro:
      "We look at how the person’s needs, wishes and choices are understood and recorded.",
    lookFor:
      "Care plans, assessments, review records and the way information is used in daily practice.",
    questions: [
      "Is the person’s voice visible?",
      "Do records reflect changing needs?",
      "Can staff understand the support required?",
    ],
    next: "Agree focused changes to care planning, recording and review.",
    enquiry:
      "I would like to discuss an independent review of care records and person-centred care planning.",
  },
  {
    id: "safeguarding",
    label: "Safeguarding",
    title: "From recognising a concern to responding.",
    intro:
      "A policy is one part of safeguarding. We also consider awareness, reporting and the response to concerns.",
    lookFor:
      "Reporting routes, safeguarding records, staff understanding and learning from concerns.",
    questions: [
      "Do staff know how to raise a concern?",
      "Are responsibilities clear?",
      "Is learning followed through?",
    ],
    next: "Clarify responsibilities and strengthen the way concerns are recorded and addressed.",
    enquiry:
      "I would like support reviewing safeguarding systems, reporting arrangements and learning from concerns.",
  },
  {
    id: "governance",
    label: "Governance",
    title: "Can you see what needs attention?",
    intro:
      "We consider how leaders gather information, make decisions and check that agreed actions happen.",
    lookFor:
      "Audits, management oversight, action plans, supervision and quality assurance arrangements.",
    questions: [
      "Is the right information reaching leaders?",
      "Does each action have an owner?",
      "Is progress reviewed and evidenced?",
    ],
    next: "Develop clearer oversight, practical action tracking and a proportionate review cycle.",
    enquiry:
      "I would like to discuss a review of governance, management oversight and quality assurance.",
  },
  {
    id: "risk",
    label: "Risk & learning",
    title: "Make learning part of everyday care.",
    intro:
      "We look at how your service understands risk and turns incidents and feedback into practical learning.",
    lookFor:
      "Risk assessments, incident records, feedback, response plans and evidence of learning.",
    questions: [
      "Are assessments current and proportionate?",
      "Are patterns being recognised?",
      "What changed as a result of learning?",
    ],
    next: "Connect risk management, incident learning and service improvement.",
    enquiry:
      "I would like an independent review of risk management, incident learning and improvement planning.",
  },
] as const;
export const tenderStages = [
  {
    id: "prepare",
    label: "Prepare",
    title: "Understand the opportunity.",
    question: "Is this the right opportunity for your organisation?",
    text: "Start with the service specification, eligibility requirements and your capacity to deliver. A clear decision now gives the rest of the work direction.",
    bring: [
      "The opportunity and service specification",
      "Your service model and current capacity",
      "Key requirements and submission dates",
    ],
    support: [
      "Procurement registration",
      "Contract readiness",
      "Requirements review",
    ],
    enquiry:
      "I would like help with procurement registration, contract readiness and reviewing an opportunity.",
  },
  {
    id: "evidence",
    label: "Evidence",
    title: "Build the case behind the bid.",
    question: "What shows that you can deliver?",
    text: "Bring together accurate evidence of your workforce, governance, quality and experience. We help you see what supports the response and where gaps remain.",
    bring: [
      "Relevant policies and procedures",
      "Workforce and quality assurance information",
      "Examples of your organisation’s actual work",
    ],
    support: [
      "Compliance documentation",
      "Quality evidence",
      "Workforce planning",
    ],
    enquiry:
      "I would like help preparing evidence, compliance documentation and workforce information for a tender.",
  },
  {
    id: "write",
    label: "Write",
    title: "Turn capability into a clear response.",
    question: "Does each answer address the buyer’s question?",
    text: "We support relevant, structured method statements and bid writing, using information from your organisation. Every claim needs to be accurate and supportable.",
    bring: [
      "The questions and evaluation criteria",
      "Word limits and response instructions",
      "Verified information and evidence",
    ],
    support: [
      "Bid writing",
      "Method statements",
      "Service specification alignment",
    ],
    enquiry:
      "I would like support with bid writing and method statements for a social care tender.",
  },
  {
    id: "review",
    label: "Review",
    title: "Give the submission a fresh perspective.",
    question: "Is the response complete, consistent and evidenced?",
    text: "An independent review can identify gaps, unclear answers and inconsistencies before you approve the final response. Submission remains your responsibility.",
    bring: [
      "The current draft and attachments",
      "The buyer’s instructions",
      "Any unanswered questions or gaps",
    ],
    support: [
      "Independent tender review",
      "Evidence checks",
      "Response clarity",
    ],
    enquiry:
      "I would like an independent review of a draft tender response and its supporting evidence.",
  },
  {
    id: "mobilise",
    label: "Mobilise",
    title: "Think beyond the submission.",
    question: "How would the proposed service become a reality?",
    text: "We help you consider the workforce, systems and practical steps required to mobilise a service, subject to the contract and the buyer’s requirements.",
    bring: [
      "The proposed delivery model",
      "Workforce and management plans",
      "Mobilisation requirements and dependencies",
    ],
    support: [
      "Mobilisation planning",
      "Management systems",
      "Service readiness",
    ],
    enquiry:
      "I would like support with workforce, systems and contract mobilisation planning.",
  },
] as const;
export const assessmentPurposes = [
  {
    id: "care",
    label: "Understanding care needs",
    title: "The person, in their whole context.",
    text: "An independent view of care and support needs, wishes and circumstances, with the purpose and limits of the work agreed at the start.",
    sections: [
      "The agreed questions and scope",
      "The person’s wishes and circumstances",
      "Relevant information and professional analysis",
      "Findings, limits and practical recommendations",
    ],
    enquiry:
      "I would like to discuss an independent assessment of care and support needs.",
  },
  {
    id: "review",
    label: "Reviewing an existing situation",
    title: "A fresh perspective on the information.",
    text: "An objective review of available evidence and care arrangements. We clarify what can be considered and which professional expertise is needed.",
    sections: [
      "The concern and the agreed review questions",
      "Records and perspectives considered",
      "Analysis of the available evidence",
      "Recommendations and any information gaps",
    ],
    enquiry:
      "I would like to discuss an independent review of existing care arrangements or evidence.",
  },
  {
    id: "report",
    label: "A professional report",
    title: "Clear reasoning. A useful report.",
    text: "Professional reporting for an agreed purpose, setting out the information considered and the reasoning behind the findings.",
    sections: [
      "Purpose, intended audience and scope",
      "Sources of information and their limitations",
      "Professional findings and reasoning",
      "Recommendations relevant to the agreed purpose",
    ],
    enquiry:
      "I would like to discuss a professional report and the scope of the assessment required.",
  },
] as const;
export const familyConcerns = [
  {
    question: "I’m worried about the care someone is receiving.",
    intro:
      "You may have noticed changes, have questions about a care plan or feel that the person’s needs are not being understood.",
    help: "We can listen, help you organise your concerns and discuss whether care planning support, an independent review or meeting support may be useful.",
    topics: [
      "Care planning",
      "Independent assessments",
      "Preparation and support for meetings",
    ],
  },
  {
    question: "I don’t understand an assessment or decision.",
    intro:
      "You do not need to know the right terminology. A clear explanation of the process can help you work out which questions to ask.",
    help: "We can help you understand care and support assessments, review available information and consider the next practical step. Independent advice does not automatically change a statutory decision.",
    topics: [
      "Care and support assessments",
      "Professional reports",
      "Independent professional advice",
    ],
  },
  {
    question: "I need help understanding funding or aftercare.",
    intro:
      "NHS Continuing Healthcare and Section 117 aftercare involve different processes and responsibilities. The right support depends on the person’s circumstances.",
    help: "We can discuss the situation, explain the relevant process and help you prepare questions or information. We do not promise eligibility or a funding outcome.",
    topics: [
      "NHS Continuing Healthcare",
      "Section 117 aftercare",
      "Meeting preparation",
    ],
  },
  {
    question: "There are questions about decisions or safety.",
    intro:
      "Concerns about mental capacity, best-interest decisions or safeguarding can be difficult for families to navigate.",
    help: "We can discuss the professional support that may be appropriate. Our enquiry form is not monitored as an emergency or safeguarding reporting service.",
    topics: [
      "Mental capacity",
      "Best-interest decisions",
      "Safeguarding concerns",
    ],
  },
] as const;
