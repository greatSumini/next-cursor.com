"use client";

import { ColorPaletteGenerator } from "@/features/generate-color-palette/components/ColorPaletteGenerator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function GenerateColorPalette() {
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center w-full max-w-4xl">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-2xl font-bold text-center">컬러 팔레트 생성기</h1>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsHelpOpen(true)}
          >
            사용 방법 보기
          </Button>
        </div>

        <ColorPaletteGenerator />

        <Dialog open={isHelpOpen} onOpenChange={setIsHelpOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>컬러 팔레트 생성 방법</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <p>1. 원하는 색상 형식(HEX, RGB, HSL)을 선택합니다.</p>
              <p>2. 기준이 되는 색상을 입력합니다.</p>
              <p>3. 입력한 색상이 어떤 명도(100~900)인지 선택합니다.</p>
              <p>
                4. 팔레트 생성 버튼을 클릭하면 자동으로 팔레트가 생성됩니다.
              </p>
              <p>5. 생성된 팔레트를 원하는 형식으로 복사할 수 있습니다.</p>
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
