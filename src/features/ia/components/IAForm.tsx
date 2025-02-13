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
      <Card className="card-hover border-none bg-gradient-to-br from-secondary/50 to-background">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4 text-muted-foreground">
            <div className="text-2xl bg-secondary/50 p-3 rounded-xl">🤔</div>
            <div className="space-y-2">
              <p className="font-semibold text-foreground">
                잠깐! PRD를 생성하셨나요?
              </p>
              <p className="text-sm">
                정확한 IA 작성을 위해 먼저 PRD를 작성해주세요.{" "}
                <Button
                  variant="link"
                  className="h-auto p-0 font-semibold"
                  asChild
                >
                  <Link
                    href="/prd"
                    className="text-primary hover:text-primary/80"
                  >
                    PRD 작성하러 가기 →
                  </Link>
                </Button>
              </p>
              <p className="text-sm">
                먼저 PRD를 작성한 후, 그대로 IA 프롬프트도 붙여넣어
                작성해주세요.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="card-hover">
        <CardContent className="pt-6 space-y-6">
          <div className="space-y-3">
            <Label className="text-sm font-medium">네비게이션 타입</Label>
            <Select
              value={navigationType}
              onValueChange={(value) =>
                setNavigationType(value as NavigationType)
              }
            >
              <SelectTrigger className="input-focus bg-muted/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {NAVIGATION_TYPES.map((type) => (
                  <SelectItem
                    key={type.value}
                    value={type.value}
                    className="focus:bg-primary/10"
                  >
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium">
              인증(로그인, 회원가입) 여부
            </Label>
            <Select
              value={authType}
              onValueChange={(value) => setAuthType(value as AuthType)}
            >
              <SelectTrigger className="input-focus bg-muted/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {AUTH_TYPES.map((type) => (
                  <SelectItem
                    key={type.value}
                    value={type.value}
                    className="focus:bg-primary/10"
                  >
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full button-gradient">
            프롬프트 생성/복사
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}
