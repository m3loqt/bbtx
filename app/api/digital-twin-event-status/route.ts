import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const EVENT_KEY = "digital_twin_snapshot_event_count";
const EVENT_MAX = parseInt(process.env.EVENT_MAX_GENERATIONS ?? "30", 10);

export async function GET() {
  try {
    const { data } = await supabaseAdmin
      .from("event_counters")
      .select("count")
      .eq("key", EVENT_KEY)
      .maybeSingle();
    const count = (data as { count?: number } | null)?.count ?? 0;
    return Response.json({
      message: `Current Event Usage: ${count} / ${EVENT_MAX} analyses used`,
      current: count,
      max: EVENT_MAX,
      remaining: Math.max(0, EVENT_MAX - count),
      status: count >= EVENT_MAX ? "at_capacity" : "available",
      eventMode: process.env.NEXT_PUBLIC_EVENT_MODE === "true",
    });
  } catch (err) {
    return Response.json(
      { error: "Could not fetch counter", details: String(err) },
      { status: 500 }
    );
  }
}
