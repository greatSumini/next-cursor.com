"use client";

import { useState } from "react";
import { PackageJsonForm } from "@/components/open-source-license/PackageJsonForm";
import { LicenseDocument } from "@/components/open-source-license/LicenseDocument";
import {
  parsePackageJson,
  fetchAllLicenseInfo,
  generateLicenseMarkdown,
} from "@/lib/license-utils";
import { LicenseInfo } from "@/types/license";
import { useToast } from "@/components/ui/use-toast";

export default function OpenSourceLicensePage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [licenseInfoList, setLicenseInfoList] = useState<LicenseInfo[]>([]);
  const [markdownContent, setMarkdownContent] = useState<string>("");
  const [showResults, setShowResults] = useState(false);

  const handleFormSubmit = async (packageJsonString: string) => {
    try {
      setIsLoading(true);

      // package.json 파싱
      const packages = parsePackageJson(packageJsonString);

      if (packages.length === 0) {
        toast({
          title: "오류",
          description: "의존성 패키지를 찾을 수 없습니다.",
          variant: "destructive",
        });
        return;
      }

      // 라이선스 정보 조회
      const licenseInfoList = await fetchAllLicenseInfo(packages);
      setLicenseInfoList(licenseInfoList);

      // 마크다운 생성
      const markdown = generateLicenseMarkdown(licenseInfoList);
      setMarkdownContent(markdown);

      // 결과 표시
      setShowResults(true);
    } catch (error) {
      console.error("라이선스 정보 처리 오류:", error);
      toast({
        title: "오류",
        description: "라이선스 정보를 처리하는 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setShowResults(false);
    setLicenseInfoList([]);
    setMarkdownContent("");
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          오픈소스 라이선스 문서 생성기
        </h1>
        <p className="text-muted-foreground">
          package.json 파일을 붙여넣어 프로젝트의 오픈소스 라이선스 문서를
          자동으로 생성합니다.
        </p>
      </div>

      {!showResults ? (
        <PackageJsonForm onSubmit={handleFormSubmit} isLoading={isLoading} />
      ) : (
        <LicenseDocument
          licenseInfoList={licenseInfoList}
          markdownContent={markdownContent}
          onReset={handleReset}
        />
      )}
    </div>
  );
}
