import { Metadata } from "next";

export const metadata: Metadata = {
  title: "서비스 이용약관 생성기",
  description: "서비스 이용약관을 단계별로 작성하고 생성합니다.",
};

export default function OpenSourceLicenseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="min-h-screen bg-background">{children}</main>;
}
