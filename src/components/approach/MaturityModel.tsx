"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import SectionWrapper from "@/components/shared/SectionWrapper";

// Map level names to their icon filenames (lowercase, kebab-case)
const levelIcons: Record<string, string> = {
  Access: "access",
  Heroes: "heroes",
  Operational: "operational",
  Integrated: "integrated",
  Native: "native",
};

const cardStyles = [
  { bg: "bg-periwinkle/30", border: "border-periwinkle/50", text: "text-zaffre", sub: "text-zaffre/70", label: "text-zaffre/60", panelBg: "bg-periwinkle/20", panelBorder: "border-periwinkle/40", panelText: "text-zaffre", panelSub: "text-zaffre/70", divider: "border-zaffre/20" },
  { bg: "bg-periwinkle/50", border: "border-periwinkle/60", text: "text-zaffre", sub: "text-zaffre/70", label: "text-zaffre/60", panelBg: "bg-periwinkle/30", panelBorder: "border-periwinkle/50", panelText: "text-zaffre", panelSub: "text-zaffre/70", divider: "border-zaffre/20" },
  { bg: "bg-zaffre/70", border: "border-zaffre/60", text: "text-white", sub: "text-white/90", label: "text-white/80", panelBg: "bg-zaffre/60", panelBorder: "border-zaffre/50", panelText: "text-white", panelSub: "text-white/85", divider: "border-white/20" },
  { bg: "bg-zaffre/85", border: "border-zaffre/70", text: "text-white", sub: "text-white/90", label: "text-white/80", panelBg: "bg-zaffre/75", panelBorder: "border-zaffre/60", panelText: "text-white", panelSub: "text-white/85", divider: "border-white/20" },
  { bg: "bg-zaffre", border: "border-zaffre", text: "text-white", sub: "text-white/90", label: "text-white/80", panelBg: "bg-zaffre/90", panelBorder: "border-zaffre/80", panelText: "text-white", panelSub: "text-white/85", divider: "border-white/20" },
];

interface Level {
  name: string;
  valueCaptured: string;
  valuePct: number;
  annualImpact: string;
  state: string;
  tell: string;
}

interface MaturityModelProps {
  headline?: string;
  subtext?: string;
  levels: Level[];
}

export default function MaturityModel({ headline, subtext, levels }: MaturityModelProps) {
  const [revealedLevels, setRevealedLevels] = useState<Set<number>>(new Set());

  const revealLevel = useCallback((level: number) => {
    setRevealedLevels((prev) => {
      if (prev.has(level)) return prev;
      const next = new Set(prev);
      next.add(level);
      return next;
    });
  }, []);

  return (
    <section className="py-10 md:py-14">
      <div className="mx-auto max-w-7xl px-6">
        <SectionWrapper>
          <h2 className="font-heading text-3xl md:text-4xl text-zaffre/70 mb-2">
            {headline || "Andus Maturity Model"}
          </h2>
          <p className="text-violet/70 mb-8">
            {subtext || "The first framework for human + AI readiness."}
          </p>
        </SectionWrapper>

        {/* Level cards + their expand panels */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-0">
          {levels.map((level, i) => {
            const levelNum = i + 1;
            const isRevealed = revealedLevels.has(levelNum);
            const style = cardStyles[i % cardStyles.length];
            return (
              <SectionWrapper key={level.name} delay={i * 0.08}>
                <div className="flex flex-col h-full">
                  {/* Card */}
                  <motion.div
                    className={`relative p-6 md:p-7 border cursor-pointer transition-all flex-1 ${style.bg} ${style.border} ${style.text}`}
                    onMouseEnter={() => revealLevel(levelNum)}
                    onClick={() => revealLevel(levelNum)}
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span
                      className={`absolute top-3 right-3 text-sm font-mono ${style.sub}`}
                    >
                      {isRevealed ? "\u2212" : "+"}
                    </span>

                    {/* Level icon */}
                    {levelIcons[level.name] && (
                      <div className="mb-6">
                        <Image
                          src={`/images/approach/icons/approach-maturity-model-${levelIcons[level.name]}-${i < 2 ? "zaffre" : "ivory"}.svg`}
                          alt={`${level.name} icon`}
                          width={80}
                          height={80}
                          className="w-20 h-20"
                        />
                      </div>
                    )}

                    <p
                      className={`text-sm tracking-wider uppercase mb-2 font-heading ${style.label}`}
                    >
                      Level {String(levelNum).padStart(2, "0")}
                    </p>
                    <h3 className="font-heading font-bold text-xl md:text-2xl mb-2">
                      {level.name}
                    </h3>
                    <p className={`text-sm leading-snug ${style.sub}`}>
                      {level.state}
                    </p>
                  </motion.div>

                  {/* Panel — once revealed, stays visible */}
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={
                      isRevealed
                        ? { opacity: 1, height: "auto" }
                        : { opacity: 0, height: 0 }
                    }
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <div
                      className={`p-5 md:p-6 border border-t-0 ${style.panelBg} ${style.panelBorder}`}
                    >
                      <div>
                        <div className="pb-4">
                          <p
                            className={`text-sm uppercase tracking-wider mb-2 font-bold ${style.panelSub}`}
                          >
                            Value Captured<sup>1</sup>
                          </p>
                          <div className="flex items-center gap-3">
                            <div className="flex-1 h-3.5 bg-white/20 rounded-sm overflow-hidden">
                              <motion.div
                                className="h-full bg-orange rounded-sm"
                                initial={{ width: 0 }}
                                animate={
                                  isRevealed
                                    ? { width: `${level.valuePct}%` }
                                    : { width: 0 }
                                }
                                transition={{
                                  duration: 0.5,
                                  delay: 0.15,
                                  ease: "easeOut",
                                }}
                              />
                            </div>
                            <span
                              className={`font-bold text-base ${style.panelText}`}
                            >
                              {level.valueCaptured}
                            </span>
                          </div>
                        </div>

                        <hr className={`${style.divider} mb-4`} />

                        <div className="pb-4">
                          <p
                            className={`text-sm uppercase tracking-wider mb-1.5 font-bold ${style.panelSub}`}
                          >
                            Annual Impact<sup>2</sup>
                          </p>
                          <p
                            className={`font-bold text-2xl md:text-3xl ${style.panelText}`}
                          >
                            {level.annualImpact}
                          </p>
                        </div>

                        <hr className={`${style.divider} mb-4`} />

                        <p
                          className={`text-base leading-relaxed italic ${style.panelSub}`}
                        >
                          {level.tell}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </SectionWrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}
