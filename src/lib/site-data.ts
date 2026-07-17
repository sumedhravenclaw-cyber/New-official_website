import {
  Code2,
  Sigma,
  Paintbrush,
  BarChart3,
  Share2,
  TrendingUp,
  Bot,
  Search,
  Lightbulb,
  Columns2,
  Rocket,
  Users,
  Trophy,
  Star,
  Target,
  Eye,
  HeartHandshake,
  Smartphone,
  Zap,
  type LucideIcon,
} from "lucide-react";

/* ============ SERVICES ============ */
export interface ServicePackage {
  name: string;
  tagline: string;
  features: string[];
  cta: string;
  /** Highlight the recommended tier (brand-coloured border + badge). */
  highlight?: boolean;
  badge?: string;
  /** Premium "build your own" tier — rendered with the brand gradient CTA. */
  custom?: boolean;
}

export interface Service {
  slug: string;
  icon: LucideIcon;
  title: string;
  desc: string;
  color: string;
  bg: string;
  border: string;
  longDesc: string;
  features: string[];
  process: { title: string; desc: string }[];
  /** Optional pricing tiers, shown as boxes on the detail page. */
  packages?: ServicePackage[];
}

export const services: Service[] = [
  {
    slug: "web-development",
    icon: Code2,
    title: "Web Development",
    desc: "Modern websites and web applications that perform.",
    color: "#CC2829",
    bg: "linear-gradient(135deg, #CC282915, #D9601608)",
    border: "#CC282930",
    longDesc:
      "We design and build fast, accessible, production-grade websites and web apps — from marketing sites to complex internal tools — using modern frameworks and clean, maintainable code.",
    features: [
      "Custom React / Next.js builds",
      "Performance & Core Web Vitals tuning",
      "API integrations & backend hookup",
      "Ongoing support & maintenance",
    ],
    process: [
      { title: "Discover", desc: "We map your requirements, users, and technical constraints." },
      { title: "Build", desc: "Iterative development with regular preview deploys." },
      { title: "Launch", desc: "QA, performance pass, and a smooth go-live." },
    ],
    packages: [
      {
        name: "Starter Website",
        tagline: "Get online fast with all the essentials covered.",
        features: [
          "5–7 pages",
          "Responsive design",
          "Basic SEO setup",
          "Contact form",
          "WhatsApp integration",
          "1 month free support",
        ],
        cta: "Choose Starter",
      },
      {
        name: "Business Website",
        tagline: "For growing brands that need to convert and scale.",
        highlight: true,
        badge: "Most Popular",
        features: [
          "8–12 pages",
          "Custom UI/UX",
          "Blog setup",
          "On-page SEO",
          "Google Analytics",
          "Search Console",
          "Speed optimization",
          "Basic chatbot",
          "3 months support",
        ],
        cta: "Choose Business",
      },
      {
        name: "Custom Plan",
        tagline: "Mix, match and scale — built exactly around your goals.",
        custom: true,
        features: [
          "Choose any combination instead of a fixed plan",
          "Customize a bigger, tailored package",
          "Everything in Business, plus your requirements",
        ],
        cta: "Build Your Plan",
      },
    ],
  },
  {
    slug: "ui-ux-design",
    icon: Sigma,
    title: "UI/UX Design",
    desc: "Beautiful interfaces with exceptional user experience.",
    color: "#A7069B",
    bg: "linear-gradient(135deg, #A7069B15, #631DFE08)",
    border: "#A7069B30",
    longDesc:
      "We research how your users think, then design interfaces that feel obvious to use — wireframes, prototypes and polished UI kits that your team can build straight from.",
    features: [
      "User research & journey mapping",
      "Wireframes & interactive prototypes",
      "Design systems & component libraries",
      "Usability testing",
    ],
    process: [
      { title: "Research", desc: "Interviews and journey mapping to find real friction points." },
      { title: "Design", desc: "Wireframes to high-fidelity, interactive prototypes." },
      { title: "Validate", desc: "Usability tests before a single line of code is written." },
    ],
    packages: [
      {
        name: "Starter Design",
        tagline: "A clean, usable interface for a focused product or page.",
        features: [
          "Up to 5 screens",
          "Wireframes",
          "Mobile-responsive layouts",
          "1 revision round",
          "Figma source files",
          "1 month support",
        ],
        cta: "Choose Starter",
      },
      {
        name: "Product Design",
        tagline: "End-to-end product design your team can build straight from.",
        highlight: true,
        badge: "Most Popular",
        features: [
          "Up to 15 screens",
          "User flows & journey mapping",
          "Interactive prototype",
          "Custom UI kit / design system",
          "3 revision rounds",
          "Usability review",
          "Developer handoff",
          "3 months support",
        ],
        cta: "Choose Product",
      },
      {
        name: "Custom Plan",
        tagline: "A design partnership scaled to your roadmap.",
        custom: true,
        features: [
          "Choose any combination instead of a fixed plan",
          "Full design system & component library",
          "Ongoing design retainer available",
        ],
        cta: "Build Your Plan",
      },
    ],
  },
  {
    slug: "branding",
    icon: Paintbrush,
    title: "Branding",
    desc: "Strong brand identity that makes you stand out.",
    color: "#5B9EFE",
    bg: "linear-gradient(135deg, #5B9EFE15, #5A5DFE08)",
    border: "#5B9EFE30",
    longDesc:
      "From logo to voice, we shape a brand identity that is instantly recognizable and consistent everywhere your customers meet you.",
    features: [
      "Logo & visual identity",
      "Brand guidelines & tone of voice",
      "Packaging & print collateral",
      "Social & launch assets",
    ],
    process: [
      { title: "Strategy", desc: "Positioning and audience work before any visuals." },
      { title: "Identity", desc: "Logo, palette, type, and voice explored in parallel." },
      { title: "System", desc: "A guidelines doc your whole team can apply consistently." },
    ],
    packages: [
      {
        name: "Starter Brand",
        tagline: "The core identity a new business needs to launch.",
        features: [
          "Logo design (2 concepts)",
          "Colour palette",
          "Typography selection",
          "Business card design",
          "Social profile kit",
          "1 month support",
        ],
        cta: "Choose Starter",
      },
      {
        name: "Complete Brand",
        tagline: "A full, consistent identity system across every touchpoint.",
        highlight: true,
        badge: "Most Popular",
        features: [
          "Logo suite (primary + variations)",
          "Full brand guidelines",
          "Colour & typography system",
          "Brand voice & messaging",
          "Stationery & templates",
          "Social media kit",
          "Launch asset pack",
          "3 months support",
        ],
        cta: "Choose Complete",
      },
      {
        name: "Custom Plan",
        tagline: "Strategy-led branding shaped around your market.",
        custom: true,
        features: [
          "Choose any combination instead of a fixed plan",
          "Brand strategy workshops",
          "Packaging & print collateral",
        ],
        cta: "Build Your Plan",
      },
    ],
  },
  {
    slug: "social-media",
    icon: Share2,
    title: "Social Media",
    desc: "Done-for-you content that grows your presence.",
    color: "#EA9D12",
    bg: "linear-gradient(135deg, #EA9D1215, #D9601608)",
    border: "#EA9D1230",
    longDesc:
      "End-to-end social media management — strategy, scripting, editing, posting and engagement — built per platform so you show up consistently and grow the audience that matters.",
    features: [
      "Platform-specific content strategy",
      "Custom scripting & editing",
      "Done-for-you posting & engagement",
      "Weekly strategy calls",
    ],
    process: [
      { title: "Strategy", desc: "Pick the platforms and content angles that fit your goals." },
      { title: "Produce", desc: "We script, edit, and schedule content in your voice." },
      { title: "Grow", desc: "Post, engage, and refine from the numbers each week." },
    ],
    packages: [
      {
        name: "Meta",
        tagline: "Instagram + Facebook, fully managed.",
        features: [
          "6–8 posts / month (Instagram + Facebook)",
          "Custom scripting",
          "Concept & direction",
          "Editing that best suits your needs",
          "Done-for-you posting & engagement",
          "Weekly strategy calls",
          "Shooting / Production — Optional",
        ],
        cta: "Choose Meta",
      },
      {
        name: "LinkedIn",
        tagline: "Authority-building for founders & B2B brands.",
        features: [
          "12 posts / month",
          "SEO-driven profile optimization",
          "Strategic pre & post-posting engagement",
          "Banner design for leadership positioning",
          "Top Voice Badge strategy",
          "100+ targeted connections weekly",
          "Weekly strategy calls",
        ],
        cta: "Choose LinkedIn",
      },
      {
        name: "YouTube",
        tagline: "Long-form content that compounds over time.",
        features: [
          "4 long-form videos / month",
          "Scripting & structuring",
          "Editing",
          "Thumbnail design + SEO optimization",
          "Channel strategy",
          "Weekly strategy calls",
          "Shooting / Production — Optional",
        ],
        cta: "Choose YouTube",
      },
      {
        name: "X & Threads",
        tagline: "Real-time presence across X and Threads.",
        features: [
          "20 posts / month (X + Threads)",
          "Hook & thread scripting",
          "Content repurposing across both platforms",
          "Engagement & reply strategy",
          "Audience growth & targeting",
          "Weekly strategy calls",
        ],
        cta: "Choose X & Threads",
      },
      {
        name: "Make Your Own Package",
        tagline: "Mix platforms and scale to your goals.",
        custom: true,
        features: [
          "Choose any combination of platforms instead of one",
          "Customise a bigger package",
          "Shooting / Production — Optional",
        ],
        cta: "Build Your Package",
      },
    ],
  },
  {
    slug: "performance-marketing",
    icon: TrendingUp,
    title: "Performance Marketing",
    desc: "Paid campaigns engineered for profitable growth.",
    color: "#5E9929",
    bg: "linear-gradient(135deg, #5E992915, #5E992908)",
    border: "#5E992930",
    longDesc:
      "Data-driven paid advertising across Meta, Google and YouTube — built around your unit economics to bring down cost-per-acquisition and scale what's already working.",
    features: [
      "Full-funnel paid campaign strategy",
      "Creative testing & iteration",
      "Conversion tracking & attribution",
      "Transparent reporting & insights",
    ],
    process: [
      { title: "Audit", desc: "Baseline your funnel, tracking, and current ad performance." },
      { title: "Launch", desc: "Structured campaigns with clean tracking and creative tests." },
      { title: "Scale", desc: "Double down on winners and cut waste from the numbers." },
    ],
    packages: [
      {
        name: "Starter Ads",
        tagline: "Get profitable campaigns live, fast.",
        features: [
          "1 ad platform (Meta or Google)",
          "Up to 3 ad campaigns",
          "Audience & keyword research",
          "Creative & copy guidance",
          "Conversion tracking setup",
          "Monthly performance report",
        ],
        cta: "Choose Starter",
      },
      {
        name: "Growth Ads",
        tagline: "Multi-platform scaling built to lower CAC.",
        highlight: true,
        badge: "Most Popular",
        features: [
          "Up to 3 platforms (Meta, Google, YouTube)",
          "Full-funnel campaign strategy",
          "A/B creative & landing-page testing",
          "Retargeting & lookalike audiences",
          "Weekly optimization",
          "Bi-weekly reporting & insights",
          "Dedicated ads manager",
        ],
        cta: "Choose Growth",
      },
      {
        name: "Custom Plan",
        tagline: "Aggressive scaling with a bespoke media plan.",
        custom: true,
        features: [
          "Choose any combination instead of a fixed plan",
          "Custom budget & channel mix",
          "Dedicated performance strategist",
        ],
        cta: "Build Your Plan",
      },
    ],
  },
  {
    slug: "ai-solutions",
    icon: Bot,
    title: "AI Solutions",
    desc: "Intelligent solutions for automation and growth.",
    color: "#631DFE",
    bg: "linear-gradient(135deg, #631DFE15, #A7069B08)",
    border: "#631DFE30",
    longDesc:
      "We build practical AI features and automations — chatbots, internal copilots, workflow automation — that save your team real hours, not just demo well.",
    features: [
      "Custom AI agents & chatbots",
      "Workflow & process automation",
      "LLM integration into existing products",
      "Data pipeline & model evaluation",
    ],
    process: [
      { title: "Scope", desc: "Find the highest-leverage, lowest-risk place to start." },
      { title: "Prototype", desc: "A working proof of concept, fast, on real data." },
      { title: "Ship", desc: "Harden, evaluate, and integrate into your product." },
    ],
    packages: [
      {
        name: "Starter AI",
        tagline: "Prove one high-value AI use case, fast.",
        features: [
          "1 use-case scoping",
          "Chatbot or automation MVP",
          "Single data-source integration",
          "Prompt engineering & tuning",
          "Deployment setup",
          "1 month support",
        ],
        cta: "Choose Starter",
      },
      {
        name: "AI Integration",
        tagline: "Production-ready AI woven into your real workflows.",
        highlight: true,
        badge: "Most Popular",
        features: [
          "Multiple workflows automated",
          "Custom AI agent / copilot",
          "RAG on your own data",
          "CRM & tool integrations",
          "Evaluation & safety guardrails",
          "Analytics dashboard",
          "3 months support",
        ],
        cta: "Choose Integration",
      },
      {
        name: "Custom Plan",
        tagline: "Enterprise-grade AI systems built end to end.",
        custom: true,
        features: [
          "Choose any combination instead of a fixed plan",
          "Model fine-tuning & data pipelines",
          "Ongoing model evaluation & support",
        ],
        cta: "Build Your Plan",
      },
    ],
  },
];

