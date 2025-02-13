"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export function UsecaseForm({ onSubmit }: { onSubmit: () => void }) {
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-secondary/50 to-background">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4 text-muted-foreground">
            <div className="text-2xl bg-secondary/50 p-3 rounded-xl">🤔</div>
            <div className="space-y-2">
              <p className="font-semibold text-foreground">
                잠깐! PRD, IA를 생성하셨나요?
              </p>
              <p className="text-sm">
                정확한 유스케이스 작성을 위해 먼저 PRD + IA를 작성해주세요.
                <br />
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
                <Button
                  variant="link"
                  className="h-auto p-0 font-semibold ml-2"
                  asChild
                >
                  <Link
                    href="/ia"
                    className="text-primary hover:text-primary/80"
                  >
                    IA 작성하러 가기 →
                  </Link>
                </Button>
              </p>
              <p className="text-sm">
                먼저 PRD/IA를 작성한 후, 그대로 유스케이스 프롬프트도 붙여넣어
                작성해주세요.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button onClick={onSubmit} className="w-full">
        프롬프트 생성/복사
      </Button>
    </div>
  );
}
