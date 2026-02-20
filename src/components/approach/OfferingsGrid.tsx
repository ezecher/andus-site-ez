"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionWrapper from "@/components/shared/SectionWrapper";

interface Offering {
  levelRange: string;
  title: string;
  description: string;
  duration: string;
  idealFor: string;
  delivers: string;
  modules: string[];
}

interface OfferingsGridProps {
  eyebrow?: string;
  headline?: string;
  subtext?: string;
  offerings: Offering[];
}

function OfferingCard({
  offering,
  index,
  isLast,
}: {
  offering: Offering;
  index: number;
  isLast: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    margin: "-35% 0px -35% 0px",
  });

  return (
    <motion.div
      ref={ref}
      className="relative grid grid-cols-[40px_1fr] md:grid-cols-[40px_1fr_1fr_1fr] gap-x-6 md:gap-x-10"
      animate={{
        opacity: isInView ? 1 : 0.2,
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Timeline column */}
      <div className="flex flex-col items-center row-span-2 md:row-span-1">
        <motion.div
          className="relative z-10 flex items-center justify-center"
          animate={{ scale: isInView ? 1 : 0.7 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {isInView ? (
            <div className="w-10 h-10 rounded-full bg-orange flex items-center justify-center">
              <span className="text-cream font-heading font-bold text-sm">
                {index + 1}
              </span>
            </div>
          ) : (
            <div className="w-3 h-3 rounded-full bg-zaffre/40" />
          )}
        </motion.div>
        {!isLast && (
          <div className="flex-1 w-px border-l-2 border-dotted border-periwinkle mt-2" />
        )}
      </div>

      {/* Column 1: Title + description */}
      <div className="pb-12 md:pb-16">
        <p className="text-orange text-xs tracking-[0.15em] uppercase font-heading font-bold mb-2">
          {offering.levelRange}
        </p>
        <h3 className="font-heading text-2xl md:text-3xl font-bold text-violet mb-3">
          {offering.title}
        </h3>
        <p className="text-violet/70 text-sm leading-relaxed">
          {offering.description}
        </p>
      </div>

      {/* Column 2: Delivers / Duration / Ideal For */}
      <div className="pb-12 md:pb-16 col-start-2 md:col-start-auto">
        <div className="space-y-4">
          <div>
            <p className="text-xs text-cinerous uppercase tracking-wider mb-1 font-heading">
              Delivers
            </p>
            <p className="text-violet text-sm font-medium">
              {offering.delivers}
            </p>
          </div>
          <div>
            <p className="text-xs text-cinerous uppercase tracking-wider mb-1 font-heading">
              Duration
            </p>
            <p className="text-violet text-sm font-medium">
              {offering.duration}
            </p>
          </div>
          <div>
            <p className="text-xs text-cinerous uppercase tracking-wider mb-1 font-heading">
              Ideal For
            </p>
            <p className="text-violet text-sm font-medium">
              {offering.idealFor}
            </p>
          </div>
        </div>
      </div>

      {/* Column 3: Modules */}
      <div className="pb-12 md:pb-16 col-start-2 md:col-start-auto">
        <p className="text-xs text-cinerous uppercase tracking-wider mb-2 font-heading">
          Modules
        </p>
        <div className="flex flex-wrap gap-2">
          {offering.modules.map((mod) => (
            <span
              key={mod}
              className="text-xs px-3 py-1.5 rounded-full border border-periwinkle text-violet font-heading bg-periwinkle/20"
            >
              {mod}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function OfferingsGrid({
  eyebrow,
  headline,
  subtext,
  offerings,
}: OfferingsGridProps) {
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <SectionWrapper>
          <p className="text-cinerous text-xs tracking-wider uppercase mb-4 font-heading">
            {eyebrow || "How We Work"}
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-violet mb-2">
            {headline || "Four offerings. Each unlocks the next level."}
          </h2>
          <p className="font-heading text-xl text-zaffre/70 mb-10">
            {subtext || "We don\u2019t sell hours. We sell transitions."}
          </p>
        </SectionWrapper>

        <div>
          {offerings.map((offering, i) => (
            <OfferingCard
              key={offering.title}
              offering={offering}
              index={i}
              isLast={i === offerings.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