export function getServiceBySlug(slug: string | undefined): Service | undefined {
  return services.find((s) => s.slug === slug);
}

/* ============ PORTFOLIO PROJECTS ============ */
export interface Project {
  slug: string;
  title: string;
  category: string;
  type: string;
  img: string;
  color: string;
  client: string;
  year: string;
  description: string;
  highlights: string[];
  tags: string[];
}

export const projects: Project[] = [
  {
    slug: "social-growth-engine",
    title: "Social Growth Engine",
    category: "Social Media",
    type: "Social Media",
    img: "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=1200",
    color: "#EA9D12",
    client: "GlowUp Skincare",
    year: "2026",
    description:
      "A full-funnel social presence across Instagram, LinkedIn and YouTube — strategy, scripting, editing, and done-for-you posting that turned a quiet brand into a consistent inbound channel.",
    highlights: [
      "Followers up 4.3x in five months",
      "1.2M organic monthly views",
      "38% of new leads sourced from social",
    ],
    tags: ["Instagram", "LinkedIn", "YouTube", "Content Strategy"],
  },
  {
    slug: "ai-support-copilot",
    title: "AI Support Copilot",
    category: "AI Solutions",
    type: "AI Solutions",
    img: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1200",
    color: "#631DFE",
    client: "Nimbus SaaS",
    year: "2026",
    description:
      "A retrieval-augmented support copilot trained on the client's docs and tickets — deflecting routine questions and drafting agent replies grounded in real, approved content.",
    highlights: [
      "62% of tickets auto-resolved",
      "First-response time down 74%",
      "Grounded on 4,000+ help articles",
    ],
    tags: ["RAG", "LLM", "Automation", "Support"],
  },
  {
    slug: "fintech-website",
    title: "Fintech Website",
    category: "Web Development",
    type: "Web Development",
    img: "https://images.pexels.com/photos/7567441/pexels-photo-7567441.jpeg?auto=compress&cs=tinysrgb&w=1200",
    color: "#5B9EFE",
    client: "Confidential Fintech Client",
    year: "2025",
    description:
      "A full rebuild of a fintech platform's public site — faster load times, a clearer product story, and a conversion-focused signup flow.",
    highlights: [
      "Cut page load time by 60%",
      "Sign-up conversion up 34%",
      "Fully WCAG-accessible components",
    ],
    tags: ["React", "Next.js", "Tailwind CSS", "Stripe"],
  },
  {
    slug: "travelgo",
    title: "TravelGo",
    category: "Web Development",
    type: "Web Development",
    img: "https://images.pexels.com/photos/1051075/pexels-photo-1051075.jpeg?auto=compress&cs=tinysrgb&w=1200",
    color: "#5E9929",
    client: "TravelGo",
    year: "2025",
    description:
      "A booking-first travel platform with rich destination content, live pricing, and a checkout designed to convert on mobile.",
    highlights: [
      "Mobile bookings up 2.1x",
      "Sub-second search response",
      "Integrated with 3 booking APIs",
    ],
    tags: ["React", "Node.js", "PostgreSQL", "Mapbox"],
  },
  {
    slug: "brand-identity",
    title: "Brand Identity",
    category: "Branding",
    type: "Branding",
    img: "https://images.pexels.com/photos/3944405/pexels-photo-3944405.jpeg?auto=compress&cs=tinysrgb&w=1200",
    color: "#EA9D12",
    client: "Serene Spaces",
    year: "2024",
    description:
      "A ground-up identity system — logo, palette, type, and a guidelines doc the client's team uses across every touchpoint.",
    highlights: [
      "Full brand guidelines delivered",
      "Launch-ready social & print kit",
      "Consistent identity across 12 channels",
    ],
    tags: ["Brand Strategy", "Logo Design", "Guidelines", "Packaging"],
  },
  {
    slug: "dashboard-ui",
    title: "Dashboard UI",
    category: "UI/UX Design",
    type: "UI/UX Design",
    img: "https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=1200",
    color: "#631DFE",
    client: "NovaPrime Solutions",
    year: "2025",
    description:
      "An internal analytics dashboard redesigned around the tasks users actually do daily — fewer clicks, clearer data, less training.",
    highlights: [
      "Task completion time down 45%",
      "Support tickets down 30%",
      "Full component library handed off",
    ],
    tags: ["Figma", "Design System", "Data Visualization"],
  },
  {
    slug: "marketing-campaign",
    title: "Marketing Campaign",
    category: "Performance Marketing",
    type: "Performance Marketing",
    img: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1200",
    color: "#A7069B",
    client: "BloomTech",
    year: "2025",
    description:
      "A quarter-long, multi-channel campaign spanning paid social, search, and email — built around one consistent launch narrative.",
    highlights: [
      "3.2x return on ad spend",
      "45k qualified leads generated",
      "CAC reduced by 28%",
    ],
    tags: ["Paid Social", "SEO", "Email Marketing", "Analytics"],
  },
  {
    slug: "ecommerce-store",
    title: "E-Commerce Store",
    category: "Web Development",
    type: "Web Development",
    img: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1200",
    color: "#CC2829",
    client: "Luminary Retail",
    year: "2024",
    description:
      "A custom storefront built for scale — fast checkout, real-time inventory, and an admin panel the team can run without a developer.",
    highlights: [
      "Checkout conversion up 41%",
      "Handles 10k+ SKUs",
      "Cart abandonment down 22%",
    ],
    tags: ["Shopify", "React", "Custom Checkout"],
  },
];

