"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { PRDFormData, Platform, StorageType } from "../types";

const PLATFORMS: { value: Platform; label: string }[] = [
  { value: "web", label: "웹" },
  { value: "android", label: "안드로이드" },
  { value: "ios", label: "iOS" },
  { value: "desktop", label: "데스크톱" },
  { value: "other", label: "기타" },
];

const STORAGE_TYPES: { value: StorageType; label: string }[] = [
  { value: "local(no-database)", label: "로컬 저장소" },
  { value: "database", label: "데이터베이스" },
];

export function PRDForm({
  onSubmit,
}: {
  onSubmit: (data: PRDFormData) => void;
}) {
  const [reference, setReference] = useState("");
  const [features, setFeatures] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>([]);
  const [storageType, setStorageType] =
    useState<StorageType>("local(no-database)");
  const [overview, setOverview] = useState("");
  const [targetUsers, setTargetUsers] = useState("");
  const [techStack, setTechStack] = useState("");
  const [suggestFeatures, setSuggestFeatures] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      overview,
      reference,
      features: features.split("\n").filter(Boolean),
      targetUsers,
      platforms: selectedPlatforms,
      storageType,
      techStack,
      suggestFeatures,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="overview">제품 개요</Label>
            <Textarea
              id="overview"
              placeholder="어떤 서비스 또는 제품인지 간략히 설명해주세요"
              value={overview}
              onChange={(e) => setOverview(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>참고 서비스 URL</Label>
            <Input
              placeholder="https://"
              value={reference}
              onChange={(e) => {
                setReference(e.target.value);
              }}
            />
          </div>

          <div className="space-y-2">
            <Label>핵심 기능</Label>
            <Textarea
              placeholder="꼭 포함할 기능들을 알려주세요 (기능별로 줄바꿈)"
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
              rows={5}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="targetUsers">타겟 사용자</Label>
            <Textarea
              id="targetUsers"
              placeholder="예상 사용자 유형을 알려주세요 (나이대, 성별, 직군 등)"
              value={targetUsers}
              onChange={(e) => setTargetUsers(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>타겟 플랫폼</Label>
            <div className="grid grid-cols-2 gap-4">
              {PLATFORMS.map((platform) => (
                <div
                  key={platform.value}
                  className="flex items-center space-x-2"
                >
                  <Checkbox
                    id={platform.value}
                    checked={selectedPlatforms.includes(platform.value)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedPlatforms([
                          ...selectedPlatforms,
                          platform.value,
                        ]);
                      } else {
                        setSelectedPlatforms(
                          selectedPlatforms.filter((p) => p !== platform.value)
                        );
                      }
                    }}
                  />
                  <Label htmlFor={platform.value}>{platform.label}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>데이터 저장 방식</Label>
            <Select
              value={storageType}
              onValueChange={(value) => setStorageType(value as StorageType)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {STORAGE_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>사용할 기술 스택 (있다면 입력)</Label>
            <Textarea
              placeholder="예: Next.js, TypeScript, OpenAI (쉼표로 구분)"
              value={techStack}
              onChange={(e) => setTechStack(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="suggestFeatures"
              checked={suggestFeatures}
              onCheckedChange={(checked) =>
                setSuggestFeatures(checked as boolean)
              }
            />
            <Label htmlFor="suggestFeatures">추가 기능을 제안 받을까요?</Label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={() => {
                setOverview("AI 이력서 분석 서비스");
                setReference("");
                setFeatures(
                  "로그인, 회원가입\n이력서 업로드\n이력서 분석, 항목별 피드백"
                );
                setTargetUsers("20대 대학생");
                setSelectedPlatforms(["web"]);
                setStorageType("database");
                setTechStack("Next.js, Supabase, OpenAI");
                setSuggestFeatures(true);
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
