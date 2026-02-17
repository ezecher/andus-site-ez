import Link from "next/link";

const footerNavLinks = [
  { label: "Human OS", href: "/human-os" },
  { label: "Approach", href: "/approach" },
  { label: "Team", href: "/team" },
  { label: "Field Notes", href: "/field-notes" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export default function Footer() {
  const leftCol = footerNavLinks.slice(0, 4);   // Human OS, Approach, Team, Field Notes
  const rightCol = footerNavLinks.slice(4, 7); // Contact, Privacy, Terms

  return (
    <footer className="bg-violet text-cream">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Logo + description */}
          <div>
            <div className="mb-4">
              <Link href="/" className="block">
                <span className="font-heading text-2xl md:text-3xl font-bold tracking-tighter text-cream">
                  and<span className="text-indigo">us</span> labs
                </span>
              </Link>
            </div>
            <p className="text-cream/70 text-sm leading-relaxed max-w-md">
              We work with commercial, NGO, and public sector organizations
              to navigate AI transformation from strategy through
              implementation.
            </p>
          </div>

          {/* Right: Nav links in two columns */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-2">
            <ul className="flex flex-col gap-2">
              {leftCol.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-cream/70 hover:text-cream text-sm font-heading transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="flex flex-col gap-2">
              {rightCol.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-cream/70 hover:text-cream text-sm font-heading transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-cream/10">
          <p className="text-cream/40 text-xs">
            &copy; {new Date().getFullYear()} Andus Labs Inc. All Rights
            Reserved. All names, service marks, logos, trade names,
            trademarks, website and domain names are the exclusive property
            of Andus Labs Inc.
          </p>
        </div>
      </div>
    </footer>
  );
}
