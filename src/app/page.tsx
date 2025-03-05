import { HeroSection } from "@/features/home/components/HeroSection";
import { ToolsSection } from "@/features/home/components/ToolsSection";

export default function Page() {
  const tools = [
    {
      title: "1. PRD 프롬프트 생성기",
      description:
        "PRD 작성을 위한 프롬프트를 생성합니다.\n가장 먼저 작성해주세요.",
      href: "/prd",
    },
    {
      title: "2. IA 프롬프트 생성기",
      description:
        "IA 작성을 위한 프롬프트를 생성합니다.\n반드시 PRD를 먼저 작성해주세요.",
      href: "/ia",
    },
    {
      title: "3. 유스케이스 프롬프트 생성기",
      description:
        "유스케이스 작성을 위한 프롬프트를 생성합니다.\n반드시 PRD, IA를 먼저 작성해주세요.",
      href: "/usecases",
    },
    {
      title: "4. 디자인 프롬프트 생성기",
      description:
        "UI/UX 디자인 가이드 작성을 위한 프롬프트를 생성합니다.\n앞의 문서들을 먼저 작성해주세요.",
      href: "/design",
    },
    {
      title: "1. 개인정보처리방침 작성기",
      description:
        "개인정보처리방침을 단계별로 작성하고 생성합니다.\n출시 전 필수 문서입니다.",
      href: "/privacy-policy",
      doc: true,
    },
    {
      title: "2. 서비스이용약관 작성기",
      description:
        "서비스이용약관을 단계별로 작성하고 생성합니다.\n출시 전 필수 문서입니다.",
      href: "/terms-of-service",
      doc: true,
    },
    {
      title: "3. 오픈소스 라이선스 작성기",
      description:
        "오픈소스 라이선스 문서를 자동으로 생성합니다.\npackage.json을 사용합니다.",
      href: "/open-source-license",
      doc: true,
    },
    {
      title: "HTML Table to JSON 변환기",
      description: "API 문서 내용을 변수로 옮길 때 좋습니다 :)",
      href: "/dev/table-to-json",
      dev: true,
    },
    {
      title: "이미지 색상 추출기",
      description: "이미지에서 원하는 지점의 색상 정보를 추출합니다",
      href: "/dev/spoid-image-color",
      dev: true,
    },
    {
      title: "컬러 팔레트 생성기",
      description: "기준 색상으로부터 체계적인 색상 팔레트를 생성합니다",
      href: "/dev/generate-color-palette",
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
            tools={tools.filter((tool) => !tool.dev && !tool.doc)}
          />

          <ToolsSection
            title="Document tools"
            tools={tools.filter((tool) => tool.doc)}
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
