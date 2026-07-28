export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  location: string;
  email: string;
  linkedin: string;
  photo: string;
  bio: string[];
};

// NOTE: location/email fields marked "TODO" below are placeholders pending
// confirmation — see the "Individual team member pages" plan for details.
export const TEAM: Record<"grant" | "kaye" | "mel", TeamMember> = {
  grant: {
    slug: "grant",
    name: "Grant Tate",
    role: "CEO & Founder, BBTx Consulting",
    location: "Charlottesville, VA", // TODO: confirm
    email: "grant@bbtx.ai",
    linkedin: "https://linkedin.com/in/granttate",
    photo: "/grantt.jpg",
    bio: [
      "Grant Tate is the CEO of Bridge Business Transformations, a coach, consultant, and author who helps leaders thrive in complex environments.",
      "He explores how AI is shaping people, organizations, and society, and how leaders can respond with clarity.",
      "He wrote Hand on the Shoulder, sharing lessons from his life and career on leadership and personal growth.",
    ],
  },
  kaye: {
    slug: "kaye",
    name: "Kaye Monroe",
    role: "Executive Coach & Community Builder",
    location: "Charlottesville, VA",
    email: "kaye@bbtx.com", // TODO: confirm real address — only one not on @bbtx.ai
    linkedin: "https://linkedin.com/in/kayemonroe",
    photo: "/about/kaye.jpeg",
    bio: [
      "Kaye Monroe leads KDM Coaching and Associates, supporting leaders and individuals as they define goals and follow through.",
      "She is a founder and key force behind the Minority Business Council, building community and opportunity for minority entrepreneurs.",
      "She's known in the Charlottesville region for her vision, diplomacy, and steady leadership.",
    ],
  },
  mel: {
    slug: "mel",
    name: "Mel Angelo Cortes",
    role: "Operations & Execution",
    location: "", // TODO: confirm — no location on file
    email: "mel@bbtx.ai",
    linkedin: "https://linkedin.com/in/melangelocortes",
    photo: "/about/MEL.png",
    bio: [
      "Mel Angelo Cortes supports BBTx AI across operations, systems, and execution, helping turn ideas into clear deliverables.",
      "He builds the workflows, content, and digital assets that support BBTx AI's programs and community.",
      "He focuses on making AI practical for leaders through structured implementation and simple, usable guidance.",
    ],
  },
};
