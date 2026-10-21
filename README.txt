ACADEMIC INTELLIGENCE — GEMINI AI INTEGRATION (SECURE BACKEND)

This adds Gemini topic analysis and an evidence-grounded AI Study Assistant while preserving the existing vanilla HTML/CSS/JS and Supabase workflow. Gemini API calls happen only inside Supabase Edge Functions. The Gemini API key is NEVER put in browser files.

SETUP ONCE
1. Install Supabase CLI and sign in: https://supabase.com/docs/guides/cli
2. In this folder, open a terminal at Academic-Intelligence.
3. Link your project: supabase link --project-ref eizdrpswzcakvqqlqspy
4. Create a Gemini API key in Google AI Studio: https://aistudio.google.com/apikey
5. Set it as a server-side secret (do not put it in supabase-config.js or send it in chat): supabase secrets set GEMINI_API_KEY=YOUR_KEY
6. Deploy both functions: supabase functions deploy gemini-topic-analysis and supabase functions deploy gemini-study-assistant
7. Run/deploy the static website as before, sign in as admin, extract text from question papers/materials, then use “Analyze with Gemini AI” or open “AI Study Assistant” and ask a question.

SECURITY
- The Edge Function requires a valid signed-in Supabase user and uses that user's JWT for the academic database access check, preserving RLS. It does not use a service-role key.
- Keep GEMINI_API_KEY only in Supabase Edge Function secrets. Never commit it or expose it in frontend JS.
- Free Gemini API access has model-specific quotas/rate limits and can change. Check Google AI Studio quota/pricing; HTTP 429 means quota/rate limit reached.
- The free tier may use submitted content to improve Google products. Review Google's current terms before sending sensitive course content.

HOW IT WORKS
- AI Study Assistant reads extracted pages already stored in document_pages and returns answers with document/page source references. It requires extracted text and a signed-in account.
- Reads page text already stored in document_pages through the signed-in browser client.
- Sends bounded page excerpts to the Edge Function; Gemini identifies meaningful topics and maps its claims back to supplied paper/material filename and page evidence.
- The results are displayed in the existing Topic Analysis view. This version does not persist the AI analysis result as a separate database record; rerun analysis when needed.
- Validate all AI topic/evidence results against the original PDFs. AI may miss or misclassify concepts and can only cite pages supplied in the request.

TROUBLESHOOTING
- “GEMINI_API_KEY is not configured”: run the secrets command, then deploy/retry.
- “Admin database access check failed”: check courses SELECT RLS for the registered admin.
- 401: sign in again.
- 429: wait, reduce pages, or check your Google AI Studio quota.
- CORS is configured for browser access; production deployments should restrict allowed origins to your exact site domain.


GEMINI MODEL UPDATE
The Edge Functions use models/gemini-3.8-flash. After replacing the project files, deploy both functions from the Academic-Intelligence directory:
  npx supabase functions deploy gemini-study-assistant
  npx supabase functions deploy gemini-topic-analysis
Then test the AI Study Assistant again. Keep GEMINI_API_KEY configured as a Supabase Edge Function secret; never place it in browser code.
