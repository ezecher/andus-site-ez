"use client";

import { useState } from "react";

const sections = [
  {
    id: "core",
    label: "Core team",
    value: "10 principals",
    description:
      "We've built and run AI labs, led enterprise transformation, and shaped how organizations think about change.",
  },
  {
    id: "agents",
    label: "Agent collectives",
    value: "40+ working agents",
    description:
      "Versed in business, policy, arts, philosophy, and more. Not automation. Augmentation.",
  },
  {
    id: "network",
    label: "Extended network",
    value: "75+ specialists",
    description:
      "The most accomplished innovators, change leaders, product builders, researchers, and facilitators doing this work. Ready to deploy.",
  },
];

export default function VennDiagram() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <>
      {/* Mobile: stacked cards */}
      <div className="md:hidden space-y-6">
        <div className="border-2 border-periwinkle/50 rounded-2xl p-6 bg-periwinkle/5">
          <h3 className="font-heading font-bold text-lg text-violet">Core team</h3>
          <p className="font-heading text-sm text-violet/60 mb-2">10 principals</p>
          <p className="text-cinerous text-sm leading-relaxed">
            We&apos;ve built and run AI labs, led enterprise transformation, and shaped how organizations think about change.
          </p>
        </div>
        <div className="border-2 border-dashed border-periwinkle/40 rounded-2xl p-6">
          <h3 className="font-heading font-bold text-lg text-violet">Agent collectives</h3>
          <p className="font-heading text-sm text-violet/60 mb-2">40+ working agents</p>
          <p className="text-cinerous text-sm leading-relaxed">
            Versed in business, policy, arts, philosophy, and more. Not automation. Augmentation.
          </p>
        </div>
        <div className="border-2 border-dashed border-periwinkle/40 rounded-2xl p-6">
          <h3 className="font-heading font-bold text-lg text-violet">Extended network</h3>
          <p className="font-heading text-sm text-violet/60 mb-2">75+ specialists</p>
          <p className="text-cinerous text-sm leading-relaxed">
            The most accomplished innovators, change leaders, product builders, researchers, and facilitators doing this work. Ready to deploy.
          </p>
        </div>
      </div>

      {/* Desktop: Venn diagram */}
      <div className="hidden md:block">
        <div className="relative max-w-4xl mx-auto" style={{ height: "580px" }}>
          {/* Core team — smallest circle, top-center */}
          <div
            className="absolute w-[220px] h-[220px] rounded-full border-2 transition-all duration-300"
            style={{
              left: "calc(50% - 110px)",
              top: "20px",
              borderColor: hovered === "core" ? "rgba(232, 119, 34, 0.8)" : "rgba(137, 137, 222, 0.6)",
              backgroundColor: hovered === "core" ? "rgba(232, 119, 34, 0.08)" : "rgba(137, 137, 222, 0.05)",
              borderStyle: "solid",
            }}
          />

          {/* Extended network — largest circle, bottom-left */}
          <div
            className="absolute w-[300px] h-[300px] rounded-full border-2 transition-all duration-300"
            style={{
              left: "calc(50% - 240px)",
              top: "120px",
              borderColor: hovered === "network" ? "rgba(232, 119, 34, 0.8)" : "rgba(137, 137, 222, 0.4)",
              backgroundColor: hovered === "network" ? "rgba(232, 119, 34, 0.08)" : "transparent",
              borderStyle: hovered === "network" ? "solid" : "dashed",
            }}
          />

          {/* Agent collectives — medium circle, bottom-right */}
          <div
            className="absolute w-[260px] h-[260px] rounded-full border-2 transition-all duration-300"
            style={{
              left: "calc(50% - 20px)",
              top: "100px",
              borderColor: hovered === "agents" ? "rgba(232, 119, 34, 0.8)" : "rgba(137, 137, 222, 0.4)",
              backgroundColor: hovered === "agents" ? "rgba(232, 119, 34, 0.08)" : "transparent",
              borderStyle: hovered === "agents" ? "solid" : "dashed",
            }}
          />

          {/* Core team label — top-left */}
          <div
            className="absolute cursor-pointer"
            style={{ left: "0", top: "0" }}
            onMouseEnter={() => setHovered("core")}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="flex items-center gap-3 mb-1">
              <h3 className={`font-heading font-bold text-lg transition-colors duration-300 ${hovered === "core" ? "text-orange" : "text-violet"}`}>
                Core team
              </h3>
              <div className={`w-10 h-px transition-colors duration-300 ${hovered === "core" ? "bg-orange" : "bg-orange"}`} />
              <div className={`w-2 h-2 rounded-full border-2 transition-colors duration-300 ${hovered === "core" ? "bg-orange border-orange" : "border-orange"}`} />
            </div>
            <p className="font-heading text-sm text-violet/60 mb-2">
              10 principals
            </p>
            <p className="text-cinerous text-sm leading-relaxed max-w-[200px]">
              We&apos;ve built and run AI labs, led enterprise transformation, and shaped how organizations think about change.
            </p>
          </div>

          {/* Agent collectives label — right */}
          <div
            className="absolute cursor-pointer"
            style={{ right: "0", top: "0" }}
            onMouseEnter={() => setHovered("agents")}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="flex items-center gap-3 mb-1">
              <div className={`w-2 h-2 rounded-full border-2 transition-colors duration-300 ${hovered === "agents" ? "bg-orange border-orange" : "border-orange"}`} />
              <div className="w-10 h-px bg-orange" />
              <h3 className={`font-heading font-bold text-lg transition-colors duration-300 ${hovered === "agents" ? "text-orange" : "text-violet"}`}>
                Agent collectives
              </h3>
            </div>
            <p className="font-heading text-sm text-violet/60 mb-2 pl-[60px]">
              40+ working agents
            </p>
            <p className="text-cinerous text-sm leading-relaxed max-w-[220px] pl-[60px]">
              Versed in business, policy, arts, philosophy, and more. Not automation. Augmentation.
            </p>
          </div>

          {/* Extended network label — bottom-left */}
          <div
            className="absolute cursor-pointer"
            style={{ left: "0", bottom: "0" }}
            onMouseEnter={() => setHovered("network")}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="flex items-center gap-3 mb-1">
              <h3 className={`font-heading font-bold text-lg transition-colors duration-300 ${hovered === "network" ? "text-orange" : "text-violet"}`}>
                Extended network
              </h3>
              <div className="w-10 h-px bg-orange" />
              <div className={`w-2 h-2 rounded-full border-2 transition-colors duration-300 ${hovered === "network" ? "bg-orange border-orange" : "border-orange"}`} />
            </div>
            <p className="font-heading text-sm text-violet/60 mb-2">
              75+ specialists
            </p>
            <p className="text-cinerous text-sm leading-relaxed max-w-[240px]">
              The most accomplished innovators, change leaders, product builders, researchers, and facilitators doing this work. Ready to deploy.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
