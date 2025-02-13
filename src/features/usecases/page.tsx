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
import { UsecaseForm } from "./components/UsecaseForm";
import { generatePrompt } from "./lib/generatePrompt";
import { useState, useEffect } from "react";
import JSConfetti from "js-confetti";

export function UsecasesPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [jsConfetti, setJsConfetti] = useState<JSConfetti | null>(null);

  useEffect(() => {
    setJsConfetti(new JSConfetti());
  }, []);

  const handleSubmit = async () => {
    const prompt = generatePrompt();
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
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <div className="container max-w-3xl py-10 space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold">
              유스케이스 프롬프트 생성기
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <HelpCircle className="w-5 h-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>유스케이스가 무엇인가요?</DialogTitle>
                    <DialogDescription className="space-y-4">
                      <p>
                        유스케이스(Use Case)는 사용자와 시스템 간의 상호작용을
                        단계별로 상세하게 기술한 문서입니다.
                      </p>
                      <p>유스케이스는 다음과 같은 요소들을 포함합니다:</p>
                      <ul className="list-disc pl-4 space-y-2">
                        <li>
                          <strong>액터:</strong> 시스템을 사용하는 사용자나 외부
                          시스템
                        </li>
                        <li>
                          <strong>사전 조건:</strong> 유스케이스 실행을 위해
                          필요한 조건들
                        </li>
                        <li>
                          <strong>주요 흐름:</strong> 정상적인 시나리오의 단계별
                          진행
                        </li>
                        <li>
                          <strong>대체 흐름:</strong> 예외 상황이나 대체
                          시나리오
                        </li>
                        <li>
                          <strong>사후 조건:</strong> 유스케이스 완료 후의
                          시스템 상태
                        </li>
                      </ul>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </h1>
          </div>
          <p className="text-muted-foreground">
            유스케이스(Use Case) 작성을 위한 프롬프트를 생성합니다.
            <br />
            아래 양식을 작성해주세요.
          </p>
        </div>

        <UsecaseForm onSubmit={handleSubmit} />
      </div>
    </>
  );
}
