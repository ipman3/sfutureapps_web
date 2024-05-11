import { NextResponse } from "next/server";
export const dynamic = "force-dynamic"; // defaults to auto
export async function POST(req: Request) {
  const data = await req.json();

  if (!data || typeof data !== "object") {
    return NextResponse.json({ status: 0, message: "Invalid input" });
  }

  const arr = Object.entries(data);
  const obj: any = {};
  arr.map(([key, value]) => {
    obj[key] = Buffer.from(value as string, "utf-8").toString("base64");
  });

  // const base64EncodedHash = Buffer.from(str, "utf-8").toString("base64");
  return NextResponse.json({ status: 1, data: obj });
}
