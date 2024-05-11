import { supabaseServer } from "@/libs/supabase/server";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // defaults to auto
export async function POST(req: Request) {
  // replace the value below with the Telegram token you receive from @BotFather
  const token = "7195173599:AAEBaZpnGk_n7vs_-OuG2fSn6KjlCAn494s";

  // Create a bot that uses 'polling' to fetch new updates
  const db = supabaseServer();
  try {
    const ob = await req.json();
    const content = JSON.stringify({ ...ob, created_at: new Date() });
    const { data: pushback, error } = await db
      .from("pushback")
      .insert({ content })
      .select()
      .single();

    if (error) throw new Error(error.message);

    const message = `
    =>Repo: ${ob.repository.name}%0A=>Event: ${ob.ref}%0A=>User:  ${ob.commits[0].committer.name}%0A=>Msg: ${ob.commits[0].message}%0A=>Time: ${ob.commits[0].timestamp}`;

    // const chatId = "-4285795043";
    const res_Telegram = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage?chat_id=-1002067650868&text=${message}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    const telData = res_Telegram.json();
    return NextResponse.json({ status: 1, message: "success", data: telData });
  } catch (error: any) {
    return NextResponse.json({ status: 0, message: error.message });
  }
}
