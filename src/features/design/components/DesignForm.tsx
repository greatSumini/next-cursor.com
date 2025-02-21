"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { DesignFormData, DesignStyle, ColorScheme } from "../types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HexColorPicker } from "react-colorful";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const DESIGN_STYLES: { value: DesignStyle; label: string }[] = [
  { value: "minimal", label: "미니멀" },
  { value: "modern", label: "모던" },
  { value: "classic", label: "클래식" },
  { value: "playful", label: "플레이풀 (게임 등)" },
  { value: "luxury", label: "럭셔리" },
  { value: "tech", label: "테크" },
];

const COLOR_SCHEMES: {
  value: ColorScheme;
  label: string;
  recommend?: boolean;
}[] = [
  { value: "monochrome", label: "단일색상 (모노크롬)" },
  { value: "analogous", label: "유사색상 조합 (유사 색상)" },
  { value: "complementary", label: "강한 대비 (보색)", recommend: true },
  { value: "triadic", label: "다양한 색 사용 (삼각 구도)" },
];

export function DesignForm({
  onSubmit,
}: {
  onSubmit: (data: DesignFormData) => void;
}) {
  const [designStyle, setDesignStyle] = useState<DesignStyle>("modern");
  const [colorScheme, setColorScheme] = useState<ColorScheme>("monochrome");
  const [primaryColor, setPrimaryColor] = useState("");
  const [moodKeywords, setMoodKeywords] = useState("");
  const [references, setReferences] = useState("");
  const [themeDetailType, setThemeDetailType] = useState<"auto" | "manual">(
    "manual"
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      designStyle,
      colorScheme,
      primaryColor,
      moodKeywords,
      references,
      themeDetailType,
    });
  };

  const isThemeDetailDisabled = themeDetailType === "auto";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <Label>디자인 스타일</Label>
            <Select
              value={designStyle}
              onValueChange={(value) => setDesignStyle(value as DesignStyle)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {DESIGN_STYLES.map((style) => (
                  <SelectItem key={style.value} value={style.value}>
                    {style.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="references">참고 디자인 서비스</Label>
            <Input
              id="references"
              value={references}
              onChange={(e) => setReferences(e.target.value)}
              placeholder="참고하고 싶은 디자인의 서비스를 알려주세요"
            />
          </div>

          <div className="space-y-2">
            <Label>테마 세부 지정</Label>
            <RadioGroup
              value={themeDetailType}
              onValueChange={(value: "auto" | "manual") => {
                setThemeDetailType(value);
                if (value === "auto") {
                  setPrimaryColor("");
                  setColorScheme("monochrome");
                  setMoodKeywords("");
                }
              }}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="auto" id="auto" />
                <Label htmlFor="auto">
                  참고 서비스를 통해 알아서 설정해주세요
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="manual" id="manual" />
                <Label htmlFor="manual">직접 지정할게요</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>포인트 컬러</Label>
            <div className="flex gap-2">
              <Input
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                placeholder="HEX 컬러코드 (#FFFFFF)"
                disabled={isThemeDetailDisabled}
              />
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-[60px] h-[40px] p-0"
                    style={{ backgroundColor: primaryColor || "#ffffff" }}
                    disabled={isThemeDetailDisabled}
                  >
                    <span className="sr-only">컬러 선택</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-3">
                  <HexColorPicker
                    color={primaryColor || "#ffffff"}
                    onChange={setPrimaryColor}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <Label>컬러 스킴</Label>
            <Select
              value={colorScheme}
              onValueChange={(value) => setColorScheme(value as ColorScheme)}
              disabled={isThemeDetailDisabled}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {COLOR_SCHEMES.map((scheme) => (
                  <SelectItem key={scheme.value} value={scheme.value}>
                    {scheme.label}
                    {scheme.recommend && (
                      <span className="text-xs bg-accent text-white py-1 px-2 rounded-sm ml-2">
                        추천
                      </span>
                    )}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="moodKeywords">무드 키워드</Label>
            <Textarea
              id="moodKeywords"
              value={moodKeywords}
              onChange={(e) => setMoodKeywords(e.target.value)}
              placeholder="디자인 무드를 표현하는 키워드들을 입력하세요 (키워드당 줄바꿈)"
              required={!isThemeDetailDisabled}
              disabled={isThemeDetailDisabled}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setDesignStyle("modern");
                setColorScheme("monochrome");
                setPrimaryColor("#3182F6");
                setMoodKeywords("전문적인\n신뢰감\n깔끔한");
                setReferences("");
                setThemeDetailType("manual");
              }}
            >
              예시 입력
            </Button>
            <Button type="submit">프롬프트 생성/복사</Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
