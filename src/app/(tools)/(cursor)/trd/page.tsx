import { TrdPage } from "@/features/trd/page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TRD 프롬프트 생성기",
  description: "TRD 프롬프트 생성기",
};

export default function TRDPage() {
  return <TrdPage />;
}
