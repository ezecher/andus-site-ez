import Image from "next/image";
import Link from "next/link";

export default function Logo({
  className = "",
  imageClassName = "h-10 md:h-12 w-auto",
}: {
  className?: string;
  imageClassName?: string;
}) {
  return (
    <Link href="/" className={`block ${className}`}>
      <Image
        src="/images/andus-logo.png"
        alt="Andus Labs"
        width={200}
        height={50}
        className={imageClassName}
        priority
      />
    </Link>
  );
}
