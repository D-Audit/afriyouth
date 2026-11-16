/**
 * services.ts — the labs and services ("What We Do").
 *
 * Shape:
 *   servicesPage → hero + section text for /services and the detail template labels
 *   divisions    → the five strategic divisions and their flagship products
 *   services     → Service[]; each entry automatically gets a page at /services/[slug]
 *
 * To add an area: copy an entry, give it a unique `slug` (and add it to ServiceSlug), and pick
 * an `icon` from IconName (src/content/types.ts). Programs link to a service through `topic`.
 */
import type { Headline, IconName, ImageSlot, PageMeta } from "./types";

export type ServiceSlug =
  | "research-evidence"
  | "policy-governance"
  | "innovation-venture"
  | "foresight-futures"
  | "career-academy"
  | "impact-learning"
  | "funding-readiness";

export type Service = {
  slug: ServiceSlug;
  title: string;
  /** Short name used in chips, menus and filters. */
  shortTitle: string;
  icon: IconName;
  /** "lab" = one of the core labs; "support" = a supporting service offered across the labs. */
  kind: "lab" | "support";
  summary: string;
  heading: Headline;
  intro: string;
  /** What the lab offers. Use several groups (each with a title) when there are distinct tracks. */
  offers: { title?: string; items: string[] }[];
  /** The named product(s) this lab produces. */
  products: { name: string; description?: string }[];
  /** Optional pathway shown as a row of connected steps. */
  model?: { label: string; steps: string[] };

  image: ImageSlot;
};

export const servicesPage = {
  meta: {
    title: "What We Do",
    description:
      "Research and evidence, policy and governance, youth innovation and ventures, strategic foresight, and career and professional development, with impact measurement and funding readiness across them all.",
  } satisfies PageMeta,
  hero: {
    label: "What we do",
    heading: { title: "Research. Design.", emphasis: "Innovate. Transform." },
    intro:
      "Through human-centered design, applied research and innovation, we transform community-driven ideas into practical and scalable solutions that contribute to the socio-economic transformation of Africa and beyond.",
  },
  listIntro: {
    label: "Labs and services",
    heading: { title: "Find the lab", emphasis: "that fits your goal." },
    intro: "Our labs, our academy and our supportive services.",
  },
  divisionsIntro: {
    label: "Our portfolio",
    heading: { title: "Five strategic divisions,", emphasis: "one portfolio." },
    intro:
      "Everything we do is organized into five divisions, each with its own flagship products.",
    divisionHeading: "Division",
    productsHeading: "Flagship products",
    note: "Resource Mobilization & Partnerships is a cross-cutting service that supports every division.",
  },
  detail: {
    offersLabel: "What we offer",
    offersHeading: { title: "What we", emphasis: "offer" },

    productsLabel: "Our product",
    productsLabelPlural: "Our products",
    relatedLabel: "Related programs",
    relatedEmpty: "Programs in this area will be listed here soon.",
    otherAreasLabel: "Other labs and services",
    cta: {
      heading: { title: "Want to work with us", emphasis: "in this area?" },
      intro: "Tell us what you're working on.",
      primary: { label: "Start a conversation", href: "/contact" },
      secondary: { label: "See everything we do", href: "/services" },
    },
  },
};

export const divisions: { title: string; products: string[]; href: string }[] = [
  {
    title: "Research & Evidence",
    products: ["Evidence Reports", "Surveys", "Impact Studies"],
    href: "/services/research-evidence",
  },
  {
    title: "Policy & Governance",
    products: ["Policy Lab", "Policy Papers", "Policy Innovation Challenges"],
    href: "/services/policy-governance",
  },
  {
    title: "Innovation & Entrepreneurship",
    products: ["Innovation Accelerator", "Human-Centered Design Lab"],
    href: "/services/innovation-venture",
  },
  {
    title: "Foresight & Futures",
    products: ["Africa 2030/2050 Scenarios", "Futures Studies"],
    href: "/services/foresight-futures",
  },
  {
    title: "Leadership & Capacity Building",
    products: [
      "Employability Skills Lab",
      "Professional Skills Academy",
      "Impact & Learning Services",
    ],
    href: "/services/career-academy",
  },
];

