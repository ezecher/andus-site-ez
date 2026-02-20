import Link from "next/link";

interface ButtonProps {
  variant?: "primary" | "outline";
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit";
}

export default function Button({
  variant = "outline",
  href,
  onClick,
  children,
  className = "",
  type = "button",
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center gap-2 font-heading text-base tracking-wide px-8 py-3.5 border-2 transition-all duration-300 cursor-pointer";

  const variants = {
    primary:
      "bg-orange text-cream border-orange hover:bg-orange-hover hover:border-orange-hover",
    outline:
      "bg-transparent text-violet border-violet/40 hover:bg-violet hover:text-cream hover:border-violet",
  };

  const styles = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={styles}>
      {children}
    </button>
  );
}
