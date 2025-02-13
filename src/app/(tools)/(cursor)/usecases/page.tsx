import { UsecasesPage } from "@/features/usecases/page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "유스케이스 프롬프트 생성기",
  description: "유스케이스 작성을 위한 프롬프트 생성기",
};

export default function Page() {
  return <UsecasesPage />;
}
