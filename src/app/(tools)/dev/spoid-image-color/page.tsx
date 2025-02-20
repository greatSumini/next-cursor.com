"use client";

import { ImageColorPicker } from "@/features/spoid-image-color/ImageColorPicker";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function SpoidImageColor() {
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center w-full max-w-4xl">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-2xl font-bold text-center">이미지 색상 추출기</h1>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsHelpOpen(true)}
          >
            사용 방법 보기
          </Button>
        </div>

        <ImageColorPicker />

        <Dialog open={isHelpOpen} onOpenChange={setIsHelpOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>이미지 색상 추출기 사용 방법</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <p>1. 이미지를 드래그 앤 드롭하거나 선택해서 업로드합니다.</p>
              <p>
                2. 이미지가 로드되면 색상을 추출하고 싶은 지점을 클릭합니다.
              </p>
              <p>
                3. 선택한 지점의 색상 정보가 HEX, RGB, HSL 형식으로 표시됩니다.
              </p>
              <p>4. 색상 코드를 클릭하면 클립보드에 복사됩니다.</p>
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