export function getProjectBySlug(slug: string | undefined): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/* ============ SOCIAL MEDIA WORK ============ */
// Real client work, extracted from the agency's Canva portfolio deck and
// re-encoded to WebP. Each entry is a finished post — branding is baked into
// the artwork, so these render as-is with no overlaid text.
// `w`/`h` are the true pixel dimensions: the masonry relies on them to reserve
// space before load (prevents layout shift) and to keep every post uncropped.
// `client` is set only where the artwork itself names the client.
export interface SocialPost {
  slug: string;
  src: string;
  title: string;
  client?: string;
  w: number;
  h: number;
  color: string;
  /** Path to an MP4 for reels; `src` is the poster frame shown before play. */
  video?: string;
  /** Reel length, e.g. "0:15" — read from the source video, shown on the badge. */
  dur?: string;
}

export const socialPosts: SocialPost[] = [
  {
    slug: "lb-opticals-reel",
    src: "/images/portfolio/social/lb-opticals-reel.webp",
    title: "Brand Reel",
    client: "L&B Opticals",
    w: 506,
    h: 900,
    color: "#631DFE",
    video: "/videos/portfolio/lb-opticals-reel.mp4",
    dur: "0:35",
  },
  {
    slug: "fitness-sumedh-vertical",
    src: "/images/portfolio/social/fitness-sumedh-vertical.webp",
    title: "Fitness Reel",
    w: 506,
    h: 900,
    color: "#A7069B",
    video: "/videos/portfolio/fitness-sumedh-vertical.mp4",
    dur: "0:19",
  },
  {
    slug: "fitness-gymbros",
    src: "/images/portfolio/social/fitness-gymbros.webp",
    title: "Fitness Reel",
    w: 506,
    h: 900,
    color: "#5E9929",
    video: "/videos/portfolio/fitness-gymbros.mp4",
    dur: "0:17",
  },
  {
    slug: "fitness-anand-skyfall",
    src: "/images/portfolio/social/fitness-anand-skyfall.webp",
    title: "Fitness Reel",
    w: 506,
    h: 900,
    color: "#EA9D12",
    video: "/videos/portfolio/fitness-anand-skyfall.mp4",
    dur: "0:29",
  },
  {
    slug: "fitness-anand-babydoll",
    src: "/images/portfolio/social/fitness-anand-babydoll.webp",
    title: "Fitness Reel",
    w: 506,
    h: 900,
    color: "#631DFE",
    video: "/videos/portfolio/fitness-anand-babydoll.mp4",
    dur: "0:16",
  },
  {
    slug: "fitness-sumedh-horizontal",
    src: "/images/portfolio/social/fitness-sumedh-horizontal.webp",
    title: "Fitness Reel",
    w: 900,
    h: 506,
    color: "#5B9EFE",
    video: "/videos/portfolio/fitness-sumedh-horizontal.mp4",
    dur: "0:18",
  },
  {
    slug: "automotive-reel",
    src: "/images/portfolio/social/automotive-reel.webp",
    title: "Automotive Reel",
    w: 506,
    h: 900,
    color: "#5B9EFE",
    video: "/videos/portfolio/automotive-reel.mp4",
    dur: "0:18",
  },
  {
    slug: "lb-opticals-republic-day",
    src: "/images/portfolio/social/lb-opticals-republic-day.webp",
    title: "Republic Day",
    client: "L&B Opticals",
    w: 506,
    h: 900,
    color: "#CC2829",
    video: "/videos/portfolio/lb-opticals-republic-day.mp4",
    dur: "0:05",
  },
  {
    slug: "lb-opticals-gandhi-jayanti",
    src: "/images/portfolio/social/lb-opticals-gandhi-2oct.webp",
    title: "Gandhi Jayanti",
    client: "L&B Opticals",
    w: 1200,
    h: 1200,
    color: "#EA9D12",
  },
  {
    slug: "anishas-art-independence-day",
    src: "/images/portfolio/social/anishas-art-independence-day.webp",
    title: "Independence Day",
    client: "Anisha's Art Academy",
    w: 1000,
    h: 1000,
    color: "#5B9EFE",
  },
  {
    slug: "lb-opticals-labour-day",
    src: "/images/portfolio/social/lb-opticals-labour-day.webp",
    title: "Labour Day",
    client: "L&B Opticals",
    w: 563,
    h: 1000,
    color: "#5E9929",
  },
  {
    slug: "lb-opticals-mahavir-jayanti",
    src: "/images/portfolio/social/lb-opticals-mahavir-jayanti.webp",
    title: "Mahavir Jayanti",
    client: "L&B Opticals",
    w: 563,
    h: 1000,
    color: "#CC2829",
  },
  {
    slug: "lb-opticals-mothers-day",
    src: "/images/portfolio/social/lb-opticals-mothers-day.webp",
    title: "Mother's Day",
    client: "L&B Opticals",
    w: 563,
    h: 1000,
    color: "#A7069B",
  },
  {
    slug: "gym-rohit-01",
    src: "/images/portfolio/social/gym-rohit-01.webp",
    title: "Gym Photography",
    w: 1200,
    h: 675,
    color: "#631DFE",
  },
  {
    slug: "gym-rohit-02",
    src: "/images/portfolio/social/gym-rohit-02.webp",
    title: "Gym Photography",
    w: 675,
    h: 1200,
    color: "#5E9929",
  },
  {
    slug: "gym-rohit-03",
    src: "/images/portfolio/social/gym-rohit-03.webp",
    title: "Gym Photography",
    w: 675,
    h: 1200,
    color: "#EA9D12",
  },
  {
    slug: "gym-amey-01",
    src: "/images/portfolio/social/gym-amey-01.webp",
    title: "Gym Photography",
    w: 675,
    h: 1200,
    color: "#A7069B",
  },
  {
    slug: "gym-rohit-04",
    src: "/images/portfolio/social/gym-rohit-04.webp",
    title: "Gym Photography",
    w: 675,
    h: 1200,
    color: "#CC2829",
  },
  {
    slug: "gym-rohit-05",
    src: "/images/portfolio/social/gym-rohit-05.webp",
    title: "Gym Photography",
    w: 675,
    h: 1200,
    color: "#5B9EFE",
  },
  {
    slug: "gym-rohit-06",
    src: "/images/portfolio/social/gym-rohit-06.webp",
    title: "Gym Photography",
    w: 675,
    h: 1200,
    color: "#631DFE",
  },
  {
    slug: "food-01",
    src: "/images/portfolio/social/food-01.webp",
    title: "Food Photography",
    w: 1200,
    h: 800,
    color: "#EA9D12",
  },
  {
    slug: "food-02",
    src: "/images/portfolio/social/food-02.webp",
    title: "Food Photography",
    w: 800,
    h: 1200,
    color: "#CC2829",
  },
  {
    slug: "food-03",
    src: "/images/portfolio/social/food-03.webp",
    title: "Food Photography",
    w: 1200,
    h: 800,
    color: "#5E9929",
  },
  {
    slug: "food-04",
    src: "/images/portfolio/social/food-04.webp",
    title: "Food Photography",
    w: 1200,
    h: 800,
    color: "#A7069B",
  },
  {
    slug: "food-05",
    src: "/images/portfolio/social/food-05.webp",
    title: "Food Photography",
    w: 1200,
    h: 800,
    color: "#631DFE",
  },
  {
    slug: "anishas-art-student-feature",
    src: "/images/portfolio/social/anishas-art-student-feature.webp",
    title: "Student Feature",
    client: "Anisha's Art Academy",
    w: 474,
    h: 1000,
    color: "#5B9EFE",
  },
  {
    slug: "eyewear-product-01",
    src: "/images/portfolio/social/eyewear-product-01.webp",
    title: "Product Shot",
    client: "L&B Opticals",
    w: 820,
    h: 820,
    color: "#631DFE",
  },
  {
    slug: "eyewear-product-02",
    src: "/images/portfolio/social/eyewear-product-02.webp",
    title: "Product Shot",
    client: "L&B Opticals",
    w: 820,
    h: 820,
    color: "#EA9D12",
  },
  {
    slug: "real-estate-willow-way",
    src: "/images/portfolio/social/real-estate-willow-way.webp",
    title: "Property Tour",
    w: 563,
    h: 1000,
    color: "#5E9929",
  },
];

