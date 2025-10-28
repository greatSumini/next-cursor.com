"use client";

import { PromptGeneratorLayout } from "@/components/prompt/PromptGeneratorLayout";
import { TRDForm } from "./components/TRDForm";
import { generatePrompt } from "./lib/generatePrompt";

export function TrdPage() {
  const helpContent = {
    title: "TRD가 무엇인가요?",
    description: (
      <>
        <p>
          TRD(Technical Requirements Document)는 기술 요구사항 문서로, 시스템의
          기술적 구현 방법, 아키텍처, 인프라 등을 상세하게 정의하는 문서입니다.
        </p>
        <p>PRD를 기반으로 실제 개발을 진행하기 위한 기술적 청사진 역할을 합니다:</p>
        <ul className="list-disc pl-4 space-y-2">
          <li>
            <strong>기술 스택 결정:</strong> 프로젝트에 적합한 프론트엔드, 백엔드,
            데이터베이스 등의 기술을 선정합니다.
          </li>
          <li>
            <strong>시스템 아키텍처 설계:</strong> 전체 시스템의 구조와 각
            컴포넌트 간의 관계를 정의합니다.
          </li>
          <li>
            <strong>보안 및 성능 요구사항:</strong> 데이터 보안, 성능 목표, 확장성
            전략을 구체화합니다.
          </li>
          <li>
            <strong>개발 가이드 제공:</strong> 개발팀이 일관된 방향으로 구현할 수
            있도록 상세한 기술 가이드를 제공합니다.
          </li>
        </ul>
      </>
    ),
  };

  return (
    <PromptGeneratorLayout
      title="TRD 프롬프트 생성기"
      description="TRD(Technical Requirements Document) 작성을 위한 프롬프트를 생성합니다."
      helpContent={helpContent}
      nextPage={{
        buttonTitle: "PRD 작성하기",
        href: "/prd",
      }}
      renderForm={({ onGenerate }) => (
        <TRDForm onSubmit={(data) => onGenerate(generatePrompt(data))} />
      )}
    />
  );
}
