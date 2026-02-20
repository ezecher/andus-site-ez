"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import SectionWrapper from "@/components/shared/SectionWrapper";
import TeamCard from "@/components/team/TeamCard";
import type { TeamMember } from "@/types";

interface TeamCarouselProps {
  members: TeamMember[];
  headshotMap: Record<string, string>;
}

export default function TeamCarousel({ members, headshotMap }: TeamCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const totalDots = members.length;

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    // Card width ~250px + 24px gap
    const cardWidth = 274;
    const index = Math.round(el.scrollLeft / cardWidth);
    setActiveIndex(Math.min(index, totalDots - 1));
  }, [totalDots]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToIndex = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = 274;
    el.scrollTo({ left: index * cardWidth, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* Scrollable row */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-periwinkle scrollbar-track-transparent md:pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] pl-6 pr-6"
      >
        {members.map((member, i) => (
          <SectionWrapper key={member._id} delay={i * 0.05}>
            <div className="flex-shrink-0 w-[220px] sm:w-[250px] snap-start">
              <TeamCard
                member={member}
                localHeadshot={headshotMap[member.name]}
              />
            </div>
          </SectionWrapper>
        ))}
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 pt-4">
        {Array.from({ length: totalDots }).map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToIndex(i)}
            aria-label={`Scroll to ${members[i]?.name}`}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === activeIndex
                ? "bg-violet scale-125"
                : "bg-periwinkle hover:bg-violet/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
