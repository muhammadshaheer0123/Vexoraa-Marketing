import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Hanken_Grotesk } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
  axes: ["opsz", "wdth"],
});

const body = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});

const SITE_URL = "https://vexoraa.com";
const TITLE = "Vexoraa | Music marketing for Spotify, YouTube, SoundCloud & Apple Music";
const DESCRIPTION =
  "Vexoraa grows independent artists with real playlist placements on playlists reaching 500K to 2M+ monthly listeners. Spotify, YouTube, SoundCloud and Apple Music growth, no bots.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: "Vexoraa",
  keywords: [
    "music marketing agency",
    "Spotify playlist placement",
    "grow monthly listeners",
    "YouTube music promotion",
    "SoundCloud promotion",
    "Apple Music promotion",
    "artist growth",
  ],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Vexoraa",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Vexoraa music marketing" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
