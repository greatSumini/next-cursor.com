"use client";

import { useState } from "react";
import { TermsOfServiceForm } from "@/features/terms-of-service/components/TermsOfServiceForm";
import { TermsOfServiceFormData } from "@/features/terms-of-service/types";
import { generateTermsOfService } from "@/features/terms-of-service/lib/generateTermsOfService";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { copyToClipboard } from "@/lib/utils";

export default function TermsOfServicePage() {
  const [termsOfService, setTermsOfService] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("form");
  const { toast } = useToast();

  const handleFormSubmit = (data: TermsOfServiceFormData) => {
    try {
      const generatedTermsOfService = generateTermsOfService(data);
      setTermsOfService(generatedTermsOfService);
      setActiveTab("preview");
      toast({
        title: "서비스이용약관 생성 완료",
        description: "서비스이용약관이 성공적으로 생성되었습니다.",
      });
    } catch (error) {
      console.error("서비스이용약관 생성 중 오류 발생:", error);
      toast({
        title: "서비스이용약관 생성 실패",
        description:
          "서비스이용약관 생성 중 오류가 발생했습니다. 다시 시도해주세요.",
        variant: "destructive",
      });
    }
  };

  const handleCopyToClipboard = () => {
    copyToClipboard(termsOfService);
    toast({
      title: "클립보드에 복사됨",
      description: "서비스이용약관이 클립보드에 복사되었습니다.",
    });
  };

  const handleDownload = () => {
    const blob = new Blob([termsOfService], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "서비스이용약관.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({
      title: "다운로드 완료",
      description: "서비스이용약관이 다운로드되었습니다.",
    });
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          서비스이용약관 작성기
        </h1>
        <p className="text-muted-foreground">
          서비스이용약관을 단계별로 작성하고 문서를 자동으로 생성합니다.
        </p>
      </div>

      {activeTab === "form" ? (
        <TermsOfServiceForm onSubmit={handleFormSubmit} />
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-end space-x-2 mb-4">
            <Button variant="outline" onClick={handleCopyToClipboard}>
              클립보드에 복사
            </Button>
            <Button onClick={handleDownload}>다운로드</Button>
            <Button variant="secondary" onClick={() => setActiveTab("form")}>
              다시 작성하기
            </Button>
          </div>
          <div className="prose prose-sm max-w-none dark:prose-invert whitespace-pre-wrap">
            {termsOfService}
          </div>
        </div>
      )}
    </div>
  );
}
