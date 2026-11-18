import { getPublishedWhitepapers } from "@/lib/admin/queries";
import { toDateOnly } from "@/lib/seo/dates";
import { WhitepapersExperience, type PublicWhitepaper } from "./WhitepapersExperience";

export const dynamic = "force-dynamic";

export default async function WhitepapersPage() {
  const rows = await getPublishedWhitepapers();
  // Normalise the Postgres `date` on the server so SSR and hydration agree.
  const whitepapers: PublicWhitepaper[] = rows.map((row) => ({
    ...row,
    published_date: toDateOnly(row.published_date),
  }));

  return <WhitepapersExperience whitepapers={whitepapers} />;
}
