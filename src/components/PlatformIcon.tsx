import { siApplemusic, siInstagram, siSoundcloud, siSpotify, siYoutube } from "simple-icons";

const ICONS = {
  Spotify: siSpotify,
  YouTube: siYoutube,
  SoundCloud: siSoundcloud,
  "Apple Music": siApplemusic,
  Instagram: siInstagram,
} as const;

export type PlatformName = keyof typeof ICONS;

/** Official brand glyphs (Simple Icons), drawn in the colour of the surrounding text. */
export default function PlatformIcon({ name, className = "" }: { name: PlatformName; className?: string }) {
  const icon = ICONS[name];
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" role="img" aria-label={`${icon.title} logo`}>
      <path d={icon.path} />
    </svg>
  );
}