export const portfolioCategories = [
  "All",
  "Web Development",
  "UI/UX Design",
  "Branding",
  "Social Media",
  "Performance Marketing",
  "AI Solutions",
];

/* ============ CLIENTS ============ */
// Real client logos for the "Our Clients" marquee. Source art is the "black"
// (dark-background) logo set; each file is trimmed and normalised to a 200px
// height in /public/images/clients/. `name` is used for image alt text.
export interface Client {
  name: string;
  src: string;
}

export const clients: Client[] = [
  { name: "Minimal Wave", src: "/images/clients/1.png" },
  { name: "Aarya Singhania", src: "/images/clients/2.png" },
  { name: "Just Another Tale", src: "/images/clients/3.png" },
  { name: "Arcadix", src: "/images/clients/4.png" },
  { name: "Aarya Singhania", src: "/images/clients/5.png" },
  { name: "Client", src: "/images/clients/6.png" },
  { name: "Haven Holic", src: "/images/clients/7.png" },
  { name: "Talent Triathlon", src: "/images/clients/8.png" },
  { name: "Shivam Fitness", src: "/images/clients/9.png" },
  { name: "Homeschooling Luv", src: "/images/clients/10.png" },
  { name: "Team Kapoor", src: "/images/clients/11.png" },
  { name: "HomeLife", src: "/images/clients/12.png" },
  { name: "L&B Opticals", src: "/images/clients/13.png" },
  { name: "L&B Opticals", src: "/images/clients/14.png" },
  { name: "Zone", src: "/images/clients/15.png" },
  { name: "Spectronix", src: "/images/clients/16.png" },
  { name: "Laumep Buhfer", src: "/images/clients/17.png" },
  { name: "Web Shala", src: "/images/clients/18.png" },
  { name: "Sparkling Nest", src: "/images/clients/19.png" },
  { name: "Entersoft", src: "/images/clients/20.png" },
  { name: "The Machi", src: "/images/clients/21.png" },
  { name: "Affinity Mortgage", src: "/images/clients/22.png" },
  { name: "Tarang Patel", src: "/images/clients/23.png" },
  { name: "Exotica", src: "/images/clients/24.png" },
  { name: "Tripoclan", src: "/images/clients/25.png" },
  { name: "Sambhali", src: "/images/clients/26.png" },
  { name: "Black Diamond Agro", src: "/images/clients/27.png" },
  { name: "VidyaNext", src: "/images/clients/28.png" },
  { name: "eVidyaloka", src: "/images/clients/29.png" },
  { name: "Ace Jee", src: "/images/clients/31.png" },
  { name: "Foresta", src: "/images/clients/32.png" },
  { name: "Vruksh Ecosystem", src: "/images/clients/33.png" },
  { name: "HighYield", src: "/images/clients/34.png" },
  { name: "ProSofos", src: "/images/clients/35.png" },
  { name: "Honey Bunny", src: "/images/clients/36.png" },
  { name: "Shital's Gift Collection", src: "/images/clients/37.png" },
  { name: "Shital's Homemade Bakery", src: "/images/clients/38.png" },
  { name: "Shital's Homemade", src: "/images/clients/39.png" },
  { name: "Shital's Souvenir Center", src: "/images/clients/40.png" },
];

