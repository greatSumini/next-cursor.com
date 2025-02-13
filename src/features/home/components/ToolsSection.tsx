"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface Tool {
  title: string;
  description: string;
  href: string;
  dev?: boolean;
}

interface Props {
  title: string;
  tools: Tool[];
}

// 컨테이너 애니메이션
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      staggerChildren: 0.1,
      delayChildren: 0.7,
    },
  },
};

// 카드 아이템 애니메이션
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
    },
  },
};

export function ToolsSection({ title, tools }: Props) {
  return (
    <motion.div
      className="mb-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <motion.h3 className="text-lg font-semibold mb-2" variants={itemVariants}>
        {title}
      </motion.h3>
      <div className="grid gap-6 sm:grid-cols-2">
        {tools.map((tool) => (
          <motion.div key={tool.href} variants={itemVariants}>
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <h2 className="text-xl font-bold">{tool.title}</h2>
                  <p className="text-sm text-muted-foreground">
                    {tool.description}
                  </p>
                </div>
                <Button
                  asChild
                  variant="outline"
                  className="w-full hover:text-white"
                >
                  <Link href={tool.href}>
                    바로가기 <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
