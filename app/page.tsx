import Image from "next/image";
import Link from "next/link";

const interests = [
  "AI",
  "Computer Vision",
  "Drawing",
  "Reading",
  "Anime & Manga",
  "VTubers",
];

export default function Home() {
  return (
    <section className="bg-blueprint">
      <div className="mx-auto flex max-w-5xl flex-col-reverse items-center gap-14 px-6 py-20 md:flex-row md:items-center md:py-28">
        <div className="w-full md:w-3/5">
          <p className="font-display text-sm text-accentDim">Information engineering student</p>
          <h1 className="mt-3 font-display text-5xl font-medium leading-[1.05] text-paper md:text-6xl">
            {/* Arisa */}
            Shiotsuki, undergrad (class of 2027).
          </h1>

          <div className="mt-7 space-y-4 text-lg leading-relaxed text-muted">
            <p>
              I like drawing, reading, anime, manga, and VTubers.
            </p>
            <p>
              Interested in AI, computer vision, programming, and technology.
            </p>
            <p>
              Currently working on improving my drawing skills, and hoping to create an
              original work someday.
            </p>
          </div>

          <ul className="mt-8 flex flex-wrap gap-2">
            {interests.map((item) => (
              <li
                key={item}
                className="border border-line/60 px-3 py-1 font-display text-xs text-muted"
              >
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap items-center gap-8">
            <Link
              href="/about"
              className="font-display text-sm text-paper transition-colors hover:text-accent"
            >
              Read the full introduction
            </Link>
            <Link
              href="/journal"
              className="font-display text-sm text-paper transition-colors hover:text-accent"
            >
              Open the journal
            </Link>
          </div>
        </div>

        <div className="relative w-56 shrink-0 md:w-72">
          <div className="pointer-events-none absolute -inset-4 border border-line/50" />
          <div className="pointer-events-none absolute -left-2 -top-2 h-4 w-4 border-l border-t border-accent/70" />
          <div className="pointer-events-none absolute -bottom-2 -right-2 h-4 w-4 border-b border-r border-accent/70" />
          <Image
            src="/icon.jpg"
            alt="Arisa's icon: a circuit-lined gear with a lightning bolt at its center"
            width={480}
            height={480}
            priority
            className="animate-pulse-glow w-full rounded-full"
          />
        </div>
      </div>
    </section>
  );
}
