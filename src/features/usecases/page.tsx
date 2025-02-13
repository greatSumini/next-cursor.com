"use client";

import { PromptGeneratorLayout } from "@/components/prompt/PromptGeneratorLayout";
import { UsecaseForm } from "./components/UsecaseForm";
import { generatePrompt } from "./lib/generatePrompt";

export function UsecasesPage() {
  const helpContent = {
    title: "유스케이스가 무엇인가요?",
    description: (
      <>
        <p>
          유스케이스(Use Case)는 사용자와 시스템 간의 상호작용을 단계별로
          상세하게 기술한 문서입니다.
        </p>
        <p>유스케이스는 다음과 같은 요소들을 포함합니다:</p>
        <ul className="list-disc pl-4 space-y-2">
          <li>
            <strong>액터:</strong> 시스템을 사용하는 사용자나 외부 시스템
          </li>
          <li>
            <strong>사전 조건:</strong> 유스케이스 실행을 위해 필요한 조건들
          </li>
          <li>
            <strong>주요 흐름:</strong> 정상적인 시나리오의 단계별 진행
          </li>
          <li>
            <strong>대체 흐름:</strong> 예외 상황이나 대체 시나리오
          </li>
          <li>
            <strong>사후 조건:</strong> 유스케이스 완료 후의 시스템 상태
          </li>
        </ul>
      </>
    ),
  };

  return (
    <PromptGeneratorLayout
      title="유스케이스 프롬프트 생성기"
      description="유스케이스(Use Case) 작성을 위한 프롬프트를 생성합니다."
      helpContent={helpContent}
      renderForm={({ onGenerate }) => (
        <UsecaseForm onSubmit={() => onGenerate(generatePrompt())} />
      )}
    />
  );
}
