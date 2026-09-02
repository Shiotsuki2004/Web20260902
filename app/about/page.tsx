import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Shiotsuki",
};

const paragraphs = [
  `Hi, I'm Shiotsuki.`,
  `I'm a university student studying information engineering. I'm interested in a wide range of things, including AI, computer vision, programming, and other areas of technology.`,
  `Outside of technology, I enjoy reading and drawing. I read many different kinds of books, from novels and history to economics, science, and technology. I've also loved drawing since I was a child. After entering university, I started studying drawing more seriously, especially human anatomy, poses, and backgrounds.`,
  `I'm also a big fan of anime, manga, and VTubers. I particularly like stories with detailed worlds, interesting characters, and enough depth to make me want to read them again.`,
  `I'm generally an introverted person, so I enjoy spending quiet time by myself. I like taking my time with the things I'm interested in and going deeper into them.`,
  `One of my goals is to eventually create something of my own. It might be a manga, a novel, an illustration, or something else. The format isn't that important to me. What matters is creating a complete work that I can look back on and think, "I made this."`,
  `This journal is a place for me to write about the things I'm interested in, what I'm learning, and the things I'm trying to create.`,
];

export default function About() {
  return (
    <section className="bg-blueprint">
      <div className="mx-auto max-w-3xl px-6 py-20">
        <p className="font-display text-sm text-accentDim">About</p>
        <h1 className="mt-2 font-display text-4xl font-medium text-paper md:text-5xl">
          A little more about me
        </h1>

        <div className="mt-10 border border-line/50 bg-paper px-7 py-10 text-paperInk shadow-[0_0_60px_-15px_rgba(111,214,255,0.15)] md:px-12 md:py-14">
          <div className="mx-auto max-w-[62ch] space-y-5 text-[1.05rem] leading-[1.85]">
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
