"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const sections = [
    {
      id: "prompts",
      title: "프롬프트 생성기",
      items: [
        { name: "PRD 프롬프트 생성기", href: "/prd" },
        { name: "IA 프롬프트 생성기", href: "/ia" },
        { name: "유스케이스 프롬프트 생성기", href: "/usecases" },
      ],
    },
    {
      id: "dev",
      title: "개발자 도구",
      items: [{ name: "HTML Table to JSON", href: "/dev/table-to-json" }],
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/logo.png" alt="Next-Cursor" width={28} height={28} />
          <span className="font-bold">Next-Cursor.com</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {sections.map((section) => (
            <DropdownMenu key={section.id}>
              <DropdownMenuTrigger className="flex items-center space-x-1 text-foreground/60 hover:text-foreground/80 rounded-md px-2 py-1">
                {section.title} <ChevronDown size={16} />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {section.items.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "w-full",
                        pathname === item.href
                          ? "text-foreground"
                          : "text-foreground/60"
                      )}
                    >
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
        </nav>

        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {isMenuOpen && (
          <div
            className="md:hidden absolute top-14 left-0 right-0 bg-background border-b
            transition-all duration-200 ease-in-out transform origin-top
            animate-in slide-in-from-top-5"
          >
            <nav className="px-6 py-4">
              {sections.map((section) => (
                <div key={section.id} className="mb-4">
                  <div className="text-sm font-bold text-foreground/80 mb-1">
                    {section.title}
                  </div>
                  {section.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "block py-2 transition-colors hover:text-foreground/80",
                        pathname === item.href
                          ? "text-foreground"
                          : "text-foreground/60"
                      )}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
