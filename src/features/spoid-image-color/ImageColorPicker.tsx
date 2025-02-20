/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { ColorInfo } from "./types";
import { ColorInfoDisplay } from "./ColorInfoDisplay";

export function ImageColorPicker() {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isPickerMode, setIsPickerMode] = useState(false);
  const [selectedColor, setSelectedColor] = useState<ColorInfo | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleImageUpload = (file: File) => {
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    setSelectedColor(null);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleImageUpload(file);
    }
  }, []);

  const handlePaste = useCallback((e: ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (const item of items) {
      if (item.type.startsWith("image/")) {
        const file = item.getAsFile();
        if (file) handleImageUpload(file);
        break;
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("paste", handlePaste);
    return () => {
      window.removeEventListener("paste", handlePaste);
    };
  }, [handlePaste]);

  const handleImageLoad = () => {
    if (!canvasRef.current || !imageRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = imageRef.current.width;
    canvas.height = imageRef.current.height;
    ctx.drawImage(imageRef.current, 0, 0);
  };

  const getColorAtPoint = (x: number, y: number): ColorInfo | null => {
    if (!canvasRef.current) return null;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return null;

    const pixelData = ctx.getImageData(x, y, 1, 1).data;
    const [r, g, b] = pixelData;

    // RGB to HEX
    const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b)
      .toString(16)
      .slice(1)}`;

    // RGB to HSL
    const rr = r / 255;
    const gg = g / 255;
    const bb = b / 255;
    const max = Math.max(rr, gg, bb);
    const min = Math.min(rr, gg, bb);
    let h = 0,
      s = 0,
      // eslint-disable-next-line prefer-const
      l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case rr:
          h = (gg - bb) / d + (gg < bb ? 6 : 0);
          break;
        case gg:
          h = (bb - rr) / d + 2;
          break;
        case bb:
          h = (rr - gg) / d + 4;
          break;
      }
      h /= 6;
    }

    return {
      hex,
      rgb: `rgb(${r}, ${g}, ${b})`,
      hsl: `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(
        l * 100
      )}%)`,
    };
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const color = getColorAtPoint(x, y);
    setSelectedColor(color);
  };

  return (
    <Card className="w-full">
      <CardContent className="space-y-4 p-6">
        <div
          className="border-2 border-dashed rounded-lg p-4 text-center"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          {!imageUrl ? (
            <div className="space-y-4">
              <div className="flex flex-col items-center gap-2">
                <Upload className="w-8 h-8 text-gray-400" />
                <Label htmlFor="image-upload" className="cursor-pointer">
                  이미지를 드래그하거나 클릭하여 업로드
                  <br />
                  또는 클립보드의 이미지를 붙여넣기 (Ctrl+V)
                </Label>
              </div>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageUpload(file);
                }}
              />
            </div>
          ) : (
            <div className="relative">
              <img
                ref={imageRef}
                src={imageUrl}
                alt="uploaded"
                className="max-w-full hidden"
                onLoad={handleImageLoad}
              />
              <canvas
                ref={canvasRef}
                onClick={handleCanvasClick}
                className={`max-w-full${
                  isPickerMode ? " cursor-crosshair" : "cursor-default"
                }`}
              />
              <div className="absolute top-2 right-2 space-x-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsPickerMode(!isPickerMode)}
                >
                  {isPickerMode ? "선택 모드 해제" : "색상 선택하기"}
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setImageUrl("");
                    setSelectedColor(null);
                  }}
                >
                  이미지 제거
                </Button>
              </div>
            </div>
          )}
        </div>

        {selectedColor && <ColorInfoDisplay color={selectedColor} />}
      </CardContent>
    </Card>
  );
}
