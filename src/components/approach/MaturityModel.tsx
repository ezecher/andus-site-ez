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

const levels = [
  {
    level: 1,
    name: "Access",
    valueCaptured: "5–10%",
    valuePct: 7,
    annualImpact: "$50–100K",
    state: "AI deployed. Committed users are the exception.",
    tell: '"Who\'s driving AI?" The room goes quiet.',
  },
  {
    level: 2,
    name: "Heroes",
    valueCaptured: "15–25%",
    valuePct: 20,
    annualImpact: "$250–500K",
    state: "AI working in isolated areas. Heroes, not systems.",
    tell: '"You should talk to Sarah. She\'s figured this out."',
  },
  {
    level: 3,
    name: "Operational",
    valueCaptured: "30–50%",
    valuePct: 40,
    annualImpact: "$1–2M",
    state: "Human OS emerging. Systematic approach beginning.",
    tell: '"What\'s the business case library look like?" It exists.',
  },
  {
    level: 4,
    name: "Integrated",
    valueCaptured: "60–80%",
    valuePct: 70,
    annualImpact: "$3–5M",
    state: "Human OS functioning. Work moves faster and gets better.",
    tell: "Same team, half the cycle time, better output.",
  },
  {
    level: 5,
    name: "Native",
    valueCaptured: "80–100%",
    valuePct: 90,
    annualImpact: "$8–15M",
    state: "Human OS fully operational. The impossible becomes normal.",
    tell: '"You\'re the case study others benchmark against."',
  },
];

export default function MaturityModel() {
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
            Andus Maturity Model
          </h2>
          <p className="text-violet/70 mb-8">
            The first framework for human + AI readiness.
          </p>
        </SectionWrapper>

        {/* Level cards + their expand panels */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-0">
          {levels.map((level, i) => {
            const isRevealed = revealedLevels.has(level.level);
            const style = cardStyles[i];
            return (
              <SectionWrapper key={level.level} delay={i * 0.08}>
                <div className="flex flex-col h-full">
                  {/* Card */}
                  <motion.div
                    className={`relative p-5 md:p-6 border cursor-pointer transition-all flex-1 ${style.bg} ${style.border} ${style.text}`}
                    onMouseEnter={() => revealLevel(level.level)}
                    onClick={() => revealLevel(level.level)}
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span
                      className={`absolute top-3 right-3 text-sm font-mono ${style.sub}`}
                    >
                      {isRevealed ? "−" : "+"}
                    </span>

                    <p
                      className={`text-xs tracking-wider uppercase mb-2 font-heading ${style.label}`}
                    >
                      Level {String(level.level).padStart(2, "0")}
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
