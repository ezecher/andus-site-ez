"use client";

import { useState } from "react";
import Image from "next/image";

type SectionId = "core" | "agents" | "network";

export default function VennDiagram() {
  const [hovered, setHovered] = useState<SectionId | null>(null);

  const handleEnter = (id: SectionId) => setHovered(id);
  const handleLeave = () => setHovered(null);

  /* ── Circle geometry (on a 1000px wide container) ────────────
   *
   *  Core:    210×210  left: 50%-110px  top: 20     → center ~(495, 125)  right edge ~600
   *  Network: 330×330  left: 50%-280px  top: 160    → center ~(380, 325)  left edge ~215
   *  Agents:  290×290  left: 50%-40px   top: 120    → center ~(605, 265)  right edge ~750
   *
   *  Label positions:
   *  Core team       — far left,  top ~40px,  line goes RIGHT to core circle left edge
   *  Extended network — far left,  top ~380px, line goes RIGHT to network circle left edge
   *  Agent collectives — far right, top ~240px, line goes LEFT to agents circle right edge
   */

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
        <div className="relative mx-auto" style={{ maxWidth: "1000px", height: "600px" }}>

          {/* ── Circles ─────────────────────────────────────── */}

          {/* Core team circle — solid border, upper-center */}
          <div
            className="absolute rounded-full border-2 transition-all duration-500 cursor-pointer flex items-center justify-center"
            style={{
              width: 210,
              height: 210,
              left: "calc(50% - 110px)",
              top: 20,
              borderColor: hovered === "core" ? "#FF4F01" : "rgba(137, 137, 222, 0.6)",
              backgroundColor: hovered === "core" ? "rgba(255, 79, 1, 0.06)" : "rgba(220, 214, 247, 0.12)",
              borderStyle: "solid",
              zIndex: 3,
            }}
            onMouseEnter={() => handleEnter("core")}
            onMouseLeave={handleLeave}
          >
            <Image
              src="/images/team/icons/core-team.svg"
              alt=""
              width={72}
              height={72}
              className="transition-opacity duration-300"
              style={{ opacity: hovered === "core" ? 1 : 0.5 }}
            />
          </div>

          {/* Extended network — largest, dashed, bottom-left overlapping core */}
          <div
            className="absolute rounded-full border-2 transition-all duration-500 cursor-pointer flex items-center justify-center"
            style={{
              width: 330,
              height: 330,
              left: "calc(50% - 280px)",
              top: 160,
              borderColor: hovered === "network" ? "#FF4F01" : "rgba(137, 137, 222, 0.35)",
              backgroundColor: hovered === "network" ? "rgba(255, 79, 1, 0.06)" : "transparent",
              borderStyle: hovered === "network" ? "solid" : "dashed",
              zIndex: 1,
            }}
            onMouseEnter={() => handleEnter("network")}
            onMouseLeave={handleLeave}
          >
            <Image
              src="/images/team/icons/extended-network.svg"
              alt=""
              width={80}
              height={80}
              className="transition-opacity duration-300 mt-12"
              style={{ opacity: hovered === "network" ? 1 : 0.35 }}
            />
          </div>

          {/* Agent collectives — medium, dashed, right overlapping core */}
          <div
            className="absolute rounded-full border-2 transition-all duration-500 cursor-pointer flex items-center justify-center"
            style={{
              width: 290,
              height: 290,
              left: "calc(50% - 40px)",
              top: 120,
              borderColor: hovered === "agents" ? "#FF4F01" : "rgba(137, 137, 222, 0.35)",
              backgroundColor: hovered === "agents" ? "rgba(255, 79, 1, 0.06)" : "transparent",
              borderStyle: hovered === "agents" ? "solid" : "dashed",
              zIndex: 2,
            }}
            onMouseEnter={() => handleEnter("agents")}
            onMouseLeave={handleLeave}
          >
            <Image
              src="/images/team/icons/agent-collectives.svg"
              alt=""
              width={80}
              height={80}
              className="transition-opacity duration-300"
              style={{ opacity: hovered === "agents" ? 1 : 0.35 }}
            />
          </div>

          {/* ── Labels with connecting lines ────────────────── */}

          {/* CORE TEAM — top-left, line extends RIGHT toward core circle */}
          <div
            className="absolute cursor-pointer"
            style={{ left: 0, top: 40, zIndex: 4 }}
            onMouseEnter={() => handleEnter("core")}
            onMouseLeave={handleLeave}
          >
            <div className="flex items-center gap-0 mb-2">
              <h3
                className={`font-heading font-bold text-[22px] transition-colors duration-300 whitespace-nowrap ${
                  hovered === "core" ? "text-orange" : "text-violet"
                }`}
              >
                Core team
              </h3>
              {/* |——o connector line extending right */}
              <div className="relative flex items-center ml-2">
                <div className="w-[2px] h-3 bg-orange flex-shrink-0" />
                <div
                  className="h-[2px] bg-orange transition-all duration-700 ease-out"
                  style={{ width: hovered === "core" ? 220 : 80 }}
                />
                <div
                  className={`w-[10px] h-[10px] rounded-full border-2 border-orange transition-all duration-300 flex-shrink-0 ${
                    hovered === "core" ? "bg-orange" : "bg-transparent"
                  }`}
                />
              </div>
            </div>
            <p className="font-heading text-sm font-semibold text-violet/70 mb-1.5">
              10 principals
            </p>
            <p className="text-cinerous text-[13px] leading-relaxed max-w-[260px]">
              We&apos;ve built and run AI labs, led enterprise transformation, and shaped how organizations think about change.
            </p>
          </div>

          {/* EXTENDED NETWORK — bottom-left, below the big circle */}
          {/* Network circle bottom edge ≈ 490px */}
          <div
            className="absolute cursor-pointer"
            style={{ left: 0, top: 420, zIndex: 4 }}
            onMouseEnter={() => handleEnter("network")}
            onMouseLeave={handleLeave}
          >
            <div className="flex items-center gap-0 mb-2">
              <h3
                className={`font-heading font-bold text-[22px] transition-colors duration-300 whitespace-nowrap ${
                  hovered === "network" ? "text-orange" : "text-violet"
                }`}
              >
                Extended network
              </h3>
              {/* |——o connector line extending right toward network circle */}
              <div className="relative flex items-center ml-2">
                <div className="w-[2px] h-3 bg-orange flex-shrink-0" />
                <div
                  className="h-[2px] bg-orange transition-all duration-700 ease-out"
                  style={{ width: hovered === "network" ? 120 : 40 }}
                />
                <div
                  className={`w-[10px] h-[10px] rounded-full border-2 border-orange transition-all duration-300 flex-shrink-0 ${
                    hovered === "network" ? "bg-orange" : "bg-transparent"
                  }`}
                />
              </div>
            </div>
            <p className="font-heading text-sm font-semibold text-violet/70 mb-1.5">
              75+ specialists
            </p>
            <p className="text-cinerous text-[13px] leading-relaxed max-w-[300px]">
              The most accomplished innovators, change leaders, product builders, researchers, and facilitators doing this work. Ready to deploy.
            </p>
          </div>

          {/* AGENT COLLECTIVES — right side, to the right of agents circle */}
          {/* Agents circle right edge ≈ calc(50% + 250px), center Y ≈ 265 */}
          <div
            className="absolute cursor-pointer text-right"
            style={{ right: 0, top: 220, zIndex: 4 }}
            onMouseEnter={() => handleEnter("agents")}
            onMouseLeave={handleLeave}
          >
            {/* o——| connector line extending LEFT toward agents circle, then title */}
            <div className="flex items-center justify-end gap-0 mb-2">
              <div
                className={`w-[10px] h-[10px] rounded-full border-2 border-orange transition-all duration-300 flex-shrink-0 ${
                  hovered === "agents" ? "bg-orange" : "bg-transparent"
                }`}
              />
              <div
                className="h-[2px] bg-orange transition-all duration-700 ease-out"
                style={{ width: hovered === "agents" ? 120 : 40 }}
              />
              <div className="w-[2px] h-3 bg-orange flex-shrink-0" />
              <h3
                className={`font-heading font-bold text-[22px] transition-colors duration-300 whitespace-nowrap ml-2 ${
                  hovered === "agents" ? "text-orange" : "text-violet"
                }`}
              >
                Agent collectives
              </h3>
            </div>
            <p className="font-heading text-sm font-semibold text-violet/70 mb-1.5">
              40+ working agents
            </p>
            <p className="text-cinerous text-[13px] leading-relaxed max-w-[260px] ml-auto">
              Versed in business, policy, arts, philosophy, and more. Not automation. Augmentation.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
