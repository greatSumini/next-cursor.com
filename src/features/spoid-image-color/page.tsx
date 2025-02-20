"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { ImageColorPicker } from "./ImageColorPicker";

export function SpoidImageColorPage() {
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [recentImages, setRecentImages] = useState<string[]>([]);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string>("");

  useEffect(() => {
    const saved = localStorage.getItem("recentImages");
    if (saved) {
      setRecentImages(JSON.parse(saved));
    }
  }, []);

  const handleImageAdded = (imageUrl: string) => {
    // 이미지가 이미 존재하는 경우 기존 이미지 제거
    const filteredImages = recentImages.filter((img) => img !== imageUrl);

    // 새 이미지를 맨 앞에 추가하고 최대 5개까지만 유지
    const newImages = [imageUrl, ...filteredImages].slice(0, 5);
    setRecentImages(newImages);
    localStorage.setItem("recentImages", JSON.stringify(newImages));
  };

  const handleRemoveImage = (imageToRemove: string) => {
    const newImages = recentImages.filter((img) => img !== imageToRemove);
    setRecentImages(newImages);
    localStorage.setItem("recentImages", JSON.stringify(newImages));

    // 현재 선택된 이미지가 삭제되는 경우 선택 해제
    if (selectedImageUrl === imageToRemove) {
      setSelectedImageUrl("");
    }
  };

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

        <ImageColorPicker
          onImageAdded={handleImageAdded}
          selectedImageUrl={selectedImageUrl}
        />

        {recentImages.length > 0 && (
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-base">최근 작업 이미지</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4 overflow-x-auto pb-2">
                {recentImages.map((image, index) => (
                  <div
                    key={index}
                    className="relative flex-shrink-0 w-20 h-20 group"
                  >
                    <div
                      className="w-full h-full rounded-md overflow-hidden border cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => setSelectedImageUrl(image)}
                    >
                      <img
                        src={image}
                        alt={`Recent image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveImage(image);
                      }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

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
