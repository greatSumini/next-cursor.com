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
        "PRD 작성을 위한 프롬프트를 생성합니다.\n가장 먼저 작성해주세요.",
      href: "/prd",
    },
    {
      title: "IA 프롬프트 생성기",
      description:
        "IA 작성을 위한 프롬프트를 생성합니다.\n반드시 PRD를 먼저 작성해주세요.",
      href: "/ia",
    },
    {
      title: "유스케이스 프롬프트 생성기",
      description:
        "유스케이스 작성을 위한 프롬프트를 생성합니다.\n반드시 PRD, IA를 먼저 작성해주세요.",
      href: "/usecases",
    },
    {
      title: "HTML Table to JSON 변환기",
      description: "API 문서 내용을 변수로 옮길 때 좋습니다 :)",
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
