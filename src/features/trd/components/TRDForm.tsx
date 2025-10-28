"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { TRDFormData } from "../types";

const SENSITIVE_DATA_CHOICES = [
  "없음",
  "기본 개인정보",
  "결제정보",
  "매우 민감한 정보",
];

const EXTERNAL_INTEGRATIONS_CHOICES = [
  "없음",
  "소셜 로그인",
  "결제 서비스",
  "여러 외부 서비스",
];

const BUDGET_SCHEDULE_CHOICES = [
  "특별한 제약 없음",
  "빠른 출시 우선",
  "예산 효율성 우선",
];

export function TRDForm({
  onSubmit,
}: {
  onSubmit: (data: TRDFormData) => void;
}) {
  const [projectName, setProjectName] = useState("");
  const [overview, setOverview] = useState("");
  const [sensitiveData, setSensitiveData] = useState("");
  const [externalIntegrations, setExternalIntegrations] = useState("");
  const [budgetSchedule, setBudgetSchedule] = useState("");
  const [additionalRequirements, setAdditionalRequirements] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      projectName,
      overview,
      sensitiveData,
      externalIntegrations,
      budgetSchedule,
      additionalRequirements,
    });
  };

  const handleExampleInput = () => {
    setProjectName("온라인 쇼핑몰 서비스");
    setOverview(
      "사용자가 상품을 검색하고, 장바구니에 담고, 결제할 수 있는 B2C 이커머스 플랫폼입니다. 관리자는 상품 등록, 재고 관리, 주문 관리를 할 수 있어야 합니다."
    );
    setSensitiveData(
      "결제정보 - 사용자의 신용카드 정보와 개인정보(이름, 주소, 전화번호)를 안전하게 처리해야 합니다."
    );
    setExternalIntegrations(
      "카카오/네이버 소셜 로그인, 토스페이먼츠 결제 연동, 문자/알림톡 발송 서비스"
    );
    setBudgetSchedule("3개월 내 MVP 출시, 초기 예산 3천만원 이내");
    setAdditionalRequirements(
      "모바일 반응형 필수, 상품 이미지 최적화, 실시간 재고 관리"
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="projectName">프로젝트명 *</Label>
            <Input
              id="projectName"
              placeholder="예: AI 기반 건강관리 앱"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="overview">프로젝트 개요 *</Label>
            <Textarea
              id="overview"
              placeholder="어떤 서비스인지, 주요 기능은 무엇인지 간략히 설명해주세요"
              value={overview}
              onChange={(e) => setOverview(e.target.value)}
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sensitiveData">민감한 데이터 처리 여부</Label>
            <Textarea
              id="sensitiveData"
              placeholder="사용자의 개인정보(이름, 이메일, 비밀번호 등)나 결제 정보처럼, 특별히 안전하게 보호해야 할 민감한 데이터를 다루어야 하나요?"
              value={sensitiveData}
              onChange={(e) => setSensitiveData(e.target.value)}
              rows={3}
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {SENSITIVE_DATA_CHOICES.map((choice) => (
                <Button
                  key={choice}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setSensitiveData(choice)}
                  className="text-xs"
                >
                  {choice}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="externalIntegrations">외부 서비스 연동</Label>
            <Textarea
              id="externalIntegrations"
              placeholder="사용자가 이 서비스를 이용할 때, 반드시 함께 사용해야 하는 다른 서비스가 있나요?
예: 구글/카카오 로그인, 문자/알림톡 발송, 카드 결제 등"
              value={externalIntegrations}
              onChange={(e) => setExternalIntegrations(e.target.value)}
              rows={3}
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {EXTERNAL_INTEGRATIONS_CHOICES.map((choice) => (
                <Button
                  key={choice}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setExternalIntegrations(choice)}
                  className="text-xs"
                >
                  {choice}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="budgetSchedule">예산 및 일정 제약</Label>
            <Textarea
              id="budgetSchedule"
              placeholder="혹시 정해진 예산이나 반드시 지켜야 하는 출시일이 있으신가요?
가장 효율적인 기술과 개발 범위를 선택하는 데 도움이 됩니다.
예: 3개월 내 출시, 예산 5천만원 이내"
              value={budgetSchedule}
              onChange={(e) => setBudgetSchedule(e.target.value)}
              rows={3}
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {BUDGET_SCHEDULE_CHOICES.map((choice) => (
                <Button
                  key={choice}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setBudgetSchedule(choice)}
                  className="text-xs"
                >
                  {choice}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="additionalRequirements">추가 요구사항</Label>
            <Textarea
              id="additionalRequirements"
              placeholder="추가적인 요구사항이 있다면 자유롭게 적어주세요. 구체적일수록 좋아요.
예: 특정 기능의 작동 방식, 디자인 요소, 특정 플랫폼 지원 등"
              value={additionalRequirements}
              onChange={(e) => setAdditionalRequirements(e.target.value)}
              rows={4}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={handleExampleInput}
              type="button"
              variant="outline"
              className="w-full"
            >
              예시 입력
            </Button>
            <Button type="submit" className="w-full">
              프롬프트 생성/복사
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
