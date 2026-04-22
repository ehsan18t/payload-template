export type ExpertiseIconKey =
  | "network"
  | "layout-dashboard"
  | "terminal"
  | "smartphone"
  | "server-crash";

export type Project = {
  title: string;
  desc: string;
  tags: string[];
  metric: string;
};

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  initials: string;
};

export type ExpertiseItem = {
  id: string;
  title: string;
  desc: string;
  icon: ExpertiseIconKey;
  featured?: boolean;
};

export const TECHNOLOGIES: string[] = [
  "React",
  "Next.js",
  "SvelteKit",
  "Astro",
  "NestJS",
  "Express",
  "Django",
  "Tauri",
  "Rust",
  "Kotlin",
  "TypeScript",
  "PostgreSQL"
];

export const PROJECTS: Project[] = [
  {
    title: "Fintech Trading Dashboard",
    desc: "A high-performance trading interface built with React and Rust WebAssembly, handling thousands of real-time market events per second without dropping frames.",
    tags: ["React", "Rust", "WebSockets", "WASM"],
    metric: "Latency reduced by 40ms"
  },
  {
    title: "Global Logistics Platform",
    desc: "End-to-end supply chain management system with a Next.js frontend and a highly resilient NestJS microservices architecture on the backend.",
    tags: ["Next.js", "NestJS", "PostgreSQL", "Docker"],
    metric: "Scales to 5M+ daily requests"
  },
  {
    title: "CreatorSync Mobile App",
    desc: "Native Android application built in Kotlin featuring advanced localized video processing and seamless hardware integration.",
    tags: ["Android", "Kotlin", "FFmpeg", "SQLite"],
    metric: "4.9/5 Average App Store Rating"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "WebCrafts didn't just build our app; they elevated our entire product strategy. Their understanding of deep technical architecture and UI design is incredibly rare.",
    author: "Sarah Jenkins",
    role: "CTO, FinFlow",
    initials: "SJ"
  },
  {
    quote:
      "The desktop application they delivered using Tauri is blazingly fast and uses a fraction of the memory of our old Electron app. Absolute game-changers.",
    author: "Marcus Chen",
    role: "Lead Product, NodeLogix",
    initials: "MC"
  },
  {
    quote:
      "Working with them feels like having an elite, in-house engineering team. They are proactive, transparent, and ship code that just works flawlessly from day one.",
    author: "Elena Rodriguez",
    role: "Founder, CreatorSync",
    initials: "ER"
  }
];

export const EXPERTISE: ExpertiseItem[] = [
  {
    id: "01",
    title: "System Architecture & SRS",
    desc: "We don't just write code; we engineer scalable systems. Every project is backed by comprehensive Software Requirements Specifications (SRS), micro-architecture design, advanced caching strategies, and robust background job offloading to guarantee absolute peak performance and reliability.",
    icon: "network",
    featured: true
  },
  {
    id: "02",
    title: "Web Ecosystems",
    desc: "We build immersive, highly-interactive web applications using React, Next.js, and SvelteKit. Focused on accessibility and raw performance.",
    icon: "layout-dashboard"
  },
  {
    id: "03",
    title: "Systems & Desktop",
    desc: "Leveraging Rust and Tauri to ship lightweight, blazingly fast cross-platform desktop software that feels native to the OS.",
    icon: "terminal"
  },
  {
    id: "04",
    title: "Mobile Native",
    desc: "Crafting fluid mobile experiences for Android with Kotlin, ensuring deep hardware integration and uncompromising UX.",
    icon: "smartphone"
  },
  {
    id: "05",
    title: "Backend Architecture",
    desc: "Designing resilient microservices and APIs with NestJS, Django, and Rust. Built to scale from day one.",
    icon: "server-crash"
  }
];
