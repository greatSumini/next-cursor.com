import { Metadata } from "next";
import { HeroSection } from "@/features/home/components/HeroSection";
import { ToolsSection } from "@/features/home/components/ToolsSection";

export const metadata: Metadata = {
  title: "Next-Cursor.com",
  description:
    "Cursor를 Next-Level로 활용할 수 있게 해주는 도구 & 팁 모음 사이트",
};

export default function Page() {
  const tools = [
    {
      title: "PRD 프롬프트 생성기",
      description:
        "PRD(Product Requirements Document) 작성을 위한 프롬프트를 생성합니다.",
      href: "/prd",
    },
    {
      title: "IA 프롬프트 생성기",
      description: "Information Architecture 프롬프트 생성기",
      href: "/ia",
    },
    {
      title: "유스케이스 프롬프트 생성기",
      description: "Use Case 작성을 위한 프롬프트를 생성합니다.",
      href: "/usecases",
    },
    {
      title: "HTML Table to JSON 변환기",
      description: "HTML 테이블을 JSON 형식으로 변환합니다.",
      href: "/dev/table-to-json",
      dev: true,
    },
  ];

  return (
    <>
      <div className="pb-12 space-y-8">
        <HeroSection />

        <div className="max-w-4xl mx-auto container">
          <ToolsSection
            title="Cursor AI tools"
            tools={tools.filter((tool) => !tool.dev)}
          />

          <ToolsSection
            title="Development tools"
            tools={tools.filter((tool) => tool.dev)}
          />
        </div>
      </div>
    </>
  );
}
