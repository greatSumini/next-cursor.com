import { GenerateColorPalettePage } from "@/features/generate-color-palette/page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "컬러 팔레트 생성기",
  description:
    "hex, hsl, rgb, oklch 코드를 입력받아 100~900 컬러 팔레트를 생성합니다.",
};

export default function Page() {
  return <GenerateColorPalettePage />;
}
