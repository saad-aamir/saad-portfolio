export interface Post {
  title: string;
  excerpt: string;
  date: string;       // ISO: "2025-05-10"
  readTime: string;   // "5 min read"
  tag: string;        // single topic label, e.g. "AI Safety"
  href: string;       // full Substack URL
}

export const posts: Post[] = [
  {
    title: "Why nice guys finish first (sometimes)",
    excerpt: "The Prisoner's Dilemma, Axelrod's tournament, and how cooperation actually wins.",
    date: "2026-05-23",
    readTime: "5 min read",
    tag: "Game Theory",
    href: "https://beginnersmindbysaad.substack.com/p/why-nice-guys-finish-first-sometimes",
  },
];

export const substackUrl = "https://beginnersmindbysaad.substack.com";
