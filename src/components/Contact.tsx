"use client";

import { useId, useState } from "react";
import { CONTACT_EMAIL } from "@/lib/data";

type Errors = Partial<Record<"name" | "email" | "link", string>>;

const inputCls =
  "mt-2 w-full rounded-2xl bg-bone px-5 py-4 text-ink placeholder:text-bone-dim/70 outline-offset-2 transition-shadow focus:outline focus:outline-[3px] focus:outline-white aria-[invalid=true]:outline aria-[invalid=true]:outline-[3px] aria-[invalid=true]:outline-ink";

export default function Contact() {
  const uid = useId();
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();
    const next: Errors = {};
    if (!get("name")) next.name = "Tell us your name or artist name.";
    if (!/^\S+@\S+\.\S+$/.test(get("email"))) next.email = "Enter an email we can reply to, like name@email.com.";
    if (!get("link")) next.link = "Add a link to your Spotify, YouTube or SoundCloud so we can listen.";
    setErrors(next);
    if (Object.keys(next).length) {
      (e.currentTarget.querySelector("[aria-invalid=true]") as HTMLElement | null)?.focus();
      return;
    }

    const body = [
      `Name: ${get("name")}`,
      `Email: ${get("email")}`,
      `Link to my music: ${get("link")}`,
      `Main platform: ${get("platform")}`,
      "",
      get("goal") || "(No goal added)",
    ].join("\n");
    const href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Strategy call request from ${get("name")}`)}&body=${encodeURIComponent(body)}`;
    setSent(true);
    window.location.href = href;
  };

  const field = (id: keyof Errors) => ({
    "aria-invalid": errors[id] ? true : undefined,
    "aria-describedby": errors[id] ? `${uid}-${id}-err` : undefined,
  });

  return (
    <section id="contact" className="on-cobalt section-y relative z-10">
      <div className="wrap grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,34rem)] lg:gap-24">
        <div>
          <h2 className="t-h2 max-w-[8ch] !text-[clamp(3rem,9vw,9rem)]" data-split>
            Ready to be heard?
          </h2>
          <p className="t-lead mt-8 text-white/90" data-reveal>
            Book a free 30-minute strategy call. We will listen to your music, tell you honestly which playlists fit, and show you
            what a campaign would look like. Replies within 24 hours.
          </p>
          <p className="mt-8 font-display text-2xl font-bold tracking-[-0.02em]" data-reveal>
            <a className="link-u" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>

        <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5" data-reveal data-delay="0.1">
          <div>
            <label htmlFor={`${uid}-name`} className="font-display text-lg font-bold">
              Your name or artist name
            </label>
            <input id={`${uid}-name`} name="name" autoComplete="name" required className={inputCls} placeholder="Nova Reyes" {...field("name")} />
            {errors.name && (
              <p id={`${uid}-name-err`} role="alert" className="mt-2 font-semibold">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor={`${uid}-email`} className="font-display text-lg font-bold">
              Email
            </label>
            <input id={`${uid}-email`} name="email" type="email" autoComplete="email" required className={inputCls} placeholder="you@email.com" {...field("email")} />
            {errors.email && (
              <p id={`${uid}-email-err`} role="alert" className="mt-2 font-semibold">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor={`${uid}-link`} className="font-display text-lg font-bold">
              Link to your music
            </label>
            <input id={`${uid}-link`} name="link" type="url" inputMode="url" required className={inputCls} placeholder="https://open.spotify.com/artist/..." {...field("link")} />
            {errors.link && (
              <p id={`${uid}-link-err`} role="alert" className="mt-2 font-semibold">
                {errors.link}
              </p>
            )}
          </div>

          <div>
            <label htmlFor={`${uid}-platform`} className="font-display text-lg font-bold">
              Main platform
            </label>
            <select id={`${uid}-platform`} name="platform" className={`${inputCls} appearance-none`} defaultValue="Spotify">
              <option>Spotify</option>
              <option>YouTube</option>
              <option>SoundCloud</option>
              <option>Apple Music</option>
              <option>More than one</option>
            </select>
          </div>

          <div>
            <label htmlFor={`${uid}-goal`} className="font-display text-lg font-bold">
              What does success look like? <span className="font-sans text-base font-normal text-white/80">(optional)</span>
            </label>
            <textarea id={`${uid}-goal`} name="goal" rows={4} className={inputCls} placeholder="New single on 14 November. Aiming for 100K monthly listeners." />
          </div>

          <button type="submit" className="btn btn-ink mt-2 w-full sm:w-auto sm:self-start">
            Send my request
          </button>

          <p aria-live="polite" className="min-h-6 text-white/90">
            {sent && `Opening your email app. If nothing opens, write to ${CONTACT_EMAIL} and we will pick it up there.`}
          </p>
        </form>
      </div>
    </section>
  );
}
