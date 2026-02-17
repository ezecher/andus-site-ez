"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { roles } from "./patternData";
import SectionWrapper from "@/components/shared/SectionWrapper";

export default function PatternMatchTool() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  return (
    <section className="py-16 md:py-24 bg-periwinkle/30">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
          {/* Left: Title, description, what informs, CTA */}
          <SectionWrapper>
            <div>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-violet mb-4">
                Pattern Match
              </h2>
              <p className="text-violet/60 text-lg leading-relaxed mb-8">
                Field intelligence from hundreds of engagements. Patterns
                we&apos;ve seen, named, and solved.
              </p>

              <h3 className="font-heading font-bold text-xl text-violet mb-4">
                What informs our patterns
              </h3>
              <p className="text-violet/60 text-sm leading-relaxed mb-4">
                Decades building and running AI and tech transformation labs.
                Hundreds of client engagements. Thousands of diagnostic hours.
                Research we create and curate daily.
              </p>
              <p className="text-violet/80 text-sm leading-relaxed mb-4">
                <strong className="text-violet">
                  That work produced a proprietary diagnostic framework
                </strong>
                —hundreds of patterns we&apos;ve named, validated, and use to
                pinpoint exactly where transformation stalls.
              </p>
              <p className="text-violet/60 text-sm leading-relaxed mb-10">
                Not theory. Field-tested intelligence that tells us why your
                people aren&apos;t adopting, where the real resistance lives,
                and what to do about it.
              </p>

              {/* CTA */}
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-violet mb-3">
                Start capturing value
              </h3>
              <p className="text-violet/60 mb-6">
                Find your level. Build the path forward.
              </p>
              <Link
                href="/contact"
                className="inline-block font-heading text-sm tracking-wide px-8 py-3 border-2 border-violet text-violet hover:bg-violet/10 transition-all duration-300"
              >
                Request a Custom Diagnostic &nbsp;&rsaquo;
              </Link>
            </div>
          </SectionWrapper>

          {/* Right: Interactive tool */}
          <SectionWrapper delay={0.15} direction="right">
            <div className="bg-cream text-violet p-8 md:p-10 rounded-sm shadow-lg sticky top-24">
              <h3 className="font-heading font-bold text-lg mb-2">
                Select your function. Surface your friction.
              </h3>
              <p className="text-violet/60 text-sm mb-6">
                See scenarios you may face—and how you might approach them.
                Three questions. Patterns from hundreds of change signals. Your
                first step.
              </p>

              <p className="text-orange text-xs uppercase tracking-wider font-heading font-bold mb-3">
                Step 01 of 03
              </p>
              <p className="font-heading font-bold text-violet mb-4">
                What best describes your leadership role?
              </p>

              <div className="space-y-2">
                {roles.map((role) => (
                  <motion.button
                    key={role.id}
                    onClick={() => setSelectedRole(role.id)}
                    className={`w-full text-left px-4 py-3 border-2 rounded-sm text-sm font-heading transition-colors cursor-pointer ${
                      selectedRole === role.id
                        ? "border-orange bg-orange/5 text-orange"
                        : "border-periwinkle hover:border-violet/40"
                    }`}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.15 }}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={`w-3 h-3 rounded-full border-2 flex-shrink-0 ${
                          selectedRole === role.id
                            ? "border-orange bg-orange"
                            : "border-cinerous"
                        }`}
                      />
                      {role.label}
                    </span>
                  </motion.button>
                ))}
              </div>

              {selectedRole && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-periwinkle/20 border border-periwinkle rounded-sm"
                >
                  <p className="text-violet/70 text-sm">
                    Full pattern matching coming soon. For now,{" "}
                    <a
                      href="/contact"
                      className="text-zaffre font-bold hover:underline"
                    >
                      get in touch
                    </a>{" "}
                    to discuss patterns specific to your role.
                  </p>
                </motion.div>
              )}
            </div>
          </SectionWrapper>
        </div>
      </div>
    </section>
  );
}
