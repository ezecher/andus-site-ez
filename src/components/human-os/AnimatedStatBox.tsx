"use client";

import { motion, useInView, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface AnimatedStatBoxProps {
  statHeadline?: string;
  statLabel?: string;
  statLeftValue?: string;
  statLeftLabel?: string;
  statRightValue?: string;
  statRightLabel?: string;
  statBarPercent?: number;
  statSource?: string;
}

function CountUp({
  target,
  duration = 1.2,
  delay = 0,
  started,
}: {
  target: number;
  duration?: number;
  delay?: number;
  started: boolean;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!started) return;
    const timeout = setTimeout(() => {
      const controls = animate(0, target, {
        duration,
        ease: "easeOut",
        onUpdate: (v) => setValue(Math.round(v)),
      });
      return () => controls.stop();
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [started, target, duration, delay]);

  return <>{value}</>;
}

export default function AnimatedStatBox({
  statHeadline = "$190B",
  statLabel = "Unrealized",
  statLeftValue = "$10B",
  statLeftLabel = "Value Realized to Date",
  statRightValue = "$200B",
  statRightLabel = "Enterprise AI Investment (2025)",
  statBarPercent = 5,
  statSource = "Sources: Goldman Sachs, Menlo Ventures, MIT",
}: AnimatedStatBoxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  const [phase, setPhase] = useState(0);
  const [bracketWidth, setBracketWidth] = useState(0);

  // Measure the container so we can build the SVG in pixel coords
  useEffect(() => {
    if (!containerRef.current) return;
    const measure = () => {
      const w = containerRef.current?.offsetWidth ?? 0;
      // Subtract padding (p-8 = 32px each side, md:p-12 = 48px)
      const padding = window.innerWidth >= 768 ? 96 : 64;
      setBracketWidth(w - padding);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    if (!isInView) return;
    const t1 = setTimeout(() => setPhase(1), 400);
    const t2 = setTimeout(() => setPhase(2), 2200);
    const t3 = setTimeout(() => setPhase(3), 3600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [isInView]);

  const realizedPercent = statBarPercent ?? 5;

  // Bracket pixel coordinates
  const bLeft = bracketWidth * (realizedPercent / 100);
  const bRight = bracketWidth;
  const bMid = (bLeft + bRight) / 2;
  const bHeight = 40;
  const tipY = bHeight - 4;
  const topY = 4;

  // Build the bracket path: two arms meeting at a center tip
  // Each arm is a horizontal line that curves smoothly to the tip
  const bracketPath = bracketWidth > 0
    ? [
        // Left arm
        `M ${bLeft},${topY}`,
        `C ${bLeft + (bMid - bLeft) * 0.15},${topY} ${bMid - (bMid - bLeft) * 0.15},${tipY} ${bMid},${tipY}`,
        // Right arm (drawn as a separate subpath so both draw simultaneously)
        `M ${bRight},${topY}`,
        `C ${bRight - (bRight - bMid) * 0.15},${topY} ${bMid + (bRight - bMid) * 0.15},${tipY} ${bMid},${tipY}`,
      ].join(" ")
    : "";

  return (
    <div ref={containerRef} className="bg-cream p-8 md:p-12 md:ml-8">
      <div className="space-y-4">
        {/* Headline - $190B UNREALIZED */}
        <div className="text-center" style={{ minHeight: "5.5rem" }}>
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={phase >= 3 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="text-orange font-body text-5xl md:text-6xl">
              {phase >= 3 ? (
                <>
                  $
                  <CountUp target={190} duration={1.2} delay={0} started={phase >= 3} />
                  B
                </>
              ) : (
                <span className="opacity-0">{statHeadline}</span>
              )}
            </p>
            <p className="text-orange text-xs tracking-[0.2em] uppercase mt-2 font-bold">
              {statLabel}
            </p>
          </motion.div>
        </div>

        {/* Bracket / curly brace */}
        <div style={{ height: `${bHeight}px` }}>
          {bracketWidth > 0 && (
            <motion.svg
              width={bracketWidth}
              height={bHeight}
              viewBox={`0 0 ${bracketWidth} ${bHeight}`}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              initial={{ opacity: 0 }}
              animate={phase >= 3 ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              <motion.path
                d={bracketPath}
                stroke="#FF4F01"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={phase >= 3 ? { pathLength: 1 } : {}}
                transition={{ duration: 1, ease: "easeInOut" }}
              />
            </motion.svg>
          )}
        </div>

        {/* Progress bar */}
        <div className="relative h-20 md:h-24 rounded overflow-hidden bg-periwinkle/30">
          {/* Full $200B bar — zaffre */}
          <motion.div
            className="absolute inset-0 rounded"
            style={{ background: "#0C1D98", transformOrigin: "left" }}
            initial={{ scaleX: 0 }}
            animate={phase >= 1 ? { scaleX: 1 } : {}}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          />

          {/* Realized portion — periwinkle */}
          <motion.div
            className="absolute top-0 left-0 h-full rounded-l"
            style={{
              width: `${realizedPercent}%`,
              background: "#DCD6F7",
              originX: 0,
              transformOrigin: "left",
            }}
            initial={{ scaleX: 0 }}
            animate={phase >= 2 ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />

          {/* Divider line */}
          <motion.div
            className="absolute top-0 h-full"
            style={{ left: `${realizedPercent}%`, width: "2px", background: "rgba(250,245,234,0.5)" }}
            initial={{ opacity: 0 }}
            animate={phase >= 2 ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Left and right values */}
        <div className="flex justify-between items-start pt-2">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={phase >= 2 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="font-body text-2xl text-violet">
              {statLeftValue}
            </p>
            <p className="text-violet text-[10px] uppercase tracking-[0.15em] font-bold leading-tight mt-1">
              {statLeftLabel}
            </p>
          </motion.div>

          <motion.div
            className="text-right"
            initial={{ opacity: 0, y: 10 }}
            animate={phase >= 1 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          >
            <p className="font-body text-2xl text-violet">
              {statRightValue}
            </p>
            <p className="text-violet text-[10px] uppercase tracking-[0.15em] font-bold leading-tight mt-1">
              {statRightLabel}
            </p>
          </motion.div>
        </div>

        {/* Source attribution */}
        {statSource && (
          <motion.p
            className="text-cinerous text-xs pt-2"
            initial={{ opacity: 0 }}
            animate={phase >= 3 ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {statSource}
          </motion.p>
        )}
      </div>
    </div>
  );
}
