"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

const navLinks = [
  { label: "Human OS", href: "/human-os" },
  { label: "Approach", href: "/approach" },
  { label: "Team", href: "/team" },
  { label: "Field Notes", href: "/field-notes" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-periwinkle/30">
      <nav className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <Logo />

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`font-heading text-base tracking-wide hover-underline transition-colors ${
                  pathname === link.href
                    ? "text-zaffre"
                    : "text-violet"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          <div className="w-6 flex flex-col gap-1.5">
            <span
              className={`block h-px bg-violet transition-transform duration-300 ${
                mobileMenuOpen ? "rotate-45 translate-y-[7px]" : ""
              }`}
            />
            <span
              className={`block h-px bg-violet transition-opacity duration-300 ${
                mobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-px bg-violet transition-transform duration-300 ${
                mobileMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""
              }`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-[65px] bg-violet/20 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-cream border-b border-periwinkle/30 z-50 transition-all duration-300 ${
          mobileMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <ul className="px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`font-heading text-lg block py-2 ${
                  pathname === link.href
                    ? "text-zaffre"
                    : "text-violet"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
