"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

export function TableToJsonConverter() {
  const [htmlInput, setHtmlInput] = useState("");
  const [jsonOutput, setJsonOutput] = useState("");

  const convertTableToJson = (html: string) => {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const table = doc.querySelector("table");

      if (!table) {
        throw new Error("테이블을 찾을 수 없습니다");
      }

      const headers = Array.from(table.querySelectorAll("th")).map(
        (th) => th.textContent?.trim() || ""
      );
      const rows = Array.from(table.querySelectorAll("tr")).slice(1);

      const result = rows.map((row) => {
        const cells = Array.from(row.querySelectorAll("td"));
        return headers.reduce((obj, header, index) => {
          obj[header] = cells[index]?.textContent?.trim() || "";
          return obj;
        }, {} as Record<string, string>);
      });

      return JSON.stringify(result, null, 2);
    } catch (error) {
      console.error("변환 중 오류 발생:", error);
      return "";
    }
  };

  const handleConvert = () => {
    const result = convertTableToJson(htmlInput);
    setJsonOutput(result);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(jsonOutput);
      alert("클립보드에 복사되었습니다!");
    } catch {
      alert("복사 중 오류가 발생했습니다.");
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="space-y-4 p-6">
        <div className="space-y-2">
          <Label htmlFor="html-input">HTML 테이블 입력</Label>
          <Textarea
            id="html-input"
            value={htmlInput}
            onChange={(e) => setHtmlInput(e.target.value)}
            placeholder="여기에 HTML 테이블을 붙여넣으세요..."
            className="min-h-[160px] dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>

        <Button onClick={handleConvert} className="w-full sm:w-auto">
          변환하기
        </Button>

        {jsonOutput && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="json-output">JSON 결과</Label>
              <Button onClick={handleCopy} variant="outline" size="sm">
                복사하기
              </Button>
            </div>
            <pre className="w-full p-3 bg-gray-50 dark:bg-gray-800 dark:text-white rounded-lg overflow-auto">
              <code className="text-sm">{jsonOutput}</code>
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
