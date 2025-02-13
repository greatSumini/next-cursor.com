"use client";

import { PromptGeneratorLayout } from "@/components/prompt/PromptGeneratorLayout";
import { IAForm } from "./components/IAForm";
import { generatePrompt } from "./lib/generatePrompt";

export function IAPage() {
  const helpContent = {
    title: "IA가 무엇인가요?",
    description: (
      <>
        <p>
          IA(Information Architecture)는 정보 구조를 의미하며, 웹사이트나 앱의
          구조와 탐색 체계를 설계하는 것입니다.
        </p>
        <p>IA는 다음과 같은 요소들을 포함합니다:</p>
        <ul className="list-disc pl-4 space-y-2">
          <li>
            <strong>사이트맵:</strong> 전체 페이지 구조와 계층 관계를
            정의합니다.
          </li>
          <li>
            <strong>사용자 흐름:</strong> 주요 기능에 대한 사용자 여정을
            설계합니다.
          </li>
          <li>
            <strong>네비게이션 구조:</strong> 메뉴 구조와 이동 경로를
            설계합니다.
          </li>
          <li>
            <strong>콘텐츠 구성:</strong> 각 페이지의 주요 콘텐츠 구성을
            정의합니다.
          </li>
        </ul>
      </>
    ),
  };

  return (
    <PromptGeneratorLayout
      title="IA 프롬프트 생성기"
      description="IA(Information Architecture) 작성을 위한 프롬프트를 생성합니다."
      helpContent={helpContent}
      nextPage={{
        buttonTitle: "유스케이스 작성하기",
        href: "/usecases",
      }}
      renderForm={({ onGenerate }) => (
        <IAForm onSubmit={(data) => onGenerate(generatePrompt(data))} />
      )}
    />
  );
}
