import { Metadata } from "next";

export const metadata: Metadata = {
  title: "오픈소스 라이선스 문서 생성기",
  description:
    "package.json 파일을 붙여넣어 프로젝트의 오픈소스 라이선스 문서를 자동으로 생성합니다.",
};

export default function OpenSourceLicenseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="min-h-screen bg-background">{children}</main>;
}
