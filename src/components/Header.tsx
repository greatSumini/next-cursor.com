"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
        { name: "PRD", href: "/prd" },
        { name: "IA", href: "/ia" },
        { name: "유스케이스", href: "/usecases" },
        { name: "디자인", href: "/design" },
      ],
    },
    {
      id: "dev",
      title: "개발자 도구",
      items: [
        { name: "HTML Table to JSON", href: "/dev/table-to-json" },
        { name: "이미지 색상 추출기", href: "/dev/spoid-image-color" },
      ],
    },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex h-14 items-center justify-between">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo.png" alt="Next-Cursor" width={28} height={28} />
            <span className="font-bold">Next-Cursor.com</span>
          </Link>
        </motion.div>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <DropdownMenu>
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
            </motion.div>
          ))}
        </nav>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden absolute top-14 left-0 right-0 bg-background border-b overflow-hidden"
            >
              <nav className="px-6 py-4">
                {sections.map((section, sectionIndex) => (
                  <motion.div
                    key={section.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * sectionIndex }}
                    className="mb-4"
                  >
                    <div className="text-sm font-bold text-foreground/80 mb-1">
                      {section.title}
                    </div>
                    {section.items.map((item, itemIndex) => (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * (sectionIndex + itemIndex) }}
                      >
                        <Link
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
                      </motion.div>
                    ))}
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
