"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface Lever {
  title: string;
  description: string;
}

interface AnimatedLeversProps {
  levers: Lever[];
}

export default function AnimatedLevers({ levers }: AnimatedLeversProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    if (!isInView) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    levers.forEach((_, i) => {
      timers.push(setTimeout(() => setActiveIndex(i), 400 + i * 600));
    });
    return () => timers.forEach(clearTimeout);
  }, [isInView, levers.length]);

  return (
    <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-0">
      {levers.map((lever, i) => {
        const isPast = i <= activeIndex;
        const isCurrent = i === activeIndex;
        const isLast = i === levers.length - 1;

        return (
          <div key={lever.title} className="text-center relative">
            {/* Dot row with connecting lines */}
            <div className="flex items-center justify-center mb-5 h-4 relative">
              {/* Line to the left (from previous dot to this dot) */}
              {i > 0 && (
                <div className="hidden lg:block absolute right-1/2 left-0 top-1/2 -translate-y-1/2 h-px bg-cream/15">
                  <motion.div
                    className="absolute inset-0 origin-left"
                    style={{ backgroundColor: "rgba(250,245,234,0.35)", height: "1px" }}
                    initial={{ scaleX: 0 }}
                    animate={isPast ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                </div>
              )}

              {/* Line to the right (from this dot to next dot) */}
              {!isLast && (
                <div className="hidden lg:block absolute left-1/2 right-0 top-1/2 -translate-y-1/2 h-px bg-cream/15">
                  <motion.div
                    className="absolute inset-0 origin-left"
                    style={{ backgroundColor: "rgba(250,245,234,0.35)", height: "1px" }}
                    initial={{ scaleX: 0 }}
                    animate={isPast ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
                  />
                </div>
              )}

              {/* Orange dot */}
              <motion.div
                className="w-3.5 h-3.5 rounded-full border-2 border-orange relative z-10"
                initial={{ scale: 0.5, opacity: 0.3, backgroundColor: "transparent" }}
                animate={
                  isPast
                    ? { scale: 1, opacity: 1, backgroundColor: "#FF4F01" }
                    : { scale: 0.7, opacity: 0.4, backgroundColor: "transparent" }
                }
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>

            {/* Text content */}
            <motion.div
              className="px-2"
              initial={{ opacity: 0.3, y: 8 }}
              animate={isPast ? { opacity: 1, y: 0 } : { opacity: 0.3, y: 8 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <motion.h3
                className="font-heading font-bold text-lg mb-2"
                animate={
                  isCurrent
                    ? { color: "#FFFFFF" }
                    : isPast
                    ? { color: "rgba(250,245,234,0.9)" }
                    : { color: "rgba(250,245,234,0.4)" }
                }
                transition={{ duration: 0.3 }}
              >
                {lever.title}
              </motion.h3>
              <motion.p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(220,214,247,0.3)" }}
                animate={
                  isCurrent
                    ? { color: "#DCD6F7" }
                    : isPast
                    ? { color: "#DCD6F7" }
                    : { color: "rgba(220,214,247,0.3)" }
                }
                transition={{ duration: 0.3 }}
              >
                {lever.description}
              </motion.p>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
