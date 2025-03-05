import { PrivacyPolicyPage } from "@/features/privacy-policy/page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "개인정보처리방침 작성기",
  description: "개인정보처리방침을 단계별로 작성하고 생성합니다.",
};

export default function Page() {
  return <PrivacyPolicyPage />;
}
