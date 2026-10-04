export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  intro: string;
  headline: string;
  description: string;
  audience: string;
  items: string[];
  outcomes: { title: string; text: string }[];
  faqs: { question: string; answer: string }[];
  image: string;
  imageAlt: string;
};
export const services: Service[] = [
  {
    slug: "care-provider-consultancy",
    title: "Care Provider Consultancy",
    shortTitle: "Care provider consultancy",
    intro:
      "Practical guidance to build stronger services, support your teams and deliver better care.",
    headline: "Stronger services. Better care.",
    description:
      "Running a care service brings responsibility, complexity and constant change. We work alongside you to understand your service, identify what needs attention and turn professional advice into practical improvements.",
    audience:
      "For care homes, domiciliary care services, supported living providers and organisations delivering adult or children’s social care across England.",
    items: [
      "Service audits and quality assurance",
      "Governance and management systems",
      "Inspection preparation",
      "Safeguarding practice",
      "Care planning and record keeping",
      "Policies and procedures",
      "Risk assessment and management",
      "Service improvement planning",
      "Staff development and supervision",
      "Independent service reviews",
    ],
    outcomes: [
      {
        title: "Understand where you stand",
        text: "An independent review of your systems, evidence and day-to-day practice, with attention to what matters to the people receiving your care.",
      },
      {
        title: "Know what to do next",
        text: "Clear priorities and a realistic improvement plan, developed around your service, resources and responsibilities.",
      },
      {
        title: "Put improvement into practice",
        text: "Support to develop your governance, strengthen your team and embed changes that can last.",
      },
    ],
    faqs: [
      {
        question: "Can you help us prepare for a CQC inspection?",
        answer:
          "We can review your evidence, governance and care practice, identify gaps and help your team prepare. We provide independent consultancy and are not affiliated with the Care Quality Commission. No adviser can guarantee an inspection outcome.",
      },
      {
        question: "Do you work with new care providers?",
        answer:
          "Yes. We can help you think through policies, management systems, workforce development and service readiness. We agree the scope around your stage of development and the type of service you plan to deliver.",
      },
      {
        question: "Can support be ongoing?",
        answer:
          "Support can be focused on a particular concern or developed into a longer improvement programme. We will discuss your needs and agree the work and fees before we begin.",
      },
    ],
    image: "/images/consultancy.jpg",
    imageAlt: "Two professionals listening and talking at a table",
  },
  {
    slug: "quality-and-compliance",
    title: "Quality & Compliance",
    shortTitle: "Quality & compliance",
    intro:
      "An independent view of your practice, with clear steps towards safe, person-centred care.",
    headline: "Confidence in the quality of your care.",
    description:
      "Good compliance is more than having the right paperwork. It means understanding what is happening in your service and having the systems, culture and accountability to respond. We help you bring that picture into focus.",
    audience:
      "For registered managers, care providers and leadership teams seeking an objective view of quality, safety and governance.",
    items: [
      "Quality and compliance reviews",
      "Care record and documentation audits",
      "Governance frameworks",
      "Safeguarding systems",
      "Risk management reviews",
      "Policy development and review",
      "Incident learning and action planning",
      "Inspection evidence preparation",
      "Quality improvement plans",
      "Person-centred practice reviews",
    ],
    outcomes: [
      {
        title: "See the whole picture",
        text: "Review evidence, listen to the people involved and look at how policies translate into everyday care.",
      },
      {
        title: "Focus on the right priorities",
        text: "Identify concerns, understand their significance and set out practical actions with clear ownership.",
      },
      {
        title: "Build a culture of quality",
        text: "Strengthen the ways your organisation monitors, learns and responds, so improvement is part of everyday practice.",
      },
    ],
    faqs: [
      {
        question: "Is a compliance review the same as an inspection?",
        answer:
          "No. Our reviews are independent advisory work. They can help you understand and improve your practice, but do not replace a statutory inspection or regulatory decision.",
      },
      {
        question: "Can you review a specific area of concern?",
        answer:
          "Yes. A review can focus on a particular topic, such as care records, safeguarding or governance, or consider the service more broadly.",
      },
      {
        question: "Will we receive an action plan?",
        answer:
          "We agree the outputs with you before starting. This can include a written report and a prioritised improvement plan with practical recommendations.",
      },
    ],
    image: "/images/care-conversation.jpg",
    imageAlt: "Hands held together in a reassuring gesture",
  },
  {
    slug: "procurement-and-contracts",
    title: "Procurement & Contracts",
    shortTitle: "Procurement & contracts",
    intro:
      "From contract readiness to compelling tenders, support to take your next step with confidence.",
    headline: "From compliance to opportunity.",
    description:
      "Your organisation has something valuable to offer. We help you demonstrate it clearly. From procurement registration and contract readiness to tender preparation and bid writing, our support brings together care expertise and a practical understanding of procurement.",
    audience:
      "For adult and children’s social care providers exploring public-sector opportunities, preparing bids or getting ready to mobilise a new service.",
    items: [
      "Procurement registration",
      "Contract readiness reviews",
      "Tender applications and bid writing",
      "Method statements",
      "Evidence and compliance documentation",
      "Policies and quality assurance",
      "Workforce and mobilisation planning",
      "Service specifications",
      "Independent tender reviews",
      "Adult and children’s social care contracts",
    ],
    outcomes: [
      {
        title: "Get contract ready",
        text: "Understand the opportunity, review the requirements and identify the evidence your organisation needs to provide.",
      },
      {
        title: "Present your strengths clearly",
        text: "Develop relevant, well-structured responses that connect your capabilities to the service specification.",
      },
      {
        title: "Plan beyond submission",
        text: "Think through workforce, systems and mobilisation requirements so your proposal is grounded in what you can deliver.",
      },
    ],
    faqs: [
      {
        question: "Can you write our tender response?",
        answer:
          "We can support bid writing and method statements using accurate information and evidence from your organisation. You remain responsible for reviewing and approving the final submission.",
      },
      {
        question: "Can you guarantee that we will win a contract?",
        answer:
          "No. Awards depend on the buyer’s process, evaluation and competing bids. Our role is to help you prepare a clear, evidence-based and relevant submission.",
      },
      {
        question: "Do you support children’s services?",
        answer:
          "We support both adult and children’s social care providers. We will discuss the opportunity and confirm whether our expertise is the right fit before agreeing the work.",
      },
    ],
    image: "/images/consultancy.jpg",
    imageAlt: "Professionals discussing an opportunity together",
  },
  {
    slug: "training-and-development",
    title: "Training & Development",
    shortTitle: "Training & development",
    intro:
      "Relevant, practical learning that builds confident professionals and capable teams.",
    headline: "Confident people. Stronger teams.",
    description:
      "The best training connects professional knowledge to the situations your team faces every day. We provide learning that supports sound judgement, person-centred practice and a shared understanding of what good care looks like.",
    audience:
      "For care teams, managers and organisations looking for practical professional development, including training tailored to a specific service or learning need.",
    items: [
      "Mental Capacity Act",
      "Safeguarding",
      "Risk assessment",
      "Person-centred care",
      "Care planning",
      "Record keeping",
      "Effective communication",
      "Leadership and management",
      "Quality assurance",
      "Professional boundaries",
      "Incident management",
      "Preparing for inspection",
    ],
    outcomes: [
      {
        title: "Start with your team",
        text: "Identify the skills, confidence and knowledge your staff need, taking account of their roles and experience.",
      },
      {
        title: "Make learning relevant",
        text: "Tailor the content to your service and connect professional principles to realistic situations.",
      },
      {
        title: "Bring learning into practice",
        text: "Help your team reflect on what they have learned and identify how it can inform their everyday work.",
      },
    ],
    faqs: [
      {
        question: "Can you tailor a training package for us?",
        answer:
          "Yes. We can discuss your service, your team’s experience and your learning priorities, then develop a package around those needs.",
      },
      {
        question: "How is training delivered?",
        answer:
          "Delivery format, group size and timings are agreed with you when we scope the training. Tell us your preferences and any access needs in your enquiry.",
      },
      {
        question: "Is the training accredited?",
        answer:
          "We do not claim accreditation for this catalogue. Any specific recognition, assessment or attendance documentation will be confirmed in the proposal for your training.",
      },
    ],
    image: "/images/consultancy.jpg",
    imageAlt: "A professional sharing knowledge with a colleague",
  },
  {
    slug: "independent-assessments",
    title: "Independent Assessments",
    shortTitle: "Independent assessments",
    intro:
      "Objective assessments and professional reports that keep the individual at the centre.",
    headline: "A clear perspective when it matters.",
    description:
      "Some situations need a fresh, independent professional view. Our experienced professionals take a holistic approach to gathering information, understanding circumstances and considering the needs and wishes of the individual.",
    audience:
      "For individuals, families, care providers and organisations seeking independent assessment, review or professional reporting.",
    items: [
      "Care and support assessments",
      "Independent care reviews",
      "Care planning assessments",
      "Mental capacity-related work",
      "Best-interest considerations",
      "Safeguarding reviews",
      "Professional reports",
      "Review of available evidence",
      "Meeting preparation and support",
      "Independent professional advice",
    ],
    outcomes: [
      {
        title: "Understand the question",
        text: "Agree the purpose, scope and intended use of the assessment, including who needs to be involved.",
      },
      {
        title: "Listen and gather evidence",
        text: "Consider the person’s circumstances, wishes and needs alongside relevant information from the people around them.",
      },
      {
        title: "Provide a clear professional view",
        text: "Present findings and recommendations in an accessible report, with the evidence and limits of the assessment made clear.",
      },
    ],
    faqs: [
      {
        question: "Can an independent assessment change a council decision?",
        answer:
          "An independent report can contribute relevant professional evidence, but it does not automatically change a statutory decision. The responsible body retains its decision-making duties.",
      },
      {
        question: "Who will carry out the assessment?",
        answer:
          "We will discuss the expertise needed for your circumstances and confirm the professional undertaking the work before you agree to proceed.",
      },
      {
        question: "What information do you need at first?",
        answer:
          "Start with a brief, general outline of the support you need. Please do not send medical records, case files or other sensitive personal information through the initial enquiry form.",
      },
    ],
    image: "/images/care-conversation.jpg",
    imageAlt: "A close-up of a supportive hand being held",
  },
  {
    slug: "family-support",
    title: "Family Support",
    shortTitle: "Family support",
    intro:
      "A listening ear and independent guidance when someone you love needs support.",
    headline: "You don’t have to work it all out alone.",
    description:
      "When someone you love needs care, knowing what to do next can feel overwhelming. If you are worried about their care, disagree with a decision or simply need help understanding the system, we can listen, explain and help you consider your next steps.",
    audience:
      "For relatives, carers and individuals navigating health and social care in England. You do not need to know the right terminology before you get in touch.",
    items: [
      "Understanding care and support assessments",
      "Care planning",
      "Safeguarding concerns",
      "Mental capacity",
      "Best-interest decisions",
      "NHS Continuing Healthcare",
      "Section 117 aftercare",
      "Independent assessments",
      "Professional reports",
      "Preparation and support for meetings",
    ],
    outcomes: [
      {
        title: "Space to be heard",
        text: "We start by listening to your circumstances, what is worrying you and what matters to the person you care about.",
      },
      {
        title: "Understand your options",
        text: "We explain processes in plain language and help you make sense of the information and decisions in front of you.",
      },
      {
        title: "Take the next step",
        text: "Together, we identify practical ways forward, whether that means preparing for a meeting, seeking an assessment or asking the right questions.",
      },
    ],
    faqs: [
      {
        question: "I’m not sure what support I need. Can I still contact you?",
        answer:
          "Absolutely. A short outline of what is happening is enough to start a conversation. We can help you identify the kind of support that may be useful.",
      },
      {
        question: "Can you attend a meeting with us?",
        answer:
          "Meeting preparation and support can form part of our work. We will discuss the purpose, availability and scope with you before making arrangements.",
      },
      {
        question: "What if someone is at immediate risk?",
        answer:
          "This is not an emergency service. If someone is in immediate danger, call 999. For a safeguarding concern, contact the relevant local authority adult or children’s safeguarding team. NHS 111 can advise on urgent medical concerns that are not life-threatening.",
      },
    ],
    image: "/images/family-support.jpg",
    imageAlt: "A woman offering support to an older man in a comfortable home",
  },
];
export const values = [
  {
    title: "Integrity",
    text: "Honest, professional and evidence-based advice.",
  },
  {
    title: "Independence",
    text: "An objective perspective focused on the needs and interests of the person.",
  },
  {
    title: "Compassion",
    text: "Recognising the people and families behind every case.",
  },
  {
    title: "Accountability",
    text: "Supporting organisations to recognise concerns and take meaningful action.",
  },
  {
    title: "Excellence",
    text: "Working towards consistently high standards of care and professional practice.",
  },
  {
    title: "Partnership",
    text: "Working collaboratively to achieve sustainable outcomes.",
  },
];
