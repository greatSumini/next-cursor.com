"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import JSConfetti from "js-confetti";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

export function HeroSection() {
  const [email, setEmail] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("구독 처리 중 오류가 발생했습니다.");
      }

      const jsConfetti = new JSConfetti();
      jsConfetti.addConfetti({
        emojis: ["✨", "⭐️", "🌟"],
        emojiSize: 70,
        confettiNumber: 80,
      });

      setIsDialogOpen(true);
      setEmail("");
    } catch (error) {
      console.error("이메일 저장 중 오류 발생:", error);
      alert("구독 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative mb-16">
      <div className="bg-gradient-to-r from-green-500/40 to-purple-500/40 py-12">
        <div className="space-y-6 max-w-4xl mx-auto container">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold leading-[1.2]"
          >
            Enjoy
            <br />
            Next-Level
            <br />
            Cursor AI
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.4 }}
            className="md:text-lg text-black/60 max-w-xl"
          >
            Cursor AI를 더욱 효과적으로 활용할 수 있는 도구들을 제공합니다.
            <br />
            제품 기획부터 디자인까지, 개발 생산성을 높이는 다양한 도구를
            경험해보세요.
          </motion.p>

          <motion.form
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.6 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-2"
          >
            <p className="text-sm text-black/80">새 도구 소식을 받아보세요!</p>
            <div className="flex gap-2 max-w-md">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일을 입력하세요"
                required
                className="flex-1 px-4 py-2 rounded-sm border border-gray-300 focus:outline-none focus:ring-2 bg-gray-100"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 bg-green-300 text-gray-500 rounded-sm hover:bg-gray-200 transition-colors font-bold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    처리중
                  </div>
                ) : (
                  "소식받기"
                )}
              </button>
            </div>
          </motion.form>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>구독 완료!</DialogTitle>
            <DialogDescription>
              새로운 도구 소식을 이메일로 전달해드리겠습니다.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
