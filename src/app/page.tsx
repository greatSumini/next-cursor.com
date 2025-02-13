import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Next-Cursor.com",
  description:
    "Cursor를 Next-Level로 활용할 수 있게 해주는 도구 & 팁 모음 사이트",
};

export default function Page() {
  const tools = [
    {
      title: "PRD 프롬프트 생성기",
      description:
        "PRD(Product Requirements Document) 작성을 위한 프롬프트를 생성합니다.",
      href: "/prd",
    },
    {
      title: "IA 프롬프트 생성기",
      description: "Information Architecture 프롬프트 생성기",
      href: "/ia",
    },
    {
      title: "HTML Table to JSON 변환기",
      description: "HTML 테이블을 JSON 형식으로 변환합니다.",
      href: "/dev/table-to-json",
      dev: true,
    },
  ];

  return (
    <div className="container max-w-4xl py-12 space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Next-Cursor.com</h1>
        <p className="text-muted-foreground">
          Cursor를 Next-Level로 활용할 수 있게 해주는 도구 & 팁 모음 사이트
          <br />
          디자인은 리뉴얼 예정입니다 😅
        </p>
      </div>

      <h3 className="text-lg font-semibold">커서 개발 도구들</h3>
      <div className="grid gap-6 sm:grid-cols-2 mb-20">
        {tools
          .filter((tool) => !tool.dev)
          .map((tool) => (
            <Card key={tool.href}>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold">{tool.title}</h2>
                  <p className="text-sm text-muted-foreground">
                    {tool.description}
                  </p>
                </div>
                <Button asChild className="w-full">
                  <Link href={tool.href}>바로가기</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
      </div>
      <h3 className="text-lg font-semibold">개발 편의 도구들</h3>
      <div className="grid gap-6 sm:grid-cols-2">
        {tools
          .filter((tool) => tool.dev)
          .map((tool) => (
            <Card key={tool.href}>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold">{tool.title}</h2>
                  <p className="text-sm text-muted-foreground">
                    {tool.description}
                  </p>
                </div>
                <Button asChild className="w-full">
                  <Link href={tool.href}>바로가기</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
}
