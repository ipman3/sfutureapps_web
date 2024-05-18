import { NextResponse } from "next/server";
export const dynamic = "force-dynamic"; // defaults to auto
export async function POST(req: Request) {
  // replace the value below with the Telegram token you receive from @BotFather
  const token = "7195173599:AAEBaZpnGk_n7vs_-OuG2fSn6KjlCAn494s";
  const chatID = -1002028789031; /// Nealika DevOp Team
  //   const chatID = -1002067650868; /// TestingBot group

  try {
    const ob = await req.json();

    const assignee = ob.assignee.login ?? "No Assignee";
    const state = ob.issue.state ?? "-";
    const title = ob.issue.title ?? "-";
    const body = ob.issue.body ?? "-";
    const url = ob.issue.html_url ?? "-";
    const issueID = ob.issue.id ?? "-";
    const message = `New Issue (${issueID})%0A
    → To:: ${assignee}%0A
    → Status:: ${state}%0A
    → Title:: ${title}%0A
    → Describe:: ${body}%0A
    → ${url}`;
    const res_Telegram = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatID}&text=${message}`,
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