/* ============ TESTIMONIALS ============ */
export interface Testimonial {
  name: string;
  company: string;
  role: string;
  img: string;
  review: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    name: "Aisha Kapoor",
    company: "Luminary Retail",
    role: "CEO",
    img: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200",
    review:
      "RavenClaw transformed our online presence completely. Our conversion rate doubled within 3 months of launch. The design is stunning and our customers love the experience.",
    rating: 5,
  },
  {
    name: "Marcus Fernandez",
    company: "Apex Dynamics",
    role: "Founder",
    img: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=200",
    review:
      "The team's attention to detail is unparalleled. They understood our vision instantly and delivered something even better than we imagined. Truly world-class work.",
    rating: 5,
  },
  {
    name: "Shreya Nair",
    company: "BloomTech",
    role: "Product Director",
    img: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=200",
    review:
      "Our UI/UX overhaul was handled flawlessly. User satisfaction scores jumped from 3.2 to 4.8 after launch. I recommend RavenClaw to every product team I know.",
    rating: 5,
  },
  {
    name: "James Okafor",
    company: "NovaPrime Solutions",
    role: "CTO",
    img: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=200",
    review:
      "The AI chatbot they built for us handles 70% of customer queries automatically. The ROI has been incredible. Their technical expertise is matched by their creative vision.",
    rating: 5,
  },
  {
    name: "Priyanka Rajput",
    company: "Serene Spaces",
    role: "Brand Manager",
    img: "https://images.pexels.com/photos/1181695/pexels-photo-1181695.jpeg?auto=compress&cs=tinysrgb&w=200",
    review:
      "Our brand identity package was delivered on time and exceeded every expectation. The brand guidelines are comprehensive and our whole team loves the new visual system.",
    rating: 5,
  },
];

/* ============ PROCESS STEPS ============ */
export interface ProcessStep {
  number: string;
  title: string;
  icon: LucideIcon;
  desc: string;
  color: string;
}

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discovery",
    icon: Search,
    desc: "We immerse ourselves in your world — understanding your business, goals, audience, and competitive landscape.",
    color: "#EA9D12",
  },
  {
    number: "02",
    title: "Strategy",
    icon: Lightbulb,
    desc: "We craft a tailored roadmap — defining scope, milestones, and the strategic foundation for your digital success.",
    color: "#5B9EFE",
  },
  {
    number: "03",
    title: "Design",
    icon: Paintbrush,
    desc: "Our designers create stunning, on-brand visuals with pixel-perfect precision and user-centric thinking.",
    color: "#A7069B",
  },
  {
    number: "04",
    title: "Development",
    icon: Code2,
    desc: "Clean, performant code built on modern stacks — scalable, secure, and maintainable from day one.",
    color: "#631DFE",
  },
  {
    number: "05",
    title: "Testing",
    // Split-pane icon: this step is A/B testing, not lab-bench QA.
    icon: Columns2,
    desc: "Rigorous quality assurance across all devices and scenarios — we ship nothing that isn't perfect.",
    color: "#5E9929",
  },
  {
    number: "06",
    title: "Launch",
    icon: Rocket,
    desc: "A smooth, coordinated go-live — followed by ongoing support, optimization, and partnership.",
    color: "#CC2829",
  },
];

/* ============ WHY CHOOSE US ============ */
export interface Feature {
  icon: LucideIcon;
  title: string;
  desc: string;
  color: string;
  bg: string;
}

export const whyChooseFeatures: Feature[] = [
  { icon: Lightbulb, title: "Creative Design", desc: "Unique, modern and visually stunning designs.", color: "#EA9D12", bg: "#EA9D1215" },
  { icon: Zap, title: "Fast Development", desc: "High performance websites with clean and efficient code.", color: "#5E9929", bg: "#5E992915" },
  { icon: BarChart3, title: "Results Driven", desc: "Solutions that help you grow your business online.", color: "#5B9EFE", bg: "#5B9EFE15" },
  { icon: HeartHandshake, title: "Reliable Support", desc: "We are with you at every step of your journey.", color: "#631DFE", bg: "#631DFE15" },
  { icon: Smartphone, title: "Mobile First", desc: "Fully responsive and optimized for all devices.", color: "#CC2829", bg: "#CC282915" },
  { icon: Rocket, title: "Future Ready", desc: "Scalable solutions built for future success.", color: "#5E9929", bg: "#5E992915" },
];

export interface Stat {
  icon: LucideIcon;
  value: string;
  label: string;
}

export const stats: Stat[] = [
  { icon: Users, value: "50+", label: "Happy Clients" },
  { icon: Trophy, value: "120+", label: "Projects Completed" },
  { icon: Star, value: "7+", label: "Years Experience" },
  { icon: Star, value: "50+", label: "Positive Reviews" },
];

/* ============ ABOUT PAGE ============ */
export interface Value {
  label: string;
  color: string;
  desc: string;
}

export const aboutValues: Value[] = [
  {
    label: "🧠 Intelligence ",
    color: "#EA9D12",
    desc: "Every strategy is backed by research and insights.",
  },
  {
    label: "💡 Wit",
    color: "#5E9929",
    desc: "We think differently to solve challenges creatively.",
  },
  {
    label: "📖 Wisdom",
    color: "#5B9EFE",
    desc: "Experience and continuous learning guide our decisions. ",
  },
  {
    label: "🎨 Creativity",
    color: "#631DFE",
    desc: "Original ideas that help brands stand out and connect. ",
  },
];

export const aboutBullets = [
  { label: "Creative Thinking", color: "#EA9D12" },
  { label: "Innovative Solutions", color: "#5E9929" },
  { label: "Quality & Reliability", color: "#5B9EFE" },
  { label: "Client First Approach", color: "#631DFE" },
];

export const missionVision = [
  {
    icon: Target,
    title: "Our Mission",
    desc: "To help businesses grow through intelligent strategies, creative ideas, and impactful digital solutions driven by intelligence, wit, wisdom, and creativity. ",
    color: "#631DFE",
  },
  {
    icon: Eye,
    title: "Our Vision",
    desc: "To be a trusted digital partner that transforms brands through innovation, creativity, and smart execution. ",
    color: "#A7069B",
  },
];

/* ============ BLOG ============ */
export type BlogCategory = "All" | "Marketing" | "Development" | "Branding" | "Growth" | "Case Studies";

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: Exclude<BlogCategory, "All">;
  author: string;
  readTime: string;
  date: string;
  image: string;
  featured?: boolean;
  content: { heading?: string; body: string[] }[];
}

