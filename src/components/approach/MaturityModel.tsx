"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "@/components/shared/SectionWrapper";

const cardStyles = [
  { bg: "bg-periwinkle/30", border: "border-periwinkle/50", text: "text-violet", sub: "text-violet/60", label: "text-cinerous", panelBg: "bg-periwinkle/20", panelBorder: "border-periwinkle/40", panelText: "text-violet", panelSub: "text-violet/70" },
  { bg: "bg-periwinkle/50", border: "border-periwinkle/60", text: "text-violet", sub: "text-violet/70", label: "text-cinerous", panelBg: "bg-periwinkle/30", panelBorder: "border-periwinkle/50", panelText: "text-violet", panelSub: "text-violet/70" },
  { bg: "bg-zaffre/70", border: "border-zaffre/60", text: "text-cream", sub: "text-cream/70", label: "text-cream/50", panelBg: "bg-zaffre/60", panelBorder: "border-zaffre/50", panelText: "text-cream", panelSub: "text-cream/70" },
  { bg: "bg-zaffre/85", border: "border-zaffre/70", text: "text-cream", sub: "text-cream/70", label: "text-cream/50", panelBg: "bg-zaffre/75", panelBorder: "border-zaffre/60", panelText: "text-cream", panelSub: "text-cream/70" },
  { bg: "bg-zaffre", border: "border-zaffre", text: "text-cream", sub: "text-cream/70", label: "text-cream/50", panelBg: "bg-zaffre/90", panelBorder: "border-zaffre/80", panelText: "text-cream", panelSub: "text-cream/70" },
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
                    className={`relative p-5 md:p-6 border cursor-pointer transition-all flex-1 ${style.bg} ${style.border} ${style.text}`}
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

                    <p
                      className={`text-xs tracking-wider uppercase mb-2 font-heading ${style.label}`}
                    >
                      Level {String(levelNum).padStart(2, "0")}
                    </p>
                    <h3 className="font-heading font-bold text-xl mb-3">
                      {level.name}
                    </h3>
                    <p className={`text-sm leading-relaxed ${style.sub}`}>
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
                      className={`p-4 md:p-5 border border-t-0 ${style.panelBg} ${style.panelBorder}`}
                    >
                      <div className="space-y-4">
                        <div>
                          <p
                            className={`text-xs uppercase tracking-wider mb-1 font-heading ${style.panelSub}`}
                          >
                            Value Captured
                          </p>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2.5 bg-white/20 rounded-full overflow-hidden">
                              <motion.div
                                className="h-full bg-orange rounded-full"
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
                              className={`font-heading font-bold text-sm ${style.panelText}`}
                            >
                              {level.valueCaptured}
                            </span>
                          </div>
                        </div>

                        <div>
                          <p
                            className={`text-xs uppercase tracking-wider mb-1 font-heading ${style.panelSub}`}
                          >
                            Annual Impact
                          </p>
                          <p
                            className={`font-heading font-bold text-xl ${style.panelText}`}
                          >
                            {level.annualImpact}
                          </p>
                        </div>

                        <p
                          className={`text-sm leading-relaxed italic ${style.panelSub}`}
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
