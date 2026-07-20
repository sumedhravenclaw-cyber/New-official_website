import type { NextConfig } from "next";

/**
 * Cache policy for everything under `public/`.
 *
 * Next fingerprints its own build output, so `/_next/static/*` is already
 * served immutable and needs nothing here. Files in `public/` are different:
 * they're served under the literal name you gave them, so without an explicit
 * policy the default is effectively "revalidate every time". On a site carrying
 * ~490MB of video and ~39MB of images, that means a conditional request per
 * asset per navigation — the single largest avoidable cost on repeat visits.
 *
 * The tradeoff is that an un-fingerprinted URL can't be busted. That cuts
 * differently per asset class, so the policies below differ deliberately:
 *
 *  - videos/fonts are large and effectively append-only (a new cut ships as a
 *    new file), so they take a full immutable year.
 *  - images are edited in place during design passes, so a year of immutable
 *    would strand returning visitors on a stale logo. They get a day of
 *    freshness plus a week of stale-while-revalidate: still one request per
 *    day instead of per navigation, but an edit propagates within a day.
 *
 * If you ever *do* need to replace a video or font, ship it under a new
 * filename rather than overwriting — that's the cost of the immutable year.
 */
const CACHE_FOREVER = "public, max-age=31536000, immutable";
const CACHE_DAY_SWR = "public, max-age=86400, stale-while-revalidate=604800";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: false,

  async headers() {
    return [
      {
        source: "/videos/:path*",
        headers: [{ key: "Cache-Control", value: CACHE_FOREVER }],
      },
      {
        source: "/fonts/:path*",
        headers: [{ key: "Cache-Control", value: CACHE_FOREVER }],
      },
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: CACHE_DAY_SWR }],
      },
      {
        // Brand marks referenced directly from markup rather than from
        // public/images — same edit cadence, same policy.
        source: "/logo.svg",
        headers: [{ key: "Cache-Control", value: CACHE_DAY_SWR }],
      },
    ];
  },
};

export default nextConfig;