export function getBlogPostById(id: string | undefined): BlogPost | undefined {
  return blogPosts.find((p) => p.id === id);
}

export const blogCategories: BlogCategory[] = ["All", "Marketing", "Development", "Branding", "Growth", "Case Studies"];

export const blogPosts: BlogPost[] = [
  {
    id: "instagram-hooks-2026",
    title: "The 12 Instagram Hooks That Are Still Converting in 2026",
    excerpt:
      "A breakdown of the scroll-stopping openers our team tests every month, and why the pattern interrupt hook keeps winning.",
    category: "Marketing",
    author: "RavenClaw Team",
    readTime: "6 min read",
    date: "Jun 2026",
    image: "https://images.unsplash.com/photo-1611262588024-d12430b98920?w=800&q=80",
    featured: true,
    content: [
      { body: ["Hooks are the single biggest lever on Instagram reach right now. The algorithm decides whether your reel gets pushed in the first three seconds — so what you say (and show) in that window determines everything. We test hundreds of hooks every month across client accounts, and a clear pattern has emerged: the hooks that still convert in 2026 are the ones that interrupt a scroll without feeling clickbait."] },
      { heading: "1. The pattern interrupt", body: ["Start with a statement that contradicts a common belief. \"Most founders post the wrong kind of content\" works because it makes the viewer ask: am I the founder they mean? The key is specificity — vague provocations flop, sharp ones stick."] },
      { heading: "2. The negative result", body: ["\"I spent ₹2 lakh on Meta ads and got 11 customers.\" Losses outperform wins in hooks because they signal honesty. People are tired of success theatre; a candid failure with a real number buys you attention and trust at once."] },
      { heading: "3. The list tease", body: ["\"3 things your competitor is doing that you're not.\" Numbered teases work because they promise scannable value. Just make sure the body delivers — a broken list promise kills your repeat reach."] },
      { heading: "4. The before/after", body: ["Show the messy before, then the clean after, in the first frame. Visual contrast does the hooking without a single word. This is especially powerful for service businesses and product transformations."] },
      { heading: "What doesn't work anymore", body: ["Questions (\"Did you know...?\") are dead — they feel like a quiz. Generic curiosity gaps (\"You won't believe...\") trigger skip. And any hook that takes longer than 2 seconds to understand is too slow for a feed that moves this fast."] },
      { body: ["The through-line: every hook that still works in 2026 earns the viewer's attention by being specific, honest, and fast. Build a swipe file of the ones that stop you, reverse-engineer the structure, and test a variant every week. Reach compounds when your hooks do."] },
    ],
  },
  {
    id: "nextjs-migration",
    title: "What We Learned Migrating a SaaS Product to Next.js",
    excerpt:
      "Server actions, streaming, and the handful of gotchas that cost us a week — so you don't lose yours.",
    category: "Development",
    author: "Sumedh",
    readTime: "9 min read",
    date: "May 2026",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
    content: [
      { body: ["We recently migrated a 40k-line SaaS app from a custom Express + CSR React setup to Next.js App Router. It was the right call — but the migration ate a week we didn't plan for. Here's what we learned, so you don't lose yours."] },
      { heading: "Server Actions are great — until they're not", body: ["Server Actions feel like magic until you hit an edge case where you need progressive enhancement or a custom error boundary. We ended up using them for ~70% of mutations and kept a thin API layer for everything that needed to be called from outside the React tree (webhooks, cron jobs, mobile). Don't force everything into Actions."] },
      { heading: "Streaming + Suspense changes how you think about loading", body: ["The old pattern was a spinner while data loads. With streaming, you ship the shell instantly and stream sections as they resolve. This is better for perceived performance, but it means your components need to handle their own loading and error states independently. Plan your Suspense boundaries upfront — retrofitting them is painful."] },
      { heading: "The gotcha that cost us a week: client components", body: ["Not every component that uses state needs to be a client component. We over-marked early on and ended up shipping a much larger JS bundle than the old CSR app. The rule: only mark a component 'use client' if it uses hooks, event handlers, or browser APIs. Keep the rest as server components and pass data down."] },
      { heading: "Caching is a different mental model", body: ["Next.js's fetch caching is powerful but unintuitive. We shipped a bug where users saw stale data for 5 minutes because we forgot to revalidate a tagged cache. Tag your caches explicitly, set sane revalidate windows, and use on-demand revalidation for anything that mutates."] },
      { body: ["Net result: 3x faster first load, half the JS, and a codebase that's easier to reason about. The migration was worth it — just budget more time than the docs suggest, and read the edge cases before you start."] },
    ],
  },
  {
    id: "tier-2-branding",
    title: "Branding for Tier-2 India: What Actually Moves the Needle",
    excerpt:
      "Why cultural nuance beats copy-pasted metro playbooks when you're building a brand in smaller cities.",
    category: "Branding",
    author: "RavenClaw Team",
    readTime: "5 min read",
    date: "May 2026",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80",
    content: [
      { body: ["Most brand playbooks are written for Mumbai, Bangalore, and Delhi. They fall apart in tier-2 India, where the cultural fabric, price sensitivity, and media consumption are genuinely different. Here's what actually moves the needle when you're building a brand in smaller cities."] },
      { heading: "Language isn't a translation, it's a tone", body: ["Hinglish works in metros because everyone shares the cultural references. In tier-2, you need regional flavor — not literal translation, but idiom. A Marathi-first hook for a Nagpur audience outperforms its Hindi equivalent by 2-3x. The medium matters less than the register."] },
      { heading: "Trust signals are different", body: ["Metro audiences trust logos and press. Tier-2 audiences trust people they recognize and testimonials from their own community. A reel featuring a local face beats a polished studio ad almost every time. Invest in local micro-creators over generic influencer budgets."] },
      { heading: "Festivals are your Super Bowl", body: ["Regional festivals (Ganesh Chaturthi, Onam, Baisakhi) drive disproportionate commerce in tier-2. Plan your calendar around them, not around generic 'end of quarter' pushes. A well-timed festival drop can outsell a month of business-as-usual."] },
      { heading: "Price framing matters more than price", body: ["EMI framing, bundle pricing, and 'family pack' sizes convert far better than straight discounts. Tier-2 buyers think in total cost, not unit economics. Show the monthly number, not just the MRP."] },
      { body: ["The takeaway: don't copy-paste the metro playbook. Spend a week in the city you're targeting, talk to 20 customers in their language, and let the strategy emerge from the ground up. Nuance is the moat."] },
    ],
  },
  {
    id: "meta-ads-2026",
    title: "META Ads Are Getting More Expensive — Here's Our 2026 Workaround",
    excerpt: "Creative testing cadence, audience layering, and the budget split we use for lean D2C clients.",
    category: "Growth",
    author: "RavenClaw Team",
    readTime: "7 min read",
    date: "Apr 2026",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    content: [
      { body: ["CPMs on Meta are up again this quarter, and the brands that haven't adapted are bleeding. The good news: creative is the lever, and it's fully in your control. Here's the testing cadence and budget split we use for lean D2C clients to keep acquisition costs sane."] },
      { heading: "Test creative in volume, not in perfection", body: ["We ship 15-20 creative variants per week per account, not 3 'perfect' ones. Most fail. The winners are usually the ones we least expected. Volume beats polish in the attention economy — set up a production line, not a gallery."] },
      { heading: "Audience layering, not audience proliferation", body: ["Stop creating 40 interest audiences. Layer 2-3 tight interests with exclusions, and let the creative do the targeting. Broad + good creative consistently outperforms narrow + average creative in 2026."] },
      { heading: "The budget split that works", body: ["70% to proven winners (scaled slowly), 20% to testing new creative against those audiences, 10% to experimental formats and new audiences. Never scale a winner more than 20% a day — Meta's learning phase punishes haste."] },
      { heading: "Measure cost per qualified action, not CPM", body: ["CPM is a vanity metric in a rising-cost environment. Track cost per add-to-cart, cost per qualified lead, and contribution margin per channel. A higher CPM that delivers buyers is cheaper than a low CPM that delivers window-shoppers."] },
      { body: ["Meta isn't getting cheaper. But the brands that treat creative as the core product — and test it like engineers test code — are still growing profitably. The cost is in the work, not the platform."] },
    ],
  },
  {
    id: "ai-invoice-ocr",
    title: "Building an AI Invoice OCR Pipeline That Doesn't Fall Over",
    excerpt:
      "FastAPI, Celery, and Claude working together to turn messy scanned invoices into clean structured data.",
    category: "Development",
    author: "Sumedh",
    readTime: "10 min read",
    date: "Apr 2026",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    content: [
      { body: ["We built an invoice OCR pipeline for a client drowning in 2,000+ scanned invoices a month. The demos looked great. Production was a different story. Here's the architecture that finally held up, and the traps we hit along the way."] },
      { heading: "The stack: FastAPI + Celery + Claude", body: ["FastAPI for the API layer, Celery with Redis for the async job queue, and Claude for the actual extraction. We tried open-source models first (Tesseract + layout parsers) — they hit ~60% accuracy on messy scans. Claude took us to 94% on the same set. The cost per invoice is higher, but the manual review savings more than cover it."] },
      { heading: "Why a queue is non-negotiable", body: ["OCR is slow (2-8 seconds per page) and bursty. If you process synchronously, a 50-invoice upload will time out the API and block your workers. Celery lets you accept the upload, enqueue jobs, and process in parallel. The frontend polls or gets a webhook when done."] },
      { heading: "The trap: confidence without grounding", body: ["The model would confidently extract wrong numbers from blurry regions. Our fix: a validation layer that checks extracted totals against line-item sums, flags mismatches, and routes low-confidence extractions to a human review queue. The AI does 94%, humans do the last 6% — and that 6% teaches the next round of prompts."] },
      { heading: "Structured output is the whole game", body: ["Don't ask the model for prose. Ask for a strict JSON schema (vendor, invoice number, date, line items with tax). Use a schema validator, retry on violation. This turns an LLM into a reliable data pipeline component instead of a chatbot that sometimes returns data."] },
      { heading: "Observability saves your job", body: ["Log every extraction: the scan, the prompt, the raw model output, the validated result, the human verdict. When accuracy drops (and it will, after a model update), these logs are how you debug. Without them, you're flying blind."] },
      { body: ["The pipeline now handles 3,000 invoices a month with one part-time reviewer. The lesson: applied AI is 20% model and 80% plumbing. Spend your time on the queue, the validation, and the observability — not on prompt-tuning theatre."] },
    ],
  },
  {
    id: "food-brand-relaunch",
    title: "How We Repositioned a Regional Food Brand in 90 Days",
    excerpt: "A full brand kit, content system, and launch calendar built for a market most agencies ignore.",
    category: "Case Studies",
    author: "RavenClaw Team",
    readTime: "8 min read",
    date: "Mar 2026",
    image: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=800&q=80",
    content: [
      { body: ["A regional food brand came to us with strong product, weak identity, and a market most agencies ignore. In 90 days we rebuilt the brand from the ground up. Here's the case study — strategy to results."] },
      { heading: "The starting point", body: ["The product was loved locally but looked generic nationally. Packaging was dated, the name didn't travel, and there was no system — just a logo applied inconsistently. Sales were flat despite a loyal base."] },
      { heading: "The strategy: rooted, not regional", body: ["We didn't try to make them look like a metro brand. We leaned into the regional heritage as a differentiator — a name, palette, and voice that felt native to the region but premium enough to sit on a national shelf. 'Local' became a feature, not a limitation."] },
      { heading: "The system", body: ["A flexible logo suite, a warm palette pulled from regional textiles, a type system with a Devanagari companion, and a content system built around the founder's story. Guidelines were short, visual, and actually usable by a small marketing team."] },
      { heading: "The launch", body: ["A 6-week content runway leading into a regional festival, coordinated across packaging, retail POS, and social. We didn't chase virality — we chased consistency across every touchpoint a buyer might meet."] },
      { heading: "The results", body: ["+212% organic reach in 90 days, 3.4x retail reorders from the redesigned packaging, and the brand landed its first national distributor. The founder's note: \"For the first time, the brand looks like the product tastes.\""] },
      { body: ["The lesson: markets most agencies ignore are full of brands that just need craft applied with cultural respect. The strategy wasn't clever — it was specific. And specificity is what scales in markets that don't reward generic."] },
    ],
  },
];

