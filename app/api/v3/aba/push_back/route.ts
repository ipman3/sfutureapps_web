import { NextResponse } from "next/server";
import { supabaseServer } from "@/libs/supabase/server";

export const dynamic = "force-dynamic"; // defaults to auto

export async function POST(req: Request) {
  const db = supabaseServer();
  try {
    const ob = await req.json();

    // const formData = await req.formData();
    // const ob = Object.fromEntries(formData);
    const content = JSON.stringify({ ...ob, created_at: new Date() });

    const { data: pushback, error } = await db
      .from("pushback")
      .insert([{ content }])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return NextResponse.json({ status: 1, message: pushback });
  } catch (error: any) {
    return NextResponse.json({ status: 0, message: error.message });
  }
}
