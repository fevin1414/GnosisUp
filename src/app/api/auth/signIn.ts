import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../../lib/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  const { email } = req.body as { email: string };

  if (!email) return res.status(400).json({ error: "Email is required" });

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: `${process.env.NEXTAUTH_URL}/dashboard` },
  });

  if (error) return res.status(500).json({ error: error.message });

  return res.status(200).json({ message: "Magic link sent" });
}
