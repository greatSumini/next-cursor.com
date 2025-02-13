import { PrdPage } from "@/features/prd/page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PRD 프롬프트 생성기",
  description: "PRD 프롬프트 생성기",
};

export default function PRDPage() {
  return <PrdPage />;
}
