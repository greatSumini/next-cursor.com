"use client";

import { Button } from "@/components/ui/button";
import { DialogHeader } from "@/components/ui/dialog";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { HelpCircle, Copy } from "lucide-react";
import { IAForm } from "./components/IAForm";
import { generatePrompt } from "./lib/generatePrompt";
import { IAFormData } from "./types";
import { useState, useEffect } from "react";
import JSConfetti from "js-confetti";

export function IAPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [jsConfetti, setJsConfetti] = useState<JSConfetti | null>(null);

  useEffect(() => {
    setJsConfetti(new JSConfetti());
  }, []);

  const handleSubmit = async (data: IAFormData) => {
    const prompt = generatePrompt(data);
    setGeneratedPrompt(prompt);
    setIsOpen(true);
    jsConfetti?.addConfetti({
      emojis: ["🎉", "✨", "💫", "⭐️"],
      emojiSize: 30,
      confettiNumber: 50,
    });
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedPrompt);
    alert("클립보드에 복사되었습니다!");
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>프롬프트가 생성되었습니다! 🎉</DialogTitle>
            <DialogDescription className="space-y-4">
              아래 생성된 프롬프트를 ChatGPT 등 서비스에 붙여넣어주세요.
              <div className="relative">
                <pre className="bg-muted p-4 rounded-lg whitespace-pre-wrap text-sm max-h-[300px] overflow-y-auto">
                  <span className="text-ellipsis h-full overflow-hidden">
                    {generatedPrompt}
                  </span>
                </pre>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={handleCopy}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <div className="container max-w-3xl py-6 space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold">
              IA 프롬프트 생성기
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <HelpCircle className="w-5 h-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>IA가 무엇인가요?</DialogTitle>
                    <DialogDescription className="space-y-4">
                      <p>
                        IA(Information Architecture)는 정보 구조를 의미하며,
                        웹사이트나 앱의 구조와 탐색 체계를 설계하는 것입니다.
                      </p>
                      <p>IA는 다음과 같은 요소들을 포함합니다:</p>
                      <ul className="list-disc pl-4 space-y-2">
                        <li>
                          <strong>사이트맵:</strong> 전체 페이지 구조와 계층
                          관계를 정의합니다.
                        </li>
                        <li>
                          <strong>사용자 흐름:</strong> 주요 기능에 대한 사용자
                          여정을 설계합니다.
                        </li>
                        <li>
                          <strong>네비게이션 구조:</strong> 메뉴 구조와 이동
                          경로를 설계합니다.
                        </li>
                        <li>
                          <strong>콘텐츠 구성:</strong> 각 페이지의 주요 콘텐츠
                          구성을 정의합니다.
                        </li>
                      </ul>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </h1>
          </div>
          <p className="text-muted-foreground">
            IA(Information Architecture) 작성을 위한 프롬프트를 생성합니다.
            <br />
            아래 양식을 작성해주세요.
          </p>
        </div>

        <IAForm onSubmit={handleSubmit} />
      </div>
    </>
  );
}
