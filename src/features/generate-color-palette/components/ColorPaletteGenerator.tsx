"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ColorFormat, ColorShade, ColorPalette } from "../types";
import { Copy } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { adjustLightness } from "../lib/colorUtils";

const COLOR_SHADES: ColorShade[] = [
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
];

export function ColorPaletteGenerator() {
  const [colorFormat, setColorFormat] = useState<ColorFormat>("hex");
  const [baseShade, setBaseShade] = useState<ColorShade>("500");
  const [baseColor, setBaseColor] = useState("");
  const [palette, setPalette] = useState<ColorPalette | null>(null);
  const [selectedShade, setSelectedShade] = useState<ColorShade | null>(null);

  const generatePalette = () => {
    if (!baseColor) return;

    // 기준 음영에 따른 밝기 조정 계수
    const lightnessFactor = {
      "100": 1.8,
      "200": 1.6,
      "300": 1.4,
      "400": 1.2,
      "500": 1.0,
      "600": 0.8,
      "700": 0.6,
      "800": 0.4,
      "900": 0.2,
    };

    // 입력된 색상을 기준으로 팔레트 생성
    const newPalette: ColorPalette = {};

    COLOR_SHADES.forEach((shade) => {
      const factor = lightnessFactor[shade] / lightnessFactor[baseShade];
      newPalette[shade] = adjustLightness(baseColor, colorFormat, factor);
    });

    setPalette(newPalette);
  };

  const copyToClipboard = async (format: "text" | "css" | "react") => {
    if (!palette) return;

    let content = "";
    switch (format) {
      case "text":
        content = Object.entries(palette)
          .map(([shade, color]) => `${shade}: ${color}`)
          .join("\n");
        break;
      case "css":
        content = Object.entries(palette)
          .map(([shade, color]) => `--color-${shade}: ${color};`)
          .join("\n");
        break;
      case "react":
        content = `const colors = ${JSON.stringify(palette, null, 2)};`;
        break;
    }

    await navigator.clipboard.writeText(content);
    alert("클립보드에 복사되었습니다!");
  };

  const handleColorBlockClick = (shade: ColorShade) => {
    setSelectedShade(shade);
  };

  const handleColorAdjustment = (newColor: string) => {
    if (!selectedShade || !palette) return;

    setPalette({
      ...palette,
      [selectedShade]: newColor,
    });
  };

  const validateColorInput = (color: string, format: ColorFormat): boolean => {
    const patterns = {
      hex: /^#[0-9A-Fa-f]{6}$/,
      rgb: /^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/,
      hsl: /^hsl\(\s*\d+\s*,\s*\d+%?\s*,\s*\d+%?\s*\)$/,
      oklch: /^oklch\(\s*[\d.]+%?\s+[\d.]+\s+[\d.]+\s*\)$/,
    };

    return patterns[format].test(color);
  };

  const handleBaseColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setBaseColor(newColor);

    if (validateColorInput(newColor, colorFormat)) {
      generatePalette();
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="space-y-4 p-6">
        <div className="space-y-2">
          <Label>색상 형식</Label>
          <RadioGroup
            value={colorFormat}
            onValueChange={(value) => setColorFormat(value as ColorFormat)}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="hex" id="hex" />
              <Label htmlFor="hex">HEX</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="rgb" id="rgb" />
              <Label htmlFor="rgb">RGB</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="hsl" id="hsl" />
              <Label htmlFor="hsl">HSL</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="oklch" id="oklch" />
              <Label htmlFor="oklch">OKLCH</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label>기준 색상</Label>
          <div className="flex gap-2">
            <Input
              value={baseColor}
              onChange={handleBaseColorChange}
              placeholder={
                colorFormat === "hex"
                  ? "#000000"
                  : colorFormat === "rgb"
                  ? "rgb(0, 0, 0)"
                  : colorFormat === "hsl"
                  ? "hsl(0, 0%, 0%)"
                  : "oklch(0% 0 0)"
              }
            />
            <Select
              value={baseShade}
              onValueChange={(value) => {
                setBaseShade(value as ColorShade);
                if (baseColor && validateColorInput(baseColor, colorFormat)) {
                  generatePalette();
                }
              }}
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {COLOR_SHADES.map((shade) => (
                  <SelectItem key={shade} value={shade}>
                    {shade}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {palette && (
          <div className="space-y-4">
            <div className="grid grid-cols-9 gap-2">
              {COLOR_SHADES.map((shade) => (
                <div key={shade} className="space-y-2 text-center">
                  <div
                    className="w-full h-12 rounded-md cursor-pointer hover:ring-2 hover:ring-primary transition-all"
                    style={{ backgroundColor: palette[shade] }}
                    onClick={() => handleColorBlockClick(shade)}
                  />
                  <span className="text-sm">{shade}</span>
                </div>
              ))}
            </div>

            <Dialog
              open={selectedShade !== null}
              onOpenChange={() => setSelectedShade(null)}
            >
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{selectedShade} 색상 조정</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    type="color"
                    value={
                      selectedShade && palette
                        ? palette[selectedShade]
                        : "#000000"
                    }
                    onChange={(e) => handleColorAdjustment(e.target.value)}
                    className="w-full h-40"
                  />
                  <Input
                    type="text"
                    value={
                      selectedShade && palette ? palette[selectedShade] : ""
                    }
                    onChange={(e) => handleColorAdjustment(e.target.value)}
                    placeholder="#000000"
                  />
                </div>
              </DialogContent>
            </Dialog>

            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => copyToClipboard("text")}
              >
                텍스트로 복사
                <Copy className="w-4 h-4 ml-2" />
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => copyToClipboard("css")}
              >
                CSS로 복사
                <Copy className="w-4 h-4 ml-2" />
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => copyToClipboard("react")}
              >
                React로 복사
                <Copy className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
