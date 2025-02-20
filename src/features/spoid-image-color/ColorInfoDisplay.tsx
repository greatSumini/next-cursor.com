import { ColorInfo } from "./types";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

interface Props {
  color: ColorInfo;
}

export function ColorInfoDisplay({ color }: Props) {
  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    alert("클립보드에 복사되었습니다!");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div
          className="w-16 h-16 rounded-lg shadow-inner"
          style={{ backgroundColor: color.hex }}
        />
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
          {Object.entries(color).map(([format, value]) => (
            <Button
              key={format}
              variant="outline"
              className="justify-between"
              onClick={() => handleCopy(value)}
            >
              <span className="font-mono">{value}</span>
              <Copy className="w-4 h-4 ml-2" />
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
