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
import { HelpCircle, Copy, ArrowRight } from "lucide-react";
import { PRDForm } from "./components/PRDForm";
import { generatePrompt } from "./lib/generatePrompt";
import { PRDFormData } from "./types";
import { useState, useEffect } from "react";
import JSConfetti from "js-confetti";
import Link from "next/link";

export function PrdPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [jsConfetti, setJsConfetti] = useState<JSConfetti | null>(null);

  useEffect(() => {
    setJsConfetti(new JSConfetti());
  }, []);

  const handleSubmit = async (data: PRDFormData) => {
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
              <Button className="w-full" onClick={handleCopy}>
                복사하기
                <Copy className="w-4 h-4 ml-2" />
              </Button>
              <Button className="w-full" asChild variant="outline">
                <Link href="/ia">
                  IA도 작성해보세요!
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <div className="container max-w-3xl py-10 space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold">
              PRD 프롬프트 생성기
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <HelpCircle className="w-5 h-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>PRD가 무엇인가요?</DialogTitle>
                    <DialogDescription className="space-y-4">
                      <p>
                        PRD(Product Requirements Document)는 제품 요구사항
                        문서로, 제품의 목적, 기능, 특징 등을 상세하게 정의하는
                        문서입니다.
                      </p>
                      <p>커서를 활용한 개발에서 특히 중요한 역할을 합니다:</p>
                      <ul className="list-disc pl-4 space-y-2">
                        <li>
                          <strong>명확한 기획 의도 전달:</strong> 기획자의
                          의도를 명확하게 전달합니다.
                        </li>
                        <li>
                          <strong>개발 범위 정의:</strong> 개발해야 할 기능과
                          제약사항을 명확히 정의하여 개발 범위를 설정합니다.
                        </li>
                        <li>
                          <strong>효율적인 개발 진행:</strong> 상세한 요구사항을
                          바탕으로 AI가 더 정확한 코드를 생성할 수 있도록
                          돕습니다.
                        </li>
                      </ul>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </h1>
          </div>
          <p className="text-muted-foreground">
            PRD(Product Requirements Document) 작성을 위한 프롬프트를
            생성합니다.
            <br />
            아래 양식을 작성해주세요.
          </p>
        </div>

        <PRDForm onSubmit={handleSubmit} />
      </div>
    </>
  );
}
