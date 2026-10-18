/* All copy and demo figures live here so they are easy to swap for real data. */

export const INSTAGRAM_URL =
  "https://www.instagram.com/vexoraamarketing?cplk=MWZ3dWM3cGRqZGExOA%3D%3D&utm_source=qr";
export const INSTAGRAM_HANDLE = "@vexoraamarketing";

export const NAV_LINKS = [
  { label: "Playlists", href: "#playlists" },
  { label: "Services", href: "#services" },
  { label: "Results", href: "#results" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
] as const;

export const LATEST_PLACEMENTS = [
  { track: "Midnight Static", playlist: "Late Night Drive Radio", reach: "262K" },
  { track: "Glass Hours", playlist: "Chill Atlas", reach: "910K" },
  { track: "Run It Back", playlist: "Rap Rotation Live", reach: "780K" },
  { track: "Paper Planes Fall", playlist: "Global Pulse 100", reach: "1.4M" },
] as const;

export const MARQUEE_A = ["Spotify", "YouTube", "SoundCloud", "Apple Music", "Playlist placements", "Artist growth"];
export const MARQUEE_B = ["Real listeners", "Verified curators", "No bots, ever", "Weekly reporting", "500K to 2M+ reach", "Release campaigns"];

export type Playlist = { name: string; curator: string; genre: string; reach: string };
export type Tier = {
  name: string;
  range: string;
  blurb: string;
  intensity: number;
  playlists: Playlist[];
};

export const TIERS: Tier[] = [
  {
    name: "Emerging",
    range: "25K to 100K",
    blurb: "Tight, genre-true playlists where new releases get their first real saves.",
    intensity: 0.5,
    playlists: [
      { name: "Fresh Frequency", curator: "Curated by Marlo Tran", genre: "Indie pop", reach: "48K" },
      { name: "Bedroom Pop Index", curator: "Curated by Eden Hale", genre: "Bedroom pop", reach: "72K" },
      { name: "Sunday Static", curator: "Curated by Rue Calloway", genre: "Lo-fi indie", reach: "91K" },
    ],
  },
  {
    name: "Rising",
    range: "100K to 500K",
    blurb: "Where a track starts to feed algorithmic radio and Discover-style surfaces.",
    intensity: 0.8,
    playlists: [
      { name: "Indie Pulse", curator: "Curated by North & Vale", genre: "Alt indie", reach: "184K" },
      { name: "Late Night Drive Radio", curator: "Curated by Jonah Pike", genre: "Synth, dream pop", reach: "262K" },
      { name: "New Wave Weekly", curator: "Curated by Sable Audio", genre: "New wave, post-punk", reach: "410K" },
    ],
  },
  {
    name: "Major",
    range: "500K to 1M",
    blurb: "Category-defining lists. One placement here changes a release's trajectory.",
    intensity: 1.1,
    playlists: [
      { name: "Alt Nation Daily", curator: "Curated by Halo Collective", genre: "Alternative", reach: "640K" },
      { name: "Rap Rotation Live", curator: "Curated by Kingsway Media", genre: "Hip-hop", reach: "780K" },
      { name: "Chill Atlas", curator: "Curated by Atlas Sound", genre: "Chill, electronic", reach: "910K" },
    ],
  },
  {
    name: "Flagship",
    range: "1M to 2M+",
    blurb: "The biggest independent audiences on the platform. Reserved for the strongest records.",
    intensity: 1.5,
    playlists: [
      { name: "Global Pulse 100", curator: "Curated by Pulse Network", genre: "Pop crossover", reach: "1.4M" },
      { name: "Main Stage Mixtape", curator: "Curated by Arcade Radio", genre: "Dance, electronic", reach: "1.8M" },
      { name: "Sound Atlas Hits", curator: "Curated by Atlas Sound", genre: "Multi-genre", reach: "2.3M" },
    ],
  },
];

export type Service = {
  platform: string;
  lead: string;
  points: string[];
  metric: string;
  metricLabel: string;
};

export const SERVICES: Service[] = [
  {
    platform: "Spotify",
    lead: "Playlist placements on curator lists from 25K to 2M+ monthly listeners, paired with release-week saves and algorithmic lift.",
    points: [
      "Pitching to vetted independent and partner curators in your genre",
      "Save-rate and skip-rate monitoring on every placement",
      "Pre-save, canvas and Spotify for Artists profile optimisation",
    ],
    metric: "3.4x",
    metricLabel: "average monthly listener growth in 90 days",
  },
  {
    platform: "YouTube",
    lead: "Music video and Shorts promotion that reaches real viewers, with channel-level strategy built around watch time.",
    points: [
      "Targeted discovery campaigns for official videos and lyric videos",
      "Shorts and creator seeding to feed the Topic channel",
      "Thumbnail, title and end-screen testing",
    ],
    metric: "1.9M",
    metricLabel: "average views driven per campaign",
  },
  {
    platform: "SoundCloud",
    lead: "Repost network, curated station placement and community growth for artists breaking through underground and rap-first.",
    points: [
      "Reposts across verified, genre-matched channels",
      "Station and curated-list inclusion for new uploads",
      "Follower and comment quality screening",
    ],
    metric: "212K",
    metricLabel: "average plays in the first 30 days",
  },
  {
    platform: "Apple Music",
    lead: "Listener acquisition and playlist pitching on Apple Music, plus Shazam-driven discovery around release moments.",
    points: [
      "Apple Music for Artists profile and pitch preparation",
      "Playlist submissions to independent Apple Music curators",
      "Shazam and social campaigns that convert to library adds",
    ],
    metric: "68K",
    metricLabel: "average new listeners per campaign",
  },
];

export const RESULTS = [
  { value: 1.2, decimals: 1, suffix: "B+", label: "streams driven for independent artists" },
  { value: 4900, decimals: 0, suffix: "+", label: "playlist placements secured" },
  { value: 380, decimals: 0, suffix: "+", label: "artists and labels grown" },
  { value: 92, decimals: 0, suffix: "%", label: "of campaigns hit their listener goal" },
] as const;

export type CaseStudy = {
  artist: string;
  /** file name (no extension) looked up in public/artists/ */
  slug: string;
  fromN: number;
  toN: number;
  /** top playlists shown in the analytics mockup */
  top: { name: string; reach: string }[];
  genre: string;
  platform: string;
  from: string;
  to: string;
  timeline: string;
  placements: string;
  streams: string;
  line: string;
  cover: number;
};

export const CASES: CaseStudy[] = [
  {
    artist: "Nova Reyes",
    slug: "nova-reyes",
    fromN: 8214,
    toN: 412038,
    top: [{ name: "Indie Pulse", reach: "184K" }, { name: "Late Night Drive Radio", reach: "262K" }],
    genre: "Indie pop",
    platform: "Spotify",
    from: "8.2K",
    to: "412K",
    timeline: "11 weeks",
    placements: "31 playlists",
    streams: "6.4M streams",
    line: "A release with no label behind it, placed on lists with a combined 4.1M followers.",
    cover: 0,
  },
  {
    artist: "Dax Mercer",
    slug: "dax-mercer",
    fromN: 14306,
    toN: 690100,
    top: [{ name: "Rap Rotation Live", reach: "780K" }, { name: "Fresh Frequency", reach: "48K" }],
    genre: "Hip-hop",
    platform: "YouTube + Spotify",
    from: "14K",
    to: "690K",
    timeline: "14 weeks",
    placements: "44 playlists",
    streams: "9.8M streams",
    line: "Video-first rollout. The Shorts push fed a Rap Rotation Live placement in week five.",
    cover: 1,
  },
  {
    artist: "Isla Winter",
    slug: "isla-winter",
    fromN: 3128,
    toN: 186244,
    top: [{ name: "Sunday Static", reach: "91K" }, { name: "Bedroom Pop Index", reach: "72K" }],
    genre: "Dream pop",
    platform: "Spotify",
    from: "3.1K",
    to: "186K",
    timeline: "9 weeks",
    placements: "22 playlists",
    streams: "2.7M streams",
    line: "From a debut single to a 186K listener base, with a 41% save rate on the lead track.",
    cover: 2,
  },
  {
    artist: "Halcyon Drift",
    slug: "halcyon-drift",
    fromN: 21447,
    toN: 540300,
    top: [{ name: "Chill Atlas", reach: "910K" }, { name: "Main Stage Mixtape", reach: "1.8M" }],
    genre: "Electronic",
    platform: "SoundCloud + Apple Music",
    from: "21K",
    to: "540K",
    timeline: "12 weeks",
    placements: "38 playlists",
    streams: "7.9M plays",
    line: "A three-single run across SoundCloud and Apple Music that opened festival bookings.",
    cover: 3,
  },
  {
    artist: "Mira Okafor",
    slug: "mira-okafor",
    fromN: 26033,
    toN: 1104876,
    top: [{ name: "Global Pulse 100", reach: "1.4M" }, { name: "Sound Atlas Hits", reach: "2.3M" }],
    genre: "Afrobeats",
    platform: "Spotify + YouTube",
    from: "26K",
    to: "1.1M",
    timeline: "16 weeks",
    placements: "57 playlists",
    streams: "18.3M streams",
    line: "Two flagship placements above 1.4M followers carried the record across three markets.",
    cover: 4,
  },
];

export const PROCESS = [
  {
    title: "Audit and positioning",
    when: "Week 1",
    text: "We listen to the record, map your sound to real playlist ecosystems, and review your profiles, art and pre-save setup. You leave with a target list and a release plan.",
    items: ["Sound and audience mapping", "Profile and metadata clean-up", "Target playlist shortlist"],
  },
  {
    title: "Pitch and placement",
    when: "Weeks 2 to 6",
    text: "Our curator relationships do the heavy lifting. We pitch tracks to vetted playlists, track each decision, and replace anything that underperforms on saves.",
    items: ["Personal curator pitching", "Placement tracking in real time", "Save and skip-rate screening"],
  },
  {
    title: "Amplify",
    when: "Weeks 3 to 10",
    text: "Placements give you momentum, then we compound it with short-form video, creator seeding and targeted ads that point at the same track at the same time.",
    items: ["Short-form content plan", "Creator and fan-page seeding", "Retargeting to new listeners"],
  },
  {
    title: "Scale and report",
    when: "Ongoing",
    text: "A plain-English report every week: who listened, where they came from, what converted. Then we double down on whatever is working and plan the next release.",
    items: ["Weekly performance reports", "Next-tier playlist targets", "Release calendar for the next 90 days"],
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  result: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "I had tried three other promo services. Every one gave me streams that vanished in a week. Vexoraa put me on lists where people actually saved the song. My listeners are still here six months later.",
    name: "Nova Reyes",
    role: "Indie pop artist",
    result: "8.2K to 412K monthly listeners",
  },
  {
    quote:
      "Weekly reports in plain English, a real person answering at 11pm before my drop, and a placement that moved the whole release. This is how a marketing team should work.",
    name: "Dax Mercer",
    role: "Hip-hop artist",
    result: "14K to 690K monthly listeners",
  },
  {
    quote:
      "As a manager I need numbers I can show a label. Vexoraa hands me save rates, source of streams and playlist reach, and none of it looks padded. It got us to two meetings.",
    name: "Tamsin Reid",
    role: "Artist manager, Northgate Management",
    result: "3 artists grown across 2 releases",
  },
  {
    quote:
      "They understood the genre before we sent the pitch. Our SoundCloud and Apple Music numbers moved together, which never happened when we ran things ourselves.",
    name: "Halcyon Drift",
    role: "Electronic duo",
    result: "21K to 540K monthly listeners",
  },
  {
    quote:
      "We put four of our releases through Vexoraa. The two flagship placements paid for the entire run, and the catalogue streams kept climbing afterwards.",
    name: "Joaquin Beltran",
    role: "A&R, Lowtide Records",
    result: "4 releases, 22M combined streams",
  },
];

export type Plan = {
  name: string;
  price: string;
  unit: string;
  cadence: string;
  tag: string;
  features: string[];
  cta: string;
};

export const PLANS: Plan[] = [
  {
    name: "Launch",
    price: "$80",
    unit: "per week",
    cadence: "Weekly campaign, 4 weeks recommended",
    tag: "For your next single",
    features: [
      "Pitching to Emerging and Rising playlists",
      "Up to 3 curated placements every week",
      "Profile and pre-save optimisation",
      "Weekly performance report",
    ],
    cta: "Start with Launch",
  },
  {
    name: "Growth",
    price: "$160",
    unit: "per week",
    cadence: "Weekly campaign, 8 weeks recommended",
    tag: "Most artists choose this",
    features: [
      "Everything in Launch, plus Major tier pitching",
      "Up to 4 curated placements every week",
      "Short-form and creator seeding plan",
      "Targeted ads on your lead track",
      "Fortnightly strategy chat",
    ],
    cta: "Start with Growth",
  },
  {
    name: "Breakthrough",
    price: "$300",
    unit: "for 2 weeks",
    cadence: "2-week sprint, one flat price",
    tag: "For label-level releases",
    features: [
      "Flagship tier pitching up to 2M+ listeners",
      "Priority curator access for release week",
      "Multi-platform: Spotify, YouTube, SoundCloud, Apple Music",
      "Dedicated campaign lead",
      "Release strategy for the next 90 days",
    ],
    cta: "Start with Breakthrough",
  },
];

export const FAQS = [
  {
    q: "Are the streams and listeners real?",
    a: "Yes. We only pitch to playlists run by real curators and we screen every placement for save rate, skip rate and listener geography. If a list looks inflated, we drop it. We never sell bot streams, and we will tell you if a platform's rules would put your profile at risk.",
  },
  {
    q: "How do you get tracks onto playlists?",
    a: "Through relationships. We pitch directly to a vetted network of independent and partner curators, matched to your genre and mood. Every pitch is written by a person who has listened to your track.",
  },
  {
    q: "Can you guarantee a number of listeners?",
    a: "No honest agency can. What we guarantee is the work: the placements we agree on, the reporting, and a replacement for any placement that underperforms. Most campaigns reach their listener goal, and the planning stage tells you early if a goal is unrealistic.",
  },
  {
    q: "How long until I see results?",
    a: "First placements usually land in the first two weeks. Listener growth compounds from week three as algorithmic playlists pick up the track. Plan on 8 to 12 weeks for the full effect.",
  },
  {
    q: "What do you need from me to start?",
    a: "A finished track (or a release date), your artist profile links, and a short note on your sound and goals. We handle the audit, pitch copy and targeting from there.",
  },
  {
    q: "Which genres do you work with?",
    a: "Pop, indie, hip-hop, R&B, electronic, dance, Afrobeats, rock, lo-fi and more. If your genre is outside our curator network, we will say so before you pay.",
  },
  {
    q: "Is there a contract or minimum term?",
    a: "No. Plans are priced per week, so you pay for the weeks you run. Breakthrough is a fixed 2-week sprint. No retainer, no auto-renewal, and if a campaign works you can keep going week by week.",
  },
];

export const FOOTER_LINKS = {
  Services: [
    { label: "Spotify growth", href: "#services" },
    { label: "YouTube growth", href: "#services" },
    { label: "SoundCloud growth", href: "#services" },
    { label: "Apple Music growth", href: "#services" },
  ],
  Company: [
    { label: "Results", href: "#results" },
    { label: "Process", href: "#process" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ],
  Follow: [
    { label: "Instagram", href: INSTAGRAM_URL },
  ],
} as const;
