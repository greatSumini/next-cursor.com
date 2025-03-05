"use client";

import { PromptGeneratorLayout } from "@/components/prompt/PromptGeneratorLayout";
import { PrivacyPolicyForm } from "./components/PrivacyPolicyForm";
import { generatePrivacyPolicy } from "./lib/generatePrivacyPolicy";

export function PrivacyPolicyPage() {
  const helpContent = {
    title: "개인정보처리방침이란?",
    description: (
      <>
        <p>
          개인정보처리방침은 서비스 제공자가 이용자의 개인정보를 어떻게 수집,
          이용, 보호하는지에 대한 정책을 명시한 문서입니다. 개인정보 보호법에
          따라 개인정보를 수집하는 모든 서비스는 개인정보처리방침을 작성하고
          공개해야 합니다.
        </p>
        <p>개인정보처리방침은 다음과 같은 중요한 역할을 합니다:</p>
        <ul className="list-disc pl-4 space-y-2">
          <li>
            <strong>법적 의무 준수:</strong> 개인정보 보호법에 따른 법적 의무를
            준수합니다.
          </li>
          <li>
            <strong>투명성 제공:</strong> 이용자에게 개인정보 처리에 관한 투명한
            정보를 제공합니다.
          </li>
          <li>
            <strong>신뢰 구축:</strong> 이용자와의 신뢰 관계를 구축하는 데
            도움이 됩니다.
          </li>
          <li>
            <strong>분쟁 예방:</strong> 개인정보 처리에 관한 명확한 정책을
            제시하여 분쟁을 예방합니다.
          </li>
        </ul>
      </>
    ),
  };

  return (
    <PromptGeneratorLayout
      title="개인정보처리방침 작성기"
      description="서비스에 필요한 개인정보처리방침을 단계별로 작성하고 문서를 자동으로 생성합니다."
      helpContent={helpContent}
      renderForm={({ onGenerate }) => (
        <PrivacyPolicyForm
          onSubmit={(data) => onGenerate(generatePrivacyPolicy(data))}
        />
      )}
      dialog={{
        title: "개인정보처리방침이 생성되었습니다! 🎉",
        description: "아래 생성된 개인정보처리방침을 서비스에 적용해주세요.",
      }}
    />
  );
}
