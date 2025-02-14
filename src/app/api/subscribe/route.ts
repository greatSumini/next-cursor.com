import { appendToSheet } from "@/lib/googleSheets";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "이메일이 필요합니다." },
        { status: 400 }
      );
    }

    await appendToSheet(email);

    return NextResponse.json(
      { message: "성공적으로 구독되었습니다." },
      { status: 200 }
    );
  } catch (error) {
    console.error("구독 처리 중 오류 발생:", error);
    return NextResponse.json(
      { error: "구독 처리 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
