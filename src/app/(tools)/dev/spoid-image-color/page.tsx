import { SpoidImageColorPage } from "@/features/spoid-image-color/page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "이미지 컬러 추출기",
  description: "업로드한 이미지의 지점 색상 정보를 추출합니다.",
};

export default function Page() {
  return <SpoidImageColorPage />;
}
