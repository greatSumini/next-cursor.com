import { ColorFormat, ColorValue } from "../types";

export function hexToRgb(hex: string): number[] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : [0, 0, 0];
}

export function rgbToHex(r: number, g: number, b: number): string {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

export function rgbToHsl(r: number, g: number, b: number): number[] {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

export function hslToRgb(h: number, s: number, l: number): number[] {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number, k = (n + h / 30) % 12) =>
    l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  return [
    Math.round(f(0) * 255),
    Math.round(f(8) * 255),
    Math.round(f(4) * 255),
  ];
}

export function generatePaletteFromColor(
  baseColor: string,
  baseShade: string
): ColorValue[] {
  // 1. 기본 색상을 RGB로 변환
  const baseRgb = hexToRgb(baseColor);

  // 2. RGB를 HSL로 변환
  const [h, s, l] = rgbToHsl(baseRgb[0], baseRgb[1], baseRgb[2]);

  // 3. 기본 음영값을 숫자로 변환
  const baseShadeNum = parseInt(baseShade);

  // 4. 각 음영 단계별 HSL 조정값 정의
  const shadeAdjustments: { [key: number]: [number, number] } = {
    50: [0.8, 0.15], // 높은 명도, 낮은 채도
    100: [0.7, 0.3],
    200: [0.6, 0.4],
    300: [0.5, 0.6],
    400: [0.4, 0.8],
    500: [0.3, 1], // 기준 색상
    600: [0.25, 1.1],
    700: [0.2, 1.2],
    800: [0.15, 1.3],
    900: [0.1, 1.4], // 낮은 명도, 높은 채도
  };

  // 5. 현재 색상의 상대적 위치 계산
  const currentAdjustment = shadeAdjustments[baseShadeNum];
  if (!currentAdjustment) {
    throw new Error("Invalid base shade");
  }

  // 6. 기준 채도와 명도 계산
  const baseSaturation = s / currentAdjustment[1];
  const baseLightness = l / currentAdjustment[0];

  // 7. 각 음영별 색상 생성
  const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

  return shades.map((shade) => {
    const [lightnessMultiplier, saturationMultiplier] = shadeAdjustments[shade];

    // 채도와 명도 조정
    let adjustedSaturation = Math.min(
      100,
      baseSaturation * saturationMultiplier
    );
    let adjustedLightness = Math.min(100, baseLightness * lightnessMultiplier);

    // 극단적인 값 방지
    adjustedSaturation = Math.max(0, Math.min(100, adjustedSaturation));
    adjustedLightness = Math.max(0, Math.min(100, adjustedLightness));

    // HSL -> RGB -> HEX 변환
    const rgb = hslToRgb(h, adjustedSaturation, adjustedLightness);
    const hex = rgbToHex(rgb[0], rgb[1], rgb[2]);

    return {
      hex,
      rgb: `rgb(${rgb.join(", ")})`,
      hsl: `hsl(${h}, ${Math.round(adjustedSaturation)}%, ${Math.round(
        adjustedLightness
      )}%)`,
    };
  });
}

// OKLCH 관련 유틸리티 함수 추가
export function parseOklch(oklchStr: string): {
  l: number;
  c: number;
  h: number;
} {
  const match = oklchStr.match(/oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)\)/);
  if (!match) return { l: 0, c: 0, h: 0 };
  return {
    l: parseFloat(match[1]),
    c: parseFloat(match[2]),
    h: parseFloat(match[3]),
  };
}

export function oklchToHex(oklchStr: string): string {
  const { l, c, h } = parseOklch(oklchStr);
  // OKLCH to sRGB 변환 (간단한 근사치 사용)
  const r = Math.round(255 * l);
  const g = Math.round(255 * (l - c * Math.cos((h * Math.PI) / 180)));
  const b = Math.round(255 * (l - c * Math.sin((h * Math.PI) / 180)));
  return rgbToHex(r, g, b);
}

export function adjustLightness(
  color: string,
  format: ColorFormat,
  factor: number
): string {
  switch (format) {
    case "oklch": {
      const { l, c, h } = parseOklch(color);
      return `oklch(${l * factor} ${c} ${h})`;
    }
    case "hex": {
      const rgb = hexToRgb(color);
      const [h, s, l] = rgbToHsl(rgb[0], rgb[1], rgb[2]);
      const newRgb = hslToRgb(h, s, l * factor);
      return rgbToHex(newRgb[0], newRgb[1], newRgb[2]);
    }
    // RGB와 HSL도 비슷한 방식으로 구현
    default:
      return color;
  }
}
