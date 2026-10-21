/* Academic Intelligence Supabase configuration.
 * This uses the Supabase publishable key, which is intended for client-side use.
 * Never put a service_role key or secret key in this file.
 */
window.academicSupabase = null;

const SUPABASE_URL = "https://eizdrpswzcakvqqlqspy.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_kaUY1q_ewdPjI4jD9CAfbA_3jqB8ws_";

if (window.supabase && SUPABASE_URL.startsWith("https://") && SUPABASE_PUBLISHABLE_KEY.startsWith("sb_publishable_")) {
  window.academicSupabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
  });
}
