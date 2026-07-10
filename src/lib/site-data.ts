import {
  Code2,
  Sigma,
  Paintbrush,
  BarChart3,
  Bot,
  Search,
  Lightbulb,
  TestTube,
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
  },
  {
    slug: "digital-marketing",
    icon: BarChart3,
    title: "Digital Marketing",
    desc: "Strategies that increase visibility and engagement.",
    color: "#EA9D12",
    bg: "linear-gradient(135deg, #EA9D1215, #D9601608)",
    border: "#EA9D1230",
    longDesc:
      "We plan and run data-backed campaigns across search, social and email so the right people find you — and keep coming back.",
    features: [
      "SEO & content strategy",
      "Paid social & search campaigns",
      "Email & lifecycle marketing",
      "Monthly reporting & insights",
    ],
    process: [
      { title: "Audit", desc: "Baseline your current traffic, funnels, and channels." },
      { title: "Campaign", desc: "Launch targeted, budgeted campaigns across channels." },
      { title: "Optimize", desc: "Monthly reporting with clear, actionable next steps." },
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
    slug: "fintech-website",
    title: "Fintech Website",
    category: "Websites",
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
    category: "Websites",
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
    category: "UI/UX",
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
    category: "Marketing",
    type: "Digital Marketing",
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
    category: "Websites",
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

export const portfolioCategories = ["All", "Websites", "Branding", "UI/UX", "Marketing"];

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
    icon: TestTube,
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
  { icon: Users, value: "150+", label: "Happy Clients" },
  { icon: Trophy, value: "200+", label: "Projects Completed" },
  { icon: Star, value: "5+", label: "Years Experience" },
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
    label: "Creative Thinking",
    color: "#EA9D12",
    desc: "We approach every brief like it's the first one — no recycled templates, no shortcuts on ideas.",
  },
  {
    label: "Innovative Solutions",
    color: "#5E9929",
    desc: "We stay close to new tools and techniques so your project benefits from what's actually working today.",
  },
  {
    label: "Quality & Reliability",
    color: "#5B9EFE",
    desc: "Deadlines are commitments. What we ship is tested, polished, and built to last.",
  },
  {
    label: "Client First Approach",
    color: "#631DFE",
    desc: "Your goals set the direction. We're transparent about tradeoffs and honest about what will and won't work.",
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
    desc: "Help businesses grow with digital experiences that are as effective as they are memorable.",
    color: "#631DFE",
  },
  {
    icon: Eye,
    title: "Our Vision",
    desc: "To be the studio businesses trust with the digital work that actually moves the needle.",
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
  },
  {
    id: "cream-and-cosmos",
    client: "Cream & Cosmos",
    industry: "Food & Beverage",
    summary: "Naming, visual identity, and launch strategy for a tier-3 market café built to feel bigger than its city.",
    metric: "4.8k",
    metricLabel: "followers pre-launch",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80",
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
  },
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

export const BRAND_GRADIENT =
  "linear-gradient(135deg, #EA9D12, #D96016, #CC2829, #A7069B, #631DFE, #5A5DFE)";
