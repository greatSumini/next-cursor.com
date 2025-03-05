"use client";

import { PromptGeneratorLayout } from "@/components/prompt/PromptGeneratorLayout";
import { TermsOfServiceForm } from "./components/TermsOfServiceForm";
import { generateTermsOfService } from "./lib/generateTermsOfService";

export function TermsOfServicePage() {
  const helpContent = {
    title: "서비스이용약관이란?",
    description: (
      <>
        <p>
          서비스이용약관은 서비스 제공자와 이용자 간의 권리, 의무, 책임사항 및
          서비스 이용 조건 등을 명시한 계약 문서입니다. 전자상거래법, 약관규제법
          등에 따라 서비스를 제공하는 모든 사업자는 이용약관을 작성하고 공개해야
          합니다.
        </p>
        <p>서비스이용약관은 다음과 같은 중요한 역할을 합니다:</p>
        <ul className="list-disc pl-4 space-y-2">
          <li>
            <strong>법적 보호:</strong> 서비스 제공자와 이용자 모두의 권리를
            보호합니다.
          </li>
          <li>
            <strong>분쟁 예방:</strong> 서비스 이용 조건을 명확히 하여 분쟁을
            예방합니다.
          </li>
          <li>
            <strong>책임 범위 설정:</strong> 서비스 제공자와 이용자의 책임
            범위를 명확히 합니다.
          </li>
          <li>
            <strong>서비스 이용 안내:</strong> 이용자에게 서비스 이용 방법과
            제한 사항을 안내합니다.
          </li>
        </ul>
      </>
    ),
  };

  return (
    <PromptGeneratorLayout
      title="서비스이용약관 작성기"
      description="서비스에 필요한 이용약관을 단계별로 작성하고 문서를 자동으로 생성합니다."
      helpContent={helpContent}
      renderForm={({ onGenerate }) => (
        <TermsOfServiceForm
          onSubmit={(data) => onGenerate(generateTermsOfService(data))}
        />
      )}
    />
  );
}