export const services: Service[] = [
  {
    slug: "research-evidence",
    title: "Research & Evidence Lab",
    shortTitle: "Research & Evidence",
    icon: "search",
    kind: "lab",
    summary: "We generate evidence on Africa's emerging socio-economic challenges.",
    heading: { title: "Evidence on Africa's", emphasis: "emerging challenges." },
    intro:
      "In the Research & Evidence Lab, we generate evidence on Africa's emerging socio-economic challenges.",
    offers: [
      {
        items: [
          "Applied policy research",
          "Socio-economic research",
          "Youth research and surveys",
          "Baseline and endline studies",
          "Impact assessments",
          "Program evaluations",
          "Institutional and stakeholder analysis",
          "Political-economy analysis",
          "Research reports",
          "Policy briefs",
          "Evidence synthesis",
        ],
      },
    ],
    products: [
      {
        name: "AfriYouth Evidence Reports",
        description: "Evidence reports for companies and organizations.",
      },
    ],
    image: {
      src: "/images/photos/vr-design.jpg",
      alt: "A young woman wearing a VR headset while working at a computer",
      placeholder: "A young woman wearing a VR headset while working at a computer",
    },
  },
  {
    slug: "policy-governance",
    title: "Policy & Governance Lab",
    shortTitle: "Policy & Governance",
    icon: "scale",
    kind: "lab",
    summary: "We translate research into actionable policies and institutional reforms.",
    heading: { title: "From research to", emphasis: "actionable policy." },
    intro:
      "In the Policy & Governance Lab, we translate research into actionable policies and institutional reforms.",
    offers: [
      {
        items: [
          "Policy analysis and design",
          "Policy review",
          "Regulatory analysis",
          "Policy briefs",
          "Governance diagnostics",
          "Public-sector innovation",
          "Stakeholder mapping",
          "Policy dialogue facilitation",
          "Policy implementation support",
        ],
      },
    ],
    products: [
      {
        name: "AfriYouth Policy Solutions Series",
        description: "Our most important intellectual product.",
      },
      {
        name: "Policy Innovation Challenge",
        description:
          "Our most unique product: young people work on real policy problems and present at the Policy Innovation Demo Day.",
      },
    ],
    image: {
      src: "/images/photos/solar-team.jpg",
      alt: "Three young engineers in hard hats reviewing plans beside solar panels",
      placeholder: "Three young engineers in hard hats reviewing plans beside solar panels",
    },
  },
  {
    slug: "innovation-venture",
    title: "Youth Innovation & Venture Lab",
    shortTitle: "Innovation & Venture",
    icon: "rocket",
    kind: "lab",
    summary: "We identify, nurture and advance promising ideas from Africa's young innovators.",
    heading: { title: "Promising ideas from", emphasis: "Africa's young innovators." },
    intro:
      "The Youth Innovation & Venture Lab identifies, nurtures and advances promising ideas from Africa's young innovators to address the Sustainable Development Goals (SDGs).",
    offers: [
      {
        items: [
          "Idea discovery",
          "Human-centered design",
          "Design thinking",
          "Business-model development",
          "Prototype development",
          "Market validation",
          "Incubation",
          "Acceleration",
          "Pitch preparation",
          "Investor readiness",
          "Impact measurement",
        ],
      },
    ],
    products: [
      {
        name: "AfriYouth Innovation Accelerator",
        description: "Incubation, acceleration and Demo Day.",
      },
    ],
    model: { label: "Our model", steps: ["Incubation", "Acceleration", "Demo Day"] },
    image: {
      src: "/images/photos/startup.jpg",
      alt: "A smiling young woman holding up a “Start Up” sign in an office",
      placeholder: "A smiling young woman holding up a “Start Up” sign in an office",
    },
  },
  {
    slug: "foresight-futures",
    title: "Strategic Foresight & Futures Lab",
    shortTitle: "Foresight & Futures",
    icon: "telescope",
    kind: "lab",
    summary: "Scenario planning, horizon scanning and 2030, 2040 and 2050 scenarios for Africa.",
    heading: { title: "Africa in 2030,", emphasis: "2040 and 2050." },
    intro:
      "Strategic foresight strongly differentiates AfriYouth from conventional innovation hubs.",
    offers: [
      {
        items: [
          "Scenario planning",
          "Horizon scanning",
          "PESTLE / STEEPV analysis",
          "Future-of-work studies",
          "Emerging technology analysis",
          "Strategic foresight",
          "2030 / 2040 / 2050 scenarios",
        ],
      },
    ],
    products: [
      {
        name: "Africa 2050 Futures Series",
        description: "For example: “Africa's Youth Workforce in 2050: Four Possible Futures”.",
      },
    ],
    image: {
      src: "/images/photos/vr-electronics.jpg",
      alt: "A young person wearing a VR headset while working on electronics",
      placeholder: "A young person wearing a VR headset while working on electronics",
    },
  },
  {
    slug: "career-academy",
    title: "Career & Professional Development Academy",
    shortTitle: "Career & Professional Development",
    icon: "graduation-cap",
    kind: "lab",
    summary:
      "A practical career-readiness and workforce transition platform, with practical, outcome-oriented professional development.",
    heading: { title: "From education", emphasis: "to career progression." },
    intro:
      "A practical career-readiness and workforce transition platform that helps young people move from education to employability, employment and career progression. It is practical, evidence-based and outcome-oriented, rather than just certificate-based training.",
    offers: [
      {
        title: "Career & employability",
        items: [
          "CV customization",
          "Cover letter customization",
          "LinkedIn optimization",
          "Portfolio development",
          "Job searching strategies",
          "Understanding job descriptions",
          "Application customization",
          "Applicant Tracking Systems (ATS)",
          "Networking for employment",
          "Interview readiness and professional etiquette",
        ],
      },
      {
        title: "Professional development",
        items: [
          "Leadership & management",
          "Critical thinking & problem-solving",
          "Communication & professionalism",
          "Digital & AI skills",
          "Project & performance management",
          "Career & personal development",
        ],
      },
    ],
    products: [
      {
        name: "Employability Bootcamp",
        description: "For graduates.",
      },
      {
        name: "University Employability Programme",
        description: "For university students.",
      },
      {
        name: "Professional Development Academy",
        description: "Practical, evidence-based and outcome-oriented.",
      },
    ],
    model: {
      label: "The pathway",
      steps: ["Education", "Employability", "Employment", "Career progression"],
    },
    image: {
      src: "/images/photos/soldering.jpg",
      alt: "A young person soldering electronics under a desk lamp",
      placeholder: "A young person soldering electronics under a desk lamp",
    },
  },
  {
    slug: "impact-learning",
    title: "Impact & Learning Services",
    shortTitle: "Impact & Learning",
    icon: "chart-line",
    kind: "support",
    summary:
      "Many organizations implement projects but struggle to demonstrate whether they actually work.",
    heading: { title: "Does the project", emphasis: "actually work?" },
    intro:
      "Many organizations implement projects but struggle to demonstrate whether they actually work. Our Impact & Learning Services help them show it.",
    offers: [
      {
        items: [
          "Theory of Change",
          "Logical frameworks",
          "M&E systems",
          "KPIs",
          "Baseline studies",
          "Outcome measurement",
          "Impact measurement and evaluation",
          "Learning reports",
          "Impact storytelling",
        ],
      },
    ],
    products: [
      {
        name: "AfriYouth Impact Dashboard",
      },
    ],
    image: {
      src: "/images/photos/circuit.jpg",
      alt: "A young woman in glasses working closely on a circuit board",
      placeholder: "A young woman in glasses working closely on a circuit board",
    },
  },
  {
    slug: "funding-readiness",
    title: "Funding & Investment Readiness",
    shortTitle: "Funding & Investment Readiness",
    icon: "handshake",
    kind: "support",
    summary: "A fundraising service: resource mobilization and investment readiness.",
    heading: { title: "Resource mobilization and", emphasis: "investment readiness." },
    intro: "This is our fundraising service: resource mobilization and investment readiness.",
    offers: [
      {
        items: [
          "Grant opportunity intelligence",
          "Grant strategy",
          "Proposal development",
          "Donor mapping",
          "Investor readiness",
          "Pitch deck development",
          "Business case development",
          "Financial modelling",
          "Partnership development",
          "Due-diligence preparation",
        ],
      },
    ],
    products: [],
    image: {
      src: "/images/photos/startup.jpg",
      alt: "A smiling young woman holding up a “Start Up” sign in an office",
      placeholder: "A smiling young woman holding up a “Start Up” sign in an office",
    },
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
