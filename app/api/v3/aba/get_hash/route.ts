import { NextResponse } from "next/server";
import crypto from "crypto";

export const dynamic = "force-dynamic"; // defaults to auto

export async function POST(req: Request) {
  const { aba_key, hash_str } = await req.json();

  if (!aba_key || !hash_str) {
    return NextResponse.json({ status: 0, error: "Missing parameters" });
  }

  // Calculate HMAC-SHA512 hash
  const hmac = crypto.createHmac("sha512", aba_key);
  hmac.update(hash_str);
  const hmacDigest = hmac.digest();

  // Base64 encode the hash
  const base64EncodedHash = hmacDigest.toString("base64");

  return NextResponse.json({ status: 1, data: base64EncodedHash });
}
