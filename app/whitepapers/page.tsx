import { getPublishedWhitepapers } from "@/lib/admin/queries";
import { WhitepapersExperience, type PublicWhitepaper } from "./WhitepapersExperience";

export const dynamic = "force-dynamic";

export default async function WhitepapersPage() {
  const whitepapers: PublicWhitepaper[] = await getPublishedWhitepapers();

  return <WhitepapersExperience whitepapers={whitepapers} />;
}
