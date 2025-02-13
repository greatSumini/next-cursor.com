import { DesignPage } from "@/features/design/page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "디자인 프롬프트 생성기",
  description: "UI/UX 디자인 가이드 작성을 위한 프롬프트 생성기",
};

export default function Page() {
  return <DesignPage />;
}
