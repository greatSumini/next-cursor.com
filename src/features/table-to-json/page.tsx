"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { TableToJsonConverter } from "./TableToJsonConverter";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export function TableToJsonPage() {
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center w-full max-w-4xl">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-2xl font-bold text-center">
            HTML Table to JSON Converter
          </h1>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsHelpOpen(true)}
          >
            테이블 복사하는 방법 보기
          </Button>
        </div>

        <TableToJsonConverter />

        <Dialog open={isHelpOpen} onOpenChange={setIsHelpOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>HTML 테이블 복사하는 방법</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <p>1. 웹페이지에서 변환하고 싶은 테이블을 찾습니다.</p>
              <p>
                2. 테이블을 우클릭하고 &quot;검사&quot; 또는 &quot;요소
                검사&quot;를 선택합니다.
              </p>
              <p>
                3. 개발자 도구에서 <code>&lt;table&gt;</code> 요소를 찾습니다.
              </p>
              <p>
                4. table 태그를 우클릭하고 &quot;Copy&quot; → &quot;Copy
                element&quot;를 선택합니다.
              </p>
              <p>5. 복사한 HTML을 여기 입력창에 붙여넣기 하세요.</p>
            </div>
            <DialogFooter className="mt-6">
              <Button onClick={() => setIsHelpOpen(false)}>확인</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
