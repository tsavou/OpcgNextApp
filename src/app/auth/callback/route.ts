import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { type EmailOtpType } from "@supabase/supabase-js";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  
  // Cas 1 : Récupération des paramètres pour le flux PKCE (OAuth, Confirm Email)
  const code = searchParams.get("code");
  
  // Cas 2 : Récupération des paramètres pour le flux OTP (Magic Link, Reset Password)
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  
  // URL de redirection après succès
  const next = searchParams.get("next") ?? "/";
  const redirectTo = request.headers.get("x-forwarded-host") 
    ? `https://${request.headers.get("x-forwarded-host")}${next}`
    : `${origin}${next}`;

  const supabase = await createClient();

  // 1. Gestion du Code (PKCE)
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(redirectTo);
    }
  }

  // 2. Gestion du Token Hash (OTP / Magic Link)
  if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });
    if (!error) {
      return NextResponse.redirect(redirectTo);
    }
  }

  // En cas d'erreur
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}