/* ============ CASE STUDIES ============ */
export type Industry = "All" | "Food & Beverage" | "SaaS" | "Fitness" | "Interior Design" | "D2C";

export interface CaseStudy {
  id: string;
  client: string;
  industry: Exclude<Industry, "All">;
  summary: string;
  metric: string;
  metricLabel: string;
  image: string;
  content: { heading?: string; body: string[] }[];
}

export function getCaseStudyById(id: string | undefined): CaseStudy | undefined {
  return caseStudies.find((c) => c.id === id);
}

export const industries: Industry[] = ["All", "Food & Beverage", "SaaS", "Fitness", "Interior Design", "D2C"];

export const caseStudies: CaseStudy[] = [
  {
    id: "the-bussin-plates",
    client: "The Bussin Plates",
    industry: "Food & Beverage",
    summary:
      "Full brand kit and content system for a tier-2 Maharashtra food business, from zero to a recognisable local name.",
    metric: "+212%",
    metricLabel: "organic reach in 90 days",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    content: [
      { body: ["The Bussin Plates is a tier-2 Maharashtra food business with a cult local following and almost zero digital presence. They came to us with a great product, a dated logo, and an Instagram account posting leftovers of someone else's playbook."] },
      { heading: "The challenge", body: ["Strong word-of-mouth in their city, but invisible beyond it. The brand looked like a generic cloud kitchen, not the beloved local name it was. Growth had plateaued because new customers couldn't find them, and existing ones had nothing to share."] },
      { heading: "Our approach", body: ["We built a full brand kit rooted in regional pride — a name refresh, a warm palette inspired by local street-food culture, and a content system built around the founder's voice. Then we launched a 90-day content runway timed to regional festivals, with a consistent visual aesthetic across digital touchpoints."] },
      { heading: "The results", body: ["Within 90 days, organic reach surged by 212%. The brand identity became a recognizable local name, and customer footfall/inbound orders increased dramatically, establishing a strong foundation for future franchises."] }
    ]
  },
  {
    id: "cream-and-cosmos",
    client: "Cream & Cosmos",
    industry: "Food & Beverage",
    summary: "Naming, visual identity, and launch strategy for a tier-3 market café built to feel bigger than its city.",
    metric: "4.8k",
    metricLabel: "followers pre-launch",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80",
    content: [
      { body: ["Cream & Cosmos was designed to introduce a premium coffee and aesthetic dining experience to a tier-3 market. The goal was to build aspiration while maintaining accessibility for local residents."] },
      { heading: "The challenge", body: ["Launching a high-concept, premium café in a price-sensitive market with established traditional competitors. The target audience had to be convinced that a premium local experience was worth their time and money."] },
      { heading: "Our approach", body: ["We designed a complete brand identity—naming the café Cream & Cosmos to evoke a sense of premium escape. We created an aesthetic based on cosmic-retro themes, built a teaser social media campaign focusing on sneak peeks and menu development, and ran a hyper-local influencer outreach program before the grand opening."] },
      { heading: "The results", body: ["The pre-launch buzz generated 4.8k followers before the doors even opened. On launch day, the café was completely sold out, and it has since become the most Instagrammed spot in the region."] }
    ]
  },
  {
    id: "interior-studio-growth",
    client: "A Boutique Interior Studio",
    industry: "Interior Design",
    summary:
      "A hook library and production system that turned a quiet portfolio account into a lead-generating channel.",
    metric: "3.5x",
    metricLabel: "inbound client enquiries",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80",
    content: [
      { body: ["A boutique interior design studio had an amazing portfolio but a quiet Instagram account that wasn't driving any business."] },
      { heading: "The challenge", body: ["The studio relied purely on referrals, which made their revenue stream inconsistent. Their social media was a static grid of completed project images with no storytelling or educational value."] },
      { heading: "Our approach", body: ["We created a custom 'hook library' tailored to interior design clients (e.g., 'The one layout mistake that makes small living rooms look smaller'). We built a streamlined video production system that allowed the designers to shoot quick behind-the-scenes clips of ongoing sites without disrupting their workflow, and implemented a content structure that prioritized process over final reveals."] },
      { heading: "The results", body: ["Inbound enquiries rose by 3.5x within four months. Social media was transformed from a passive gallery into their primary acquisition channel, bringing in high-value residential projects consistently."] }
    ]
  },
  {
    id: "fitness-creator-scaleup",
    client: "A Fitness Content Creator",
    industry: "Fitness",
    summary:
      "Scripted Reels, a monetisation roadmap, and a posting cadence that took a personal page into a real brand.",
    metric: "+180%",
    metricLabel: "engagement rate",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
    content: [
      { body: ["A passionate fitness creator wanted to transition from sharing workout selfies to running a professional coaching brand."] },
      { heading: "The challenge", body: ["High competition in the fitness niche meant generic workout videos got lost in the noise. Monetization was non-existent as there was no clear funnel or product offering."] },
      { heading: "Our approach", body: ["We created scripted short-form Reels that addressed specific audience pain points (e.g., posture correction, busy-schedule nutrition). We established a strict, algorithm-optimized posting cadence and designed a monetization roadmap that introduced a low-ticket newsletter and high-ticket personalized training cohorts."] },
      { heading: "The results", body: ["Average engagement rate increased by 180%. The creator successfully launched their first paid cohort, selling out all 50 slots in less than 48 hours and establishing a reliable monthly recurring revenue stream."] }
    ]
  },
  {
    id: "saas-mvp-launch",
    client: "Auto-Poster SaaS",
    industry: "SaaS",
    summary:
      "System design and a full-stack build — Next.js, NestJS, and BullMQ — taken from architecture doc to working MVP.",
    metric: "6 wks",
    metricLabel: "idea to MVP",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    content: [
      { body: ["A SaaS founder wanted to build an automated social media posting tool but lacked a technical team to execute the build quickly."] },
      { heading: "The challenge", body: ["Time-to-market was critical. The architecture had to support complex queue management, post scheduling, and external social API integrations, all while remaining highly scalable."] },
      { heading: "Our approach", body: ["We mapped out the complete system architecture and built the full-stack MVP in record time. We used Next.js for the responsive web dashboard, NestJS for a robust backend API, and BullMQ to handle background scheduling queues and rate-limited API calls to platforms like X, LinkedIn, and Facebook."] },
      { heading: "The results", body: ["The working MVP was delivered in exactly 6 weeks, going from an architecture doc to a production-ready application. The client successfully launched their closed beta on schedule and onboarded their first 100 paying users."] }
    ]
  },
  {
    id: "d2c-meta-scaling",
    client: "A Lean D2C Brand",
    industry: "D2C",
    summary:
      "Creative testing cadence and budget restructuring across META that cut acquisition cost without cutting spend.",
    metric: "-34%",
    metricLabel: "cost per acquisition",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    content: [
      { body: ["A fast-growing D2C brand was hitting a ceiling with their Meta ad campaigns, experiencing rising CAC as they tried to scale."] },
      { heading: "The challenge", body: ["Ad fatigue was high, and the account structure was cluttered with dozens of small, overlapping interest-based audiences that competed with each other."] },
      { heading: "Our approach", body: ["We restructured the account, moving from hyper-targeted interest groups to a broad-targeting model. We implemented a systematic creative testing cadence—shipping 15-20 rapid-fire variations (static, UGC, hook swaps) weekly to let the algorithm find the best matches. We also optimized the budget split: 70% to scaling winners, 20% to creative testing, and 10% to retargeting/experimental formats."] },
      { heading: "The results", body: ["Cost per acquisition (CPA) decreased by 34% within 60 days, allowing the brand to scale its monthly budget profitably by 2.5x."] }
    ]
  }
];

