import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/data";
import PlatformIcon from "./PlatformIcon";

const SEND = [
  { title: "Your music", text: "A link to your Spotify, YouTube, SoundCloud or Apple Music." },
  { title: "Your goal", text: "Monthly listeners, a release date, or the playlists you are aiming for." },
  { title: "Your budget", text: "Roughly what you would like to spend per week." },
];

export default function Contact() {
  return (
    <section id="contact" className="on-cobalt section-y relative z-10">
      <div className="wrap grid gap-14 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-end lg:gap-24">
        <div>
          <h2 className="t-h2 max-w-[8ch] !text-[clamp(3rem,9vw,9rem)]" data-split>
            Ready to be heard?
          </h2>
          <p className="t-lead mt-8 text-white/90" data-reveal>
            Send us a DM on Instagram. We will listen to your music, tell you honestly which playlists fit, and show you what a
            campaign would look like. Replies within 24 hours.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center" data-reveal>
            <span data-magnetic className="inline-block">
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ink w-full sm:w-auto">
                <PlatformIcon name="Instagram" className="h-[1.15em] w-[1.15em]" />
                DM us on Instagram
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </span>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="link-u w-fit font-display text-2xl font-bold tracking-[-0.02em]"
            >
              {INSTAGRAM_HANDLE}
            </a>
          </div>
        </div>

        <div data-reveal data-delay="0.1">
          <h3 className="font-display text-2xl font-bold tracking-[-0.02em]">What to put in your DM</h3>
          <ul className="mt-5 flex flex-col gap-3">
            {SEND.map((s) => (
              <li key={s.title} className="rounded-3xl bg-cobalt-deep px-6 py-5">
                <p className="font-display text-xl font-bold tracking-[-0.02em]">{s.title}</p>
                <p className="mt-1 text-white/85">{s.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
