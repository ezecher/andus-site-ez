import Link from "next/link";

interface FooterProps {
  navLinks: { label: string; href: string }[];
  footerText: string;
  socialLinks: { platform: string; url: string }[];
  contactEmail: string;
}

// Static footer-only links (Privacy, Terms) — always shown
const staticLinks = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export default function Footer({
  navLinks,
  footerText,
  socialLinks,
  contactEmail,
}: FooterProps) {
  const allLinks = [...navLinks, ...staticLinks];
  const leftCol = allLinks.slice(0, 4);
  const rightCol = allLinks.slice(4);

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
              {footerText}
            </p>
            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div className="flex gap-4 mt-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cream/50 hover:text-cream text-sm font-heading transition-colors"
                  >
                    {social.platform}
                  </a>
                ))}
              </div>
            )}
            {contactEmail && (
              <a
                href={`mailto:${contactEmail}`}
                className="text-cream/50 hover:text-cream text-sm font-heading transition-colors block mt-2"
              >
                {contactEmail}
              </a>
            )}
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