/* ============ CAREERS ============ */
export interface Role {
  title: string;
  type: string;
  location: string;
}

export const openRoles: Role[] = [
  { title: "Frontend Developer", type: "Full-time", location: "Remote" },
  { title: "Social Media Strategist", type: "Full-time", location: "Remote" },
  { title: "UI/UX Designer", type: "Contract", location: "Remote" },
];

/* ============ CONTACT ============ */
export const contactInfo = [
  { icon: "Mail", label: "Email Us", value: "hello@ravenclaw.com", color: "#631DFE" },
  { icon: "Phone", label: "Call Us", value: "+91 80100 49620", color: "#A7069B" },
  { icon: "MapPin", label: "Location", value: "India", color: "#EA9D12" },
];

export const socialLinks = [
  { name: "Facebook", color: "#1877F2", href: "https://www.facebook.com/" },
  { name: "Instagram", color: "#E4405F", href: "https://www.instagram.com/" },
  { name: "LinkedIn", color: "#0A66C2", href: "https://www.linkedin.com/" },
  { name: "YouTube", color: "#FF0000", href: "https://youtube.com/" },
  { name: "Twitter", color: "#d5dee6", href: "https://twitter.com/" },
  { name: "Threads", color: "#e8dbdb", href: "https://www.threads.com/" },
];

export const WHATSAPP_LINK =
  "https://wa.me/918010049620?text=Hello%20Ravenclaw%2C%20I%20would%20like%20to%20discuss%20a%20project";

// Calendly scheduling link. Set NEXT_PUBLIC_CALENDLY_URL in your env to your own
// event link (e.g. https://calendly.com/your-name/30min). Falls back to a demo
// link so the widget renders during development.
export const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ||
  "https://calendly.com/digitalravenclaw/30min";

export const BRAND_GRADIENT =
  "linear-gradient(135deg, #EA9D12, #D96016, #CC2829, #A7069B, #631DFE, #5A5DFE)";
