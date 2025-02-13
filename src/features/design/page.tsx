"use client";

import { PromptGeneratorLayout } from "@/components/prompt/PromptGeneratorLayout";
import { DesignForm } from "./components/DesignForm";
import { generatePrompt } from "./lib/generatePrompt";

export function DesignPage() {
  const helpContent = {
    title: "디자인 가이드가 무엇인가요?",
    description: (
      <>
        <p>
          디자인 가이드는 제품의 시각적 아이덴티티와 사용자 경험을 정의하는
          문서입니다.
        </p>
        <p>디자인 가이드는 다음과 같은 요소들을 포함합니다:</p>
        <ul className="list-disc pl-4 space-y-2">
          <li>
            <strong>디자인 시스템:</strong> 색상, 타이포그래피, 컴포넌트 등의
            기준을 정의합니다.
          </li>
          <li>
            <strong>레이아웃:</strong> 화면 구성과 그리드 시스템을 설계합니다.
          </li>
          <li>
            <strong>인터랙션:</strong> 사용자 동작에 대한 피드백과 애니메이션을
            정의합니다.
          </li>
          <li>
            <strong>접근성:</strong> 다양한 사용자를 위한 디자인 고려사항을
            포함합니다.
          </li>
        </ul>
      </>
    ),
  };

  return (
    <PromptGeneratorLayout
      title="디자인 프롬프트 생성기"
      description="UI/UX 디자인 가이드 작성을 위한 프롬프트를 생성합니다."
      helpContent={helpContent}
      nextPage={{
        buttonTitle: "PRD 작성하기",
        href: "/prd",
      }}
      renderForm={({ onGenerate }) => (
        <DesignForm onSubmit={(data) => onGenerate(generatePrompt(data))} />
      )}
    />
  );
}
