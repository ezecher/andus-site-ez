"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ORANGE = "#FF4F01";

function CurvedArrow({
  direction,
  delay = 0,
  isInView,
}: {
  direction: "down" | "up";
  delay?: number;
  isInView: boolean;
}) {
  if (direction === "down") {
    return (
      <svg
        width="36"
        height="40"
        viewBox="0 0 36 40"
        fill="none"
        className="mx-auto"
        aria-hidden
      >
        <defs>
          <marker
            id="arrow-down"
            markerWidth="5"
            markerHeight="4"
            refX="4"
            refY="2"
            orient="auto"
          >
            <polygon points="0 0, 5 2, 0 4" fill={ORANGE} />
          </marker>
        </defs>
        <motion.path
          d="M 20 2 C 4 6, 2 28, 16 36"
          stroke={ORANGE}
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
          markerEnd="url(#arrow-down)"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 1, delay, ease: "easeOut" }}
        />
      </svg>
    );
  }

  return (
    <svg
      width="36"
      height="40"
      viewBox="0 0 36 40"
      fill="none"
      className="mx-auto"
      aria-hidden
    >
      <defs>
        <marker
          id="arrow-up"
          markerWidth="5"
          markerHeight="4"
          refX="4"
          refY="2"
          orient="auto"
        >
          <polygon points="0 0, 5 2, 0 4" fill={ORANGE} />
        </marker>
      </defs>
      <motion.path
        d="M 16 38 C 32 34, 34 12, 20 4"
        stroke={ORANGE}
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
        markerEnd="url(#arrow-up)"
        initial={{ pathLength: 0 }}
        animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 1, delay, ease: "easeOut" }}
      />
    </svg>
  );
}

export default function FormulaSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-violet text-cream py-10 md:py-12 relative overflow-hidden">
      <div className="absolute inset-0 flex justify-center">
        <div
          className="w-full max-w-3xl h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='36'%3E%3Cpath d='M18 15v6M15 18h6' stroke='%237884FF' stroke-width='0.75' fill='none' opacity='0.35'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        />
      </div>
      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex flex-col items-center">
            <div
              className="grid items-baseline gap-x-2 sm:gap-x-3 md:gap-x-5 gap-y-0 text-center font-mono tracking-tight max-w-2xl w-full mx-auto"
              style={{ gridTemplateColumns: "1fr auto 1fr auto 1fr" }}
            >
              {/* Row 1: "You've got" label + arrow — fade in together */}
              <motion.div
                className="flex flex-col items-center pb-1"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
              >
                <span className="text-orange text-[10px] sm:text-sm font-body tracking-wider uppercase">
                  You&apos;ve got
                </span>
                <CurvedArrow direction="down" delay={0.8} isInView={isInView} />
              </motion.div>
              <div />
              <div />
              <div />
              <div />

              {/* Row 2: equation */}
              <span className="text-2xl sm:text-4xl md:text-6xl text-cream flex justify-center">
                AI
              </span>
              <span className="text-2xl sm:text-4xl md:text-6xl text-cream/50">×</span>
              <span className="text-2xl sm:text-4xl md:text-6xl text-cream flex justify-center">
                human
              </span>
              <span className="text-2xl sm:text-4xl md:text-6xl text-cream/50">=</span>
              <span className="text-2xl sm:text-4xl md:text-6xl text-cream flex justify-center">
                value
              </span>

              {/* Row 3: sub-labels */}
              <span className="text-cream/80 text-[10px] sm:text-xs tracking-wider uppercase pt-2 flex justify-center">
                Capability
              </span>
              <div />
              <span className="text-cream/80 text-[10px] sm:text-xs tracking-wider uppercase pt-2 flex justify-center">
                Readiness
              </span>
              <div />
              <div />

              {/* Row 4: "we solve for" + arrow — fade in together, later */}
              <div />
              <div />
              <motion.div
                className="flex flex-col items-center pt-1"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 1.4, ease: "easeOut" }}
              >
                <CurvedArrow direction="up" delay={1.6} isInView={isInView} />
                <span className="text-orange text-[10px] sm:text-sm font-body tracking-wider uppercase">
                  we solve for
                </span>
              </motion.div>
              <div />
              <div />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
