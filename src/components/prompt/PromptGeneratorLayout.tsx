"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { HelpCircle, Copy, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import JSConfetti from "js-confetti";
import Link from "next/link";

interface Props {
  title: string;
  description: string;
  dialog?: {
    title?: string;
    description?: string;
  };
  nextPage?: {
    buttonTitle: string;
    href: string;
  };
  helpContent?: {
    title: string;
    description: React.ReactNode;
  };
  renderForm: ({
    onGenerate,
  }: {
    onGenerate: (prompt: string) => void;
  }) => React.ReactNode;
}

export function PromptGeneratorLayout({
  title,
  description,
  dialog,
  helpContent,
  nextPage,
  renderForm,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [jsConfetti, setJsConfetti] = useState<JSConfetti | null>(null);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  useEffect(() => {
    setJsConfetti(new JSConfetti());
  }, []);

  const handleSubmit = async (prompt: string) => {
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
            <DialogTitle>
              {dialog?.title || "프롬프트가 생성되었습니다! 🎉"}
            </DialogTitle>
            <DialogDescription className="space-y-4">
              {dialog?.description ||
                "아래 생성된 프롬프트를 ChatGPT 등 서비스에 붙여넣어주세요."}
              <div className="relative">
                <div className="bg-muted p-4 rounded-lg whitespace-pre-wrap text-sm max-h-[300px] overflow-y-auto">
                  <span className="text-ellipsis h-full overflow-hidden">
                    {generatedPrompt}
                  </span>
                </div>
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
              {nextPage && (
                <Button variant="secondary" className="w-full" asChild>
                  <Link href={nextPage.href}>
                    {nextPage.buttonTitle}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              )}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {helpContent && (
        <Dialog open={isHelpOpen} onOpenChange={setIsHelpOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{helpContent.title}</DialogTitle>
              <DialogDescription className="space-y-4">
                {helpContent.description}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}

      <div className="container max-w-3xl py-10 space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold">
              {title}
              {helpContent && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsHelpOpen(true)}
                >
                  <HelpCircle className="w-5 h-5" />
                </Button>
              )}
            </h1>
          </div>
          <p className="text-muted-foreground">{description}</p>
        </div>

        {renderForm({ onGenerate: handleSubmit })}
      </div>
    </>
  );
}
