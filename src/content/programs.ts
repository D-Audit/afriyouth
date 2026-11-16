/**
 * programs.ts — the programs people can join, listed on /programs, the home page and lab pages.
 *
 * Shape:
 *   programsPage → hero, filter labels and detail-page labels
 *   topicOptions → filter options (each maps to a service slug)
 
 *   programs     → Program[]; each entry automatically gets a page at /programs/[slug]
 *
 * Each program page is built from `sections`. A section has a `layout`:
 *   "stages" → numbered steps with descriptions     "flow"  → short steps joined by arrows
 *   "list"   → a checklist                           "chips" → compact tags
 *   "cards"  → titled cards with descriptions
 *
 * DATES AND STATUS: none have been confirmed, so none are shown. When a call is confirmed, add
 * `status: "open"` (or "upcoming" / "ongoing" / "closed") to the program and point
 * `apply.href` at the application form. The status badge and filter then appear by themselves.
 */
import type { ImageSlot, LinkItem, PageMeta, Status } from "./types";
import type { ServiceSlug } from "./services";

export type ProgramSection = {
  id: string;
  title: string;
  intro?: string;
  layout: "stages" | "flow" | "list" | "chips" | "cards";
  items: { title: string; description?: string }[];
};

export type Program = {
  slug: string;
  name: string;
  /** Short descriptor shown above the name, e.g. "Flagship accelerator". */
  format: string;
  summary: string;
  /** Leave out until a call is confirmed; then use "open", "upcoming", "ongoing" or "closed". */
  status?: Status;
  topic: ServiceSlug;

  overview: string[];
  /** Optional pull-out statement shown under the overview. */
  highlight?: { label: string; text: string };
  sections: ProgramSection[];
  /** Who the program is for, only where this has been confirmed. */
  whoCanJoin?: string[];
  /** What the program ends in, e.g. a Demo Day. */
  outcome?: { label: string; value: string };
  apply: LinkItem & { note: string };
  image: ImageSlot;
};

export const topicOptions: { value: ServiceSlug; label: string }[] = [
  { value: "innovation-venture", label: "Innovation & ventures" },
  { value: "policy-governance", label: "Policy" },
  { value: "career-academy", label: "Careers & skills" },
];

export const statusOptions: { value: Status; label: string }[] = [
  { value: "open", label: "Open" },
  { value: "upcoming", label: "Upcoming" },
  { value: "ongoing", label: "Ongoing" },
  { value: "closed", label: "Closed" },
];

export const programsPage = {
  meta: {
    title: "Programs",
    description:
      "AfriYouth programs: the Evidence-to-Impact Accelerator, the Innovation Accelerator, the Policy Innovation Challenge, employability programs and the Professional Development Academy.",
  } satisfies PageMeta,
  hero: {
    label: "Programs",
    heading: { title: "Programs that take ideas", emphasis: "from evidence to impact." },
    intro:
      "Explore AfriYouth's program portfolio for young people. Each page explains a program's focus and approach; contact the team for current details and next steps.",
  },
  filters: {
    legend: "Filter programs",

    topic: "Area",
    status: "Status",
  },
  detail: {
    backLabel: "All programs",
    overviewLabel: "Overview",
    whoLabel: "Who it's for",
    applyHeading: "Questions about this program?",
    questions: { label: "Explore all programs", href: "/programs" },
    statusLabel: "Status",
    relatedLabel: "Part of",
  },
};

const askAboutProgram = (slug: string): Program["apply"] => ({
  label: "Ask about this program",
  href: `/contact?role=young-person&program=${slug}`,
  note: "Send the team a message for current details and next steps.",
});

/** Covered by both employability programs. */
const employabilityTopics: ProgramSection = {
  id: "topics",
  title: "What you'll cover",
  layout: "list",
  items: [
    { title: "CV customization" },
    { title: "Cover letter customization" },
    { title: "LinkedIn optimization" },
    { title: "Portfolio development" },
    { title: "Job searching strategies" },
    { title: "Understanding job descriptions" },
    { title: "Application customization" },
    { title: "Applicant Tracking Systems (ATS)" },
    { title: "Networking for employment" },
    { title: "Interview readiness and professional etiquette" },
  ],
};

const experientialLearning: ProgramSection = {
  id: "learning",
  title: "How you'll learn",
  intro: "Experiential learning is mandatory. Instead of training then a certificate, we prefer:",
  layout: "flow",
  items: [
    { title: "Learn" },
    { title: "Practice" },
    { title: "Apply" },
    { title: "Receive feedback" },
    { title: "Improve" },
    { title: "Demonstrate" },
  ],
};

