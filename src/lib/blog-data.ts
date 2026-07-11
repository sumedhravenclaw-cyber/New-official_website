/*
 * NOTE: This is a verbatim extract, not a separate file in your repo.
 * In the actual codebase, everything below lives inside src/lib/site-data.ts
 * (lines 481-619), mixed in with the case-study data. Pulled out here
 * just so you have the blog-only pieces in one place.
 */

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
