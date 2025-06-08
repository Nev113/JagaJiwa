import { NextResponse } from "next/server";

export async function GET() {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return NextResponse.json({ message: "Hello, world!" });
  } catch (error) {
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
