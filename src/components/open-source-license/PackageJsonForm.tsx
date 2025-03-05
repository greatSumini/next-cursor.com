import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

interface PackageJsonFormProps {
  onSubmit: (packageJsonString: string) => void;
  isLoading: boolean;
}

export function PackageJsonForm({ onSubmit, isLoading }: PackageJsonFormProps) {
  const [packageJsonString, setPackageJsonString] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    try {
      // 간단한 유효성 검사
      if (!packageJsonString.trim()) {
        setError("package.json 내용을 입력해주세요.");
        return;
      }

      // JSON 형식 검사
      JSON.parse(packageJsonString);

      // 오류 초기화
      setError(null);

      // 부모 컴포넌트로 전달
      onSubmit(packageJsonString);
    } catch {
      setError(
        "유효하지 않은 JSON 형식입니다. package.json 내용을 정확히 입력해주세요."
      );
    }
  };

  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setPackageJsonString(clipboardText);
      setError(null);
    } catch {
      setError("클립보드에서 텍스트를 가져오는 데 실패했습니다.");
    }
  };

  const handleClear = () => {
    setPackageJsonString("");
    setError(null);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>package.json 입력</CardTitle>
        <CardDescription>
          package.json 파일의 내용을 붙여넣어 오픈소스 라이선스 문서를
          생성합니다.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={handlePaste} type="button">
              클립보드에서 붙여넣기
            </Button>
            <Button variant="outline" onClick={handleClear} type="button">
              초기화
            </Button>
          </div>

          <Textarea
            placeholder="package.json 내용을 여기에 붙여넣으세요..."
            value={packageJsonString}
            onChange={(e) => setPackageJsonString(e.target.value)}
            className="min-h-[300px] font-mono text-sm"
          />

          {error && (
            <div className="bg-destructive/15 text-destructive p-3 rounded-md flex items-start gap-2">
              <AlertCircle className="h-4 w-4 mt-0.5" />
              <p className="text-sm">{error}</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleSubmit}
          disabled={isLoading || !packageJsonString.trim()}
          className="w-full"
        >
          {isLoading ? "처리 중..." : "라이선스 문서 생성하기"}
        </Button>
      </CardFooter>
    </Card>
  );
}
