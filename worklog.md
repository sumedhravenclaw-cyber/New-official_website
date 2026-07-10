# RavenClaw Digital Agency Website — Worklog

Project: Building a comprehensive portfolio website for RavenClaw digital agency.
Stack: Next.js 16, TypeScript, Tailwind CSS 4, shadcn/ui, framer-motion, Zustand.
Constraint: Single `/` route only — all "pages" are state-driven views on the home route.

Reference repo: https://github.com/sumedhravenclaw-cyber/official-Website (Vite + React Router)
Images copied from reference repo to /public/images/ and fonts to /public/fonts/.

---
Task ID: 1
Agent: main
Task: Explore project structure and fetch reference repo images/components

Work Log:
- Cloned reference repo to /tmp/ravenclaw-ref
- Read all key components: Hero, About, WhyChooseUs, Services, Portfolio, Testimonials, Process, Contact, Footer, Navbar, detail pages, blog/case-studies/policy pages
- Read index.css design system (CSS variables, theme, utility classes)
- Copied images (bird.png, homeBird.png, PhoenixWing.png, etc.) to /public/images/
- Copied Garet fonts to /public/fonts/

Stage Summary:
- Full understanding of design language: brand gradient (#EA9D12→#631DFE), Garet font, light/dark theme via CSS vars
- Data structures understood: services (5), projects (6), testimonials (5), process (6 steps), blog posts (6), case studies (6)
- Navigation model: home sections + detail views — will implement as state-driven SPA on single route

---
Task ID: 2-b
Agent: full-stack-developer
Task: Build careers, privacy, terms, and refund policy views

Work Log:
- Read worklog.md, site-data.ts (openRoles), nav-store.ts, use-scroll-reveal.ts and the existing service-detail.tsx to understand the shared view pattern
- Created src/components/site/views/careers-page.tsx (CareersPage, green #5E9929, Sparkles icon)
  - Hero with tinted bg #5E99290C, icon circle, eyebrow "Last updated: July 2026", h1 "Careers", intro "Build the internet with us."
  - Body: intro paragraph + 3 sections (Why Work With Us, Our Culture, How to Apply) using specified copy
  - Open Roles section: sm:grid-cols-2 of openRoles with role title, Briefcase (type), MapPin (location), green-tinted cards
  - WhatsApp CTA button "Chat with us" linking to wa.me/918010049620?text=Hello%20Ravenclaw...
- Created src/components/site/views/privacy-page.tsx (PrivacyPage, violet #631DFE, ShieldCheck icon)
  - Hero with #631DFE0C bg, violet eyebrow, h1 "Privacy Policy", intro "How we collect, use, and protect your information."
  - 7 body sections (Information We Collect, How We Use, Information Sharing, Data Security, Cookies, Your Rights, Contact Us) each in section-reveal with h2 + p
- Created src/components/site/views/terms-page.tsx (TermsPage, magenta #A7069B, FileText icon)
  - Hero with #A7069B0C bg, magenta eyebrow, h1 "Terms & Conditions", intro "The terms governing your use of our services."
  - 8 body sections (Acceptance of Terms, Services, Client Responsibilities, Payment, Intellectual Property, Limitation of Liability, Termination, Contact Us)
- Created src/components/site/views/refund-page.tsx (RefundPage, golden #EA9D12, RotateCcw icon)
  - Hero with #EA9D120C bg, golden eyebrow, h1 "Refund Policy", intro "Our approach to refunds and cancellations."
  - 6 body sections (Project Deposits, Milestone Payments, Subscription Services, Digital Products, How to Request, Processing Time)
- All four files: "use client", useScrollReveal([]), useEffect scroll-to-top, ArrowLeft back button calling navigate("home", { scrollTarget: "footer" }), body wrapped in max-w-3xl mx-auto px-6 mt-14 pb-20
- Ran `bun run lint` — the 4 new files produce zero lint errors (remaining errors are pre-existing in navbar.tsx / use-scroll-reveal.ts from other tasks)

Stage Summary:
- 4 detail views delivered: CareersPage, PrivacyPage, TermsPage, RefundPage
- Consistent structure across all 4: hero (tinted bg, icon circle with color+30 border, color eyebrow, h1, intro) + body (intro + section-reveal blocks with h2/p)
- All pages mobile-first responsive, dark-mode compatible via CSS variables, use only Tailwind + custom utility classes
- Color themes used: green #5E9929, violet #631DFE, magenta #A7069B, golden #EA9D12 — no indigo/blue
- All components ready to be wired into the home view router (page.tsx) by a later task

---
Task ID: 2-a
Agent: full-stack-developer
Task: Build blog-page and case-studies-page views

Work Log:
- Read existing context: worklog.md, site-data.ts (blogCategories, blogPosts, industries, caseStudies exports), nav-store.ts (useNav + navigate signature), use-scroll-reveal.ts, globals.css (utility classes), and existing detail views (service-detail.tsx, portfolio-detail.tsx) for style/pattern consistency.
- Verified toast infra: shadcn `Toaster` is rendered in layout.tsx and `toast` function is exported from `@/hooks/use-toast` (callable outside React components).
- Created `/home/z/my-project/src/components/site/views/blog-page.tsx`:
  * `"use client"` directive, named export `BlogPage`.
  * `<main className="min-h-screen bg-surface pt-32 pb-24">` wrapper with `max-w-7xl mx-auto px-6` inner container.
  * Hero: eyebrow "The Journal" (text-golden, uppercase, tracking-widest), h1 "Ideas worth stealing" with "stealing" in `.text-gradient`, subtitle paragraph.
  * Category pill filter: `useState<BlogCategory>("All")`. Active = `bg-violet text-white border-violet border-2`, inactive = `bg-card text-ink border-black/10 hover:border-golden border-2`. `aria-pressed` for a11y.
  * Featured spotlight (only when activeCategory === "All" && featured post exists): `md:grid-cols-2` card, image left (`aspect-[16/10] md:aspect-auto md:min-h-[420px]`, group-hover:scale-105), content right with violet "Featured · {category}" badge, hover:text-gradient title, excerpt, author + Clock icon readTime.
  * Post grid `sm:grid-cols-2 lg:grid-cols-3 gap-8`. Each card: `aspect-[16/10]` image with group-hover:scale-105, golden category, hover:text-gradient line-clamp-2 title, line-clamp-2 excerpt, date + "Read" with ArrowRight (translate-x on hover). Cards wrapped in `<button>` calling `toast({ title: "Coming soon", ... })`. Empty-state message when filter has no posts.
  * Featured post excluded from grid when spotlight is visible (avoids duplication). When filtering by a specific category that includes the featured post, it still shows in the grid.
  * Newsletter CTA: `bg-charcoal` rounded card with `text-snow` heading + subtitle, email input (`bg-black/10 border border-white/15 text-snow placeholder-muted`) + Subscribe button (`bg-golden text-charcoal`). Form submit fires a success toast and clears the input.
  * `useScrollReveal([])` + `useEffect(() => window.scrollTo(...))` on mount. All images use `loading="lazy"`.
- Created `/home/z/my-project/src/components/site/views/case-studies-page.tsx`:
  * `"use client"` directive, named export `CaseStudiesPage`.
  * Same `<main>` wrapper and inner container.
  * Hero: eyebrow "Case Studies", h1 "Real brands, real numbers" with "real numbers" in `.text-gradient`, subtitle.
  * Industry pill filter: `useState<Industry>("All")`, same pill styling as blog.
  * Grid `sm:grid-cols-2 lg:grid-cols-3 gap-8`. Each card: `aspect-[16/10]` image with absolute industry badge (`top-4 left-4 bg-card text-ink rounded-full px-3 py-1 text-xs font-semibold`), hover:text-gradient client name, line-clamp-2 summary, metric row (golden TrendingUp icon + bold metric + small metricLabel), "View" + ArrowRight. Cards wrapped in `<button>` with toast on click.
  * CTA: `bg-charcoal` rounded card with h3 "Want results like these for your brand?", subtitle, "Start a project" button calling `navigate("home", { scrollTarget: "contact" })` with `bg-golden text-charcoal`.
  * `useScrollReveal([])` + `window.scrollTo({ top: 0, behavior: "smooth" })` in `useEffect([])`. All images lazy-loaded.
- Ran `bun run lint` — the two pre-existing errors are in `navbar.tsx` (set-state-in-effect) and `use-scroll-reveal.ts` (unused eslint-disable warning), neither of which are in scope for this task. Both new view files (blog-page.tsx, case-studies-page.tsx) pass lint with zero errors or warnings.
- Verified dev server compiles cleanly (dev.log shows successful `✓ Compiled` lines with no errors after file creation).

Stage Summary:
- Two new view components added: `BlogPage` and `CaseStudiesPage`, both `"use client"` named exports under `src/components/site/views/`.
- Both follow the established design language: brand-gradient text, golden eyebrows, violet active pill state, charcoal/snow inverted CTA cards, hover:text-gradient titles, group-hover image zoom, section-reveal scroll animations.
- Fully responsive (mobile-first, sm/md/lg breakpoints), accessible (semantic main/header/section, aria-pressed on filter buttons, alt text on all images, lazy-loaded images), and theme-aware (works in light/dark mode via the existing CSS variable system).
- Static post/case-study clicks show a "Coming soon" toast via the shadcn toast pipeline; newsletter subscribe shows a success toast. The case-studies CTA correctly routes back to home with `scrollTarget: "contact"` via the Zustand nav store.
- No new dependencies introduced; only Tailwind utility classes + existing custom utility classes used. No indigo/blue colors.
- Both files lint-clean. Ready for the next agent to wire them into the `useNav` view switch in `src/app/page.tsx`.

---
Task ID: 2 (main build)
Agent: main
Task: Build complete RavenClaw digital agency website

Work Log:
- Built design system in globals.css (RavenClaw brand gradient, CSS variables, light/dark theme, Garet font, utility classes for glass/reveal/card-hover/beyond-clicks animation)
- Created layout.tsx with inline theme script (prevents hydration flash), ThemeProvider, SEO metadata
- Created site-data.ts with all content: 5 services, 6 projects, 5 testimonials, 6 process steps, 6 why-choose features, 4 stats, about values/mission/vision, 6 blog posts, 6 case studies, 3 open roles, contact info, social links
- Created nav-store.ts (Zustand) for state-driven SPA navigation on single / route
- Created use-scroll-reveal.ts hook (IntersectionObserver for scroll reveal + mouse parallax)
- Built Navbar with scroll-spy, mobile menu, More dropdown, theme toggle
- Built Hero section with BeyondClicks framer-motion animation (Campaigns/Clicks/Competition), phoenix background, floating dots
- Built About, WhyChooseUs, Services, Portfolio (with filtering), Testimonials (auto-playing carousel), Process (timeline), Contact sections
- Built Footer with social icons, quick links, services links, newsletter
- Built 9 detail views: service-detail (prev/next nav), portfolio-detail (prev/next), about-page, blog-page (featured + filters), case-studies-page (industry filters), careers-page, privacy/terms/refund policy pages
- Built contact API route (/api/contact) with validation
- Composed page.tsx with ViewRouter switching between home and detail views
- Fixed framer-motion CSS variable color animation warning
- Fixed hydration mismatch with inline theme script

Subagents:
- Task 2-a: Built blog-page and case-studies-page views
- Task 2-b: Built careers, privacy, terms, refund policy views

Verification (Agent Browser):
- All home sections render correctly (Hero, About, WhyChooseUs, Services, Portfolio, Testimonials, Process, Contact)
- Theme toggle works (light <-> dark, VLM confirmed dark mode)
- Service detail navigation works with prev/next and features
- Portfolio filtering works (Branding filter shows only Brand Identity)
- Portfolio detail works with prev/next, highlights, tags
- More dropdown navigates to Blog, Case Studies, Careers
- Blog page shows featured post + category filters + post grid
- About page shows story, mission/vision, values, stats
- Contact form submits successfully ("Message Sent!") and API returns success JSON
- Mobile menu toggle works
- Sticky footer verified (bottom on short and long pages)
- No hydration errors, no console errors, lint passes clean
- VLM confirmed: "clean, modern layout... modern and professional... no broken layouts"

Stage Summary:
- Complete RavenClaw digital agency website built on Next.js 16 single / route
- 29 source files, all features working and verified via Agent Browser
- Responsive, accessible, dark/light theme, scroll animations, parallax, form validation
