import { TableToJsonPage } from "@/features/table-to-json/page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "HTML Table to JSON Converter",
  description: "HTML Table element를 JSON으로 변환합니다.",
};

export default function Page() {
  return <TableToJsonPage />;
}
