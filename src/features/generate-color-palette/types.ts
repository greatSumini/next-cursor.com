export type ColorFormat = "hex" | "rgb" | "hsl" | "oklch";
export type ColorShade =
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900";

export interface ColorPalette {
  [key: string]: string; // 100: "#ffffff" 형태로 저장
}

export interface ColorValue {
  hex: string;
  rgb: string;
  hsl: string;
}
