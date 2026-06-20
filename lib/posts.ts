export interface Post {
  title: string;
  excerpt: string;
  date: string;       // ISO: "2025-05-10"
  readTime: string;   // "5 min read"
  tag: string;        // single topic label, e.g. "AI Safety"
  href: string;       // full Substack URL
  demoHref?: string;  // optional interactive demo URL
  githubHref?: string; // optional GitHub repo URL
}

export const posts: Post[] = [
  {
    title: "Llama folds when you sound vague. Qwen folds when you sound specific.",
    excerpt: "What I learned about LLM evals by getting fooled three times in a row.",
    date: "2026-06-18",
    readTime: "9 min read",
    tag: "AI Safety",
    href: "https://beginnersmindbysaad.substack.com/p/llama-folds-when-you-sound-vague",
    githubHref: "https://github.com/saad-aamir/sycophancy-evals",
  },
  {
    title: "Tools should return data, Language models should return language",
    excerpt: "How I stopped trying to make my MCP tool write emails and let Claude do its job.",
    date: "2026-06-11",
    readTime: "5 min read",
    tag: "MCP",
    href: "https://beginnersmindbysaad.substack.com/p/tools-should-return-data-language",
    githubHref: "https://github.com/saad-aamir/darkmatter-copilot",
  },
  {
    title: "Why 23 strangers in a room are more interesting than they look",
    excerpt: "Walk into a room with 22 other people. There's a better than 50% chance two of you share a birthday. That sounds wrong.",
    date: "2026-05-27",
    readTime: "5 min read",
    tag: "Probability",
    href: "https://beginnersmindbysaad.substack.com/p/why-23-strangers-in-a-room-are-more",
    demoHref: "https://saad-aamir.github.io/birthday-paradox/",
  },
  {
    title: "Why nice guys finish first (sometimes)",
    excerpt: "The Prisoner's Dilemma, Axelrod's tournament, and how cooperation actually wins.",
    date: "2026-05-23",
    readTime: "5 min read",
    tag: "Game Theory",
    href: "https://beginnersmindbysaad.substack.com/p/why-nice-guys-finish-first-sometimes",
    demoHref: "https://saad-aamir.github.io/beginners-mind-prisoners-dilemma/",
  },
];

export const substackUrl = "https://beginnersmindbysaad.substack.com";
