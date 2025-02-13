"use client";

import { PromptGeneratorLayout } from "@/components/prompt/PromptGeneratorLayout";
import { PRDForm } from "./components/PRDForm";
import { generatePrompt } from "./lib/generatePrompt";

export function PrdPage() {
  const helpContent = {
    title: "PRD가 무엇인가요?",
    description: (
      <>
        <p>
          PRD(Product Requirements Document)는 제품 요구사항 문서로, 제품의
          목적, 기능, 특징 등을 상세하게 정의하는 문서입니다.
        </p>
        <p>커서를 활용한 개발에서 특히 중요한 역할을 합니다:</p>
        <ul className="list-disc pl-4 space-y-2">
          <li>
            <strong>명확한 기획 의도 전달:</strong> 기획자의 의도를 명확하게
            전달합니다.
          </li>
          <li>
            <strong>개발 범위 정의:</strong> 개발해야 할 기능과 제약사항을
            명확히 정의하여 개발 범위를 설정합니다.
          </li>
          <li>
            <strong>효율적인 개발 진행:</strong> 상세한 요구사항을 바탕으로 AI가
            더 정확한 코드를 생성할 수 있도록 돕습니다.
          </li>
        </ul>
      </>
    ),
  };

  return (
    <PromptGeneratorLayout
      title="PRD 프롬프트 생성기"
      description="PRD(Product Requirements Document) 작성을 위한 프롬프트를 생성합니다."
      helpContent={helpContent}
      nextPage={{
        buttonTitle: "IA 작성하기",
        href: "/ia",
      }}
      renderForm={({ onGenerate }) => (
        <PRDForm onSubmit={(data) => onGenerate(generatePrompt(data))} />
      )}
    />
  );
}
