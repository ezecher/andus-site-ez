"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { TeamMember } from "@/types";
import { urlFor } from "@/sanity/lib/image";

interface TeamCardProps {
  member: TeamMember;
  localHeadshot?: string;
}

export default function TeamCard({ member, localHeadshot }: TeamCardProps) {
  const imageSrc = member.headshot
    ? urlFor(member.headshot).width(400).height(500).url()
    : localHeadshot || "/images/andus-cube.png";

  return (
    <motion.div
      className="group cursor-pointer"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative aspect-[4/5] overflow-hidden mb-3 bg-periwinkle/20">
        <Image
          src={imageSrc}
          alt={member.name}
          fill
          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />
      </div>
      <p className="text-orange text-[10px] tracking-[0.15em] uppercase font-heading font-bold">
        {member.roleTagline}
      </p>
      <h3 className="font-heading font-bold text-violet text-sm mt-1">
        {member.name}
      </h3>
      <p className="text-cinerous text-xs mt-0.5">{member.title}</p>
    </motion.div>
  );
}
