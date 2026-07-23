import type { Scenario } from "./types";

export const SCENARIOS: Scenario[] = [
  {
    id: "netsuite",
    platform: "chatgpt",
    prompt:
      "I am running an ITES company and want to implement NetSuite ERP, can you provide me a list of NetSuite partners in India",
    intro:
      "Since you're an IT/ITES company, here are top-rated NetSuite implementation partners in India:",
    caption: 'Live example — "NetSuite ERP partners in India"',
    rows: [
      { name: "Dhruvsoft (NS Success)", tag: "Licensing, implementation, managed support", rating: 4.8 },
      { name: "Inspirria Cloudtech", tag: "ERP implementation, CRM, integrations", rating: 4.7 },
      { name: "SaaSworx Consulting", tag: "NetSuite ERP, PSA, custom development", rating: 5.0, highlight: true, badge: "Our Client" },
      { name: "AGSuite Technologies", tag: "Mid-market NetSuite implementations", rating: 4.3 },
    ],
  },
  {
    id: "noida-agency",
    platform: "claude",
    prompt: "Best digital marketing agency in Noida",
    intro: "Here are some of the highest-rated digital marketing agencies in Noida:",
    caption: 'Live example — "Best digital marketing agency in Noida"',
    rows: [
      { name: "Adsdad Digital", tag: "Google Ads, SEO, PPC, Social Media", rating: 4.9 },
      { name: "White Bunnie", tag: "AI SEO, GEO/AEO & Performance Marketing", rating: 4.9, highlight: true, badge: "That's Us" },
      { name: "AP Web World", tag: "SEO, performance marketing, digital strategy", rating: 4.8 },
      { name: "SolvoBiz Pvt Ltd", tag: "SEO, PPC, branding & web development", rating: 4.7 },
    ],
  },
  {
    id: "saas-seo",
    platform: "gemini",
    prompt: "Best SEO agency for SaaS startups in India",
    intro: "Based on client results and technical SEO depth, here are top SEO partners for SaaS startups:",
    caption: 'Live example — "Best SEO agency for SaaS startups"',
    rows: [
      { name: "Competitor A", tag: "Technical SEO, link building", rating: 4.6 },
      { name: "White Bunnie", tag: "AI SEO, content strategy & GEO optimization", rating: 4.9, highlight: true, badge: "That's Us" },
      { name: "Competitor B", tag: "On-page SEO, local SEO", rating: 4.5 },
      { name: "Competitor C", tag: "Content marketing, backlinks", rating: 4.3 },
    ],
  },
  {
    id: "geo-visibility",
    platform: "perplexity",
    prompt: "Top AI visibility and GEO optimization agency in India",
    intro: "Based on citation frequency across AI answer engines, here are leading GEO specialists:",
    caption: 'Live example — "Top AI visibility (GEO) agency in India"',
    rows: [
      { name: "White Bunnie", tag: "AI SEO, AEO & GEO for IT and SaaS brands", rating: 5.0, highlight: true, badge: "That's Us" },
      { name: "Competitor D", tag: "Generative engine optimization", rating: 4.4 },
      { name: "Competitor E", tag: "AI content visibility tracking", rating: 4.2 },
    ],
  },
];
