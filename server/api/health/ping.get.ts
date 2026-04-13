import { createClient } from "@supabase/supabase-js";

export default defineEventHandler(async (event) => {
  // Verify the Vercel cron secret to block unauthorized access.
  // Set CRON_SECRET in your Vercel environment variables — Vercel will
  // automatically send it as "Authorization: Bearer <CRON_SECRET>".
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const authHeader = getHeader(event, "authorization");
    if (authHeader !== `Bearer ${cronSecret}`) {
      throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
    }
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw createError({
      statusCode: 500,
      statusMessage: "Supabase credentials are not configured",
    });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  // Lightweight query — just enough to wake the database
  const { error } = await supabase.from("audios").select("id").limit(1);

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Supabase ping failed: ${error.message}`,
    });
  }

  return {
    status: "ok",
    message: "Supabase is alive",
    timestamp: new Date().toISOString(),
  };
});
