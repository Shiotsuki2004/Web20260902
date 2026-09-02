"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/journal", label: "Journal" },
  { href: "/diary", label: "Diary" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="border-b border-line/40 bg-ink/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="font-display text-lg tracking-tight text-paper transition-colors hover:text-accent"
        >
          Shiotsuki
        </Link>
        <nav className="flex items-center gap-6">
          {links.map((link) => {
            const isActive =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-1 font-display text-sm transition-colors ${
                  isActive ? "text-accent" : "text-muted hover:text-paper"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-[1px] left-0 h-px w-full bg-accent" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