const employabilitySimulation: ProgramSection = {
  id: "simulation",
  title: "The Employability Simulation",
  intro: "Participants receive a fictional job vacancy. They must:",
  layout: "stages",
  items: [
    { title: "Analyse the job description" },
    { title: "Research the organization" },
    { title: "Customize your CV" },
    { title: "Write a cover letter" },
    { title: "Apply" },
    { title: "Complete a psychometric test" },
    { title: "Attend an interview" },
    { title: "Complete a case study" },
    { title: "Negotiate salary" },
    { title: "Receive feedback" },
  ],
};

const careerPathway: ProgramSection = {
  id: "pathway",
  title: "The pathway",
  layout: "flow",
  items: [
    { title: "Education" },
    { title: "Employability" },
    { title: "Employment" },
    { title: "Career progression" },
  ],
};

export const programs: Program[] = [
  {
    slug: "evidence-to-impact-accelerator",
    name: "Evidence-to-Impact Accelerator",
    format: "Flagship program",
    summary:
      "Our flagship product: research, incubation and training combined in ten stages, from Discover to Scale.",
    topic: "innovation-venture",
    overview: [
      "The Evidence-to-Impact Accelerator is the flagship AfriYouth product. Instead of running disconnected research, incubation and training programs, we combine them into a single journey.",
      "It runs in ten stages, from identifying the problem through community research to scaling what works. Our approach is much more distinctive than a traditional accelerator.",
    ],
    sections: [
      {
        id: "stages",
        title: "The ten stages",
        layout: "stages",
        items: [
          {
            title: "Discover",
            description: "Identify the problem through community research.",
          },
          {
            title: "Diagnose",
            description: "Understand root causes using systems and political-economy analysis.",
          },
          { title: "Research", description: "Generate and analyse evidence." },
          { title: "Design", description: "Develop a human-centered solution." },
          { title: "Prototype", description: "Build and test the solution." },
          {
            title: "Policy",
            description: "Develop policy recommendations and business cases.",
          },
          {
            title: "Finance",
            description: "Connect the solution to funders, investors and partners.",
          },
          { title: "Implement", description: "Pilot the solution." },
          { title: "Measure", description: "Evaluate outcomes and impact." },
          { title: "Scale", description: "Scale what works." },
        ],
      },
    ],
    apply: askAboutProgram("evidence-to-impact-accelerator"),
    image: {
      src: "/images/photos/soldering.jpg",
      alt: "A young person soldering electronics under a desk lamp",
      placeholder: "A young person soldering electronics under a desk lamp",
    },
  },
  {
    slug: "innovation-accelerator",
    name: "AfriYouth Innovation Accelerator",
    format: "Accelerator",
    summary: "Incubation, acceleration and Demo Day for Africa's young innovators.",
    topic: "innovation-venture",
    overview: [
      "The AfriYouth Innovation Accelerator is the product of our Youth Innovation & Venture Lab. It identifies, nurtures and advances promising ideas from Africa's young innovators that address the Sustainable Development Goals.",
      "Our model: incubation, then acceleration, then Demo Day.",
    ],
    sections: [
      {
        id: "model",
        title: "Our model",
        layout: "flow",
        items: [{ title: "Incubation" }, { title: "Acceleration" }, { title: "Demo Day" }],
      },
      {
        id: "support",
        title: "The support you get",
        layout: "list",
        items: [
          { title: "Idea discovery" },
          { title: "Human-centered design" },
          { title: "Design thinking" },
          { title: "Business-model development" },
          { title: "Prototype development" },
          { title: "Market validation" },
          { title: "Pitch preparation" },
          { title: "Investor readiness" },
          { title: "Impact measurement" },
        ],
      },
    ],
    outcome: { label: "Ends with", value: "Demo Day" },
    apply: askAboutProgram("innovation-accelerator"),
    image: {
      src: "/images/photos/startup.jpg",
      alt: "A smiling young woman holding up a “Start Up” sign in an office",
      placeholder: "A smiling young woman holding up a “Start Up” sign in an office",
    },
  },
  {
    slug: "policy-innovation-challenge",
    name: "Policy Innovation Challenge",
    format: "Challenge",
    summary: "Young people work on real policy problems and design evidence-based solutions.",
    topic: "policy-governance",
    overview: [
      "The Policy Innovation Challenge is our most unique product. Instead of asking young people “What business would you like to start?”, we ask a different question.",
      "Young people work on real policy problems and produce research, a diagnosis, a policy proposal, a prototype and a policy pitch.",
    ],
    highlight: {
      label: "The question we ask",
      text: "What is one of Africa's most pressing problems, and what evidence-based solution can you design?",
    },
    sections: [
      {
        id: "journey",
        title: "What participants produce",
        layout: "flow",
        items: [
          { title: "Research" },
          { title: "Diagnosis" },
          { title: "Policy proposal" },
          { title: "Prototype" },
          { title: "Policy pitch" },
        ],
      },
      {
        id: "themes",
        title: "Potential themes",
        layout: "chips",
        items: [
          { title: "Youth employment" },
          { title: "Education" },
          { title: "Digital transformation" },
          { title: "Artificial intelligence (AI)" },
          { title: "Agriculture" },
          { title: "Climate" },
          { title: "Health" },
          { title: "Entrepreneurship" },
          { title: "Urban development" },
          { title: "Regional integration" },
        ],
      },
    ],
    outcome: { label: "Ends with", value: "Policy Innovation Demo Day" },
    apply: askAboutProgram("policy-innovation-challenge"),
    image: {
      src: "/images/photos/solar-team.jpg",
      alt: "Three young engineers in hard hats reviewing plans beside solar panels",
      placeholder: "Three young engineers in hard hats reviewing plans beside solar panels",
    },
  },
  {
    slug: "employability-bootcamp",
    name: "Employability Bootcamp",
    format: "For graduates",
    whoCanJoin: ["Graduates"],
    summary:
      "The employability program of our Career & Professional Development Academy for graduates.",
    topic: "career-academy",
    overview: [
      "The Employability Bootcamp is part of our Career & Professional Development Academy, a practical career-readiness and workforce transition platform that helps young people move from education into employment and on to career progression.",
      "The bootcamp is for graduates. It is highly practical.",
    ],
    sections: [careerPathway, employabilityTopics, experientialLearning, employabilitySimulation],
    apply: askAboutProgram("employability-bootcamp"),
    image: {
      src: "/images/photos/vr-design.jpg",
      alt: "A young woman wearing a VR headset while working at a computer",
      placeholder: "A young woman wearing a VR headset while working at a computer",
    },
  },
  {
    slug: "university-employability-programme",
    name: "University Employability Programme",
    format: "For university students",
    whoCanJoin: ["University students"],
    summary:
      "The employability program of our Career & Professional Development Academy for university students.",
    topic: "career-academy",
    overview: [
      "The University Employability Programme is part of our Career & Professional Development Academy, a practical career-readiness and workforce transition platform that helps young people move from education to employability, employment and career progression.",
      "This program is for university students. It covers the same topics as the Employability Bootcamp and is highly practical.",
    ],
    sections: [careerPathway, employabilityTopics, experientialLearning, employabilitySimulation],
    apply: askAboutProgram("university-employability-programme"),
    image: {
      src: "/images/photos/vr-electronics.jpg",
      alt: "A young person wearing a VR headset while working on electronics",
      placeholder: "A young person wearing a VR headset while working on electronics",
    },
  },
  {
    slug: "professional-development-academy",
    name: "Professional Development Academy",
    format: "Professional skills",
    summary:
      "Practical, evidence-based and outcome-oriented, rather than just a certificate-based training program.",
    topic: "career-academy",
    overview: [
      "The Professional Development Academy is practical, evidence-based and outcome-oriented, rather than just a certificate-based training program.",
      "Our unique feature: a professional competency assessment, practical training, a real-world challenge, feedback and a professional portfolio.",
    ],
    sections: [
      {
        id: "approach",
        title: "Our unique feature",
        layout: "flow",
        items: [
          { title: "Professional competency assessment" },
          { title: "Practical training" },
          { title: "Real-world challenge" },
          { title: "Feedback" },
          { title: "Professional portfolio" },
        ],
      },
      {
        id: "areas",
        title: "Six areas of development",
        layout: "cards",
        items: [
          {
            title: "Leadership & Management",
            description:
              "Strategic leadership, teamwork, conflict management and change management.",
          },
          {
            title: "Critical Thinking & Problem-Solving",
            description: "Analytical thinking, decision-making, systems thinking and creativity.",
          },
          {
            title: "Communication & Professionalism",
            description:
              "Professional communication, presentation, negotiation and workplace etiquette.",
          },
          {
            title: "Digital & AI Skills",
            description: "Digital productivity, AI literacy, responsible AI use and data literacy.",
          },
          {
            title: "Project & Performance Management",
            description:
              "Project management, results-based management, M&E and impact measurement.",
          },
          {
            title: "Career & Personal Development",
            description:
              "Personal branding, networking, career planning, adaptability and continuous learning.",
          },
        ],
      },
    ],

    apply: askAboutProgram("professional-development-academy"),
    image: {
      src: "/images/photos/circuit.jpg",
      alt: "A young woman in glasses working closely on a circuit board",
      placeholder: "A young woman in glasses working closely on a circuit board",
    },
  },
];

export function getProgram(slug: string): Program | undefined {
  return programs.find((program) => program.slug === slug);
}
