"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import SectionWrapper from "@/components/shared/SectionWrapper";

// Map offering index to maturity model icon names
const offeringIcons = ["heroes", "operational", "integrated", "native"];

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
            <div className="w-14 h-14 rounded-full bg-orange flex items-center justify-center">
              <Image
                src={`/images/approach/icons/approach-maturity-model-${offeringIcons[index] || "heroes"}-ivory.svg`}
                alt=""
                width={40}
                height={40}
                className="w-9 h-9"
              />
            </div>
          ) : (
            <div className="w-14 h-14 rounded-full bg-cinerous/30 flex items-center justify-center">
              <Image
                src={`/images/approach/icons/approach-maturity-model-${offeringIcons[index] || "heroes"}-zaffre.svg`}
                alt=""
                width={40}
                height={40}
                className="w-9 h-9"
              />
            </div>
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
        <p className="text-violet/70 text-base leading-relaxed">
          {offering.description}
        </p>
      </div>

      {/* Column 2: Delivers / Duration / Ideal For */}
      <div className="pb-12 md:pb-16 col-start-2 md:col-start-auto">
        <div className="space-y-5">
          <div>
            <p className="text-xs text-zaffre uppercase tracking-wider mb-1 font-bold">
              Delivers
            </p>
            <p className="text-violet text-base">
              {offering.delivers}
            </p>
          </div>
          <div>
            <p className="text-xs text-zaffre uppercase tracking-wider mb-1 font-bold">
              Duration
            </p>
            <p className="text-violet text-base">
              {offering.duration}
            </p>
          </div>
          <div>
            <p className="text-xs text-zaffre uppercase tracking-wider mb-1 font-bold">
              Ideal For
            </p>
            <p className="text-violet text-base">
              {offering.idealFor}
            </p>
          </div>
        </div>
      </div>

      {/* Column 3: Modules */}
      <div className="pb-12 md:pb-16 col-start-2 md:col-start-auto">
        <p className="text-xs text-zaffre uppercase tracking-wider mb-3 font-bold">
          Modules
        </p>
        <div className="flex flex-col gap-2.5">
          {offering.modules.map((mod) => (
            <span
              key={mod}
              className="text-sm px-4 py-2 rounded-full border border-periwinkle/80 text-zaffre font-medium bg-periwinkle/40 w-fit"
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
          <p className="text-zaffre text-xs tracking-wider uppercase mb-4">
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
