import { IAPage } from "@/features/ia/page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "IA 프롬프트 생성기",
  description: "Information Architecture 프롬프트 생성기",
};

export default function Page() {
  return <IAPage />;
}
