"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { IAFormData, NavigationType, AuthType } from "../types";

const NAVIGATION_TYPES: { value: NavigationType; label: string }[] = [
  { value: "sidebar", label: "사이드바" },
  { value: "topbar", label: "상단바" },
  { value: "sidebar, topbar", label: "둘 다 사용" },
  { value: "none", label: "사용하지 않음" },
];

const AUTH_TYPES: { value: AuthType; label: string }[] = [
  { value: "required", label: "로그인 필수" },
  { value: "optional", label: "비로그인도 사용 가능" },
  { value: "none", label: "인증 없음" },
];

export function IAForm({ onSubmit }: { onSubmit: (data: IAFormData) => void }) {
  const [navigationType, setNavigationType] =
    useState<NavigationType>("sidebar");
  const [authType, setAuthType] = useState<AuthType>("required");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      navigationType,
      authType,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start gap-4 text-muted-foreground">
            <div className="text-2xl">🤔</div>
            <div className="space-y-2">
              <p>잠깐! PRD를 생성하셨나요?</p>
              <p className="text-sm">
                정확한 IA 작성을 위해 먼저 PRD를 작성해주세요.{" "}
                <Button variant="link" className="h-auto p-0" asChild>
                  <Link href="/prd" className="text-primary">
                    PRD 작성하러 가기 →
                  </Link>
                </Button>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <Label>네비게이션 타입</Label>
            <Select
              value={navigationType}
              onValueChange={(value) =>
                setNavigationType(value as NavigationType)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {NAVIGATION_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>인증(로그인, 회원가입) 여부</Label>
            <Select
              value={authType}
              onValueChange={(value) => setAuthType(value as AuthType)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {AUTH_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={() => {
                setNavigationType("sidebar");
                setAuthType("required");
              }}
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
