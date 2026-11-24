import { Fraunces } from "next/font/google";

// The offering pages set their headings in a serif, like the engagements popup. Loaded here so only
// these pages carry it.
export const serif = Fraunces({ subsets: ["latin"], weight: ["400", "500"], display: "swap" });
