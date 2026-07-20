import { NextResponse } from "next/server";

/**
 * Live Google reviews for the testimonials section.
 *
 * Proxies the Places API (New) Place Details call so the API key never reaches
 * the browser, and normalises the response to exactly what the carousel
 * renders. Google returns at most the five "most relevant" reviews for a
 * place — an API limit, not a choice made here.
 *
 * The upstream fetch revalidates hourly: a new review on the Business Profile
 * shows up on the site within the hour, and every visitor in between is served
 * from cache instead of spending Places quota.
 *
 * Unconfigured (no key / Place ID) or failing responses both return an empty
 * review list — the section then falls back to the hand-written testimonials,
 * matching how the rest of the site degrades without its env vars.
 */

export const revalidate = 3600;

export interface GoogleReviewSlide {
  name: string;
  /** Google profile photo URL; absent for reviewers without one. */
  img?: string;
  rating: number;
  review: string;
  /** Google's own phrasing, e.g. "2 weeks ago" — shown under the name. */
  time: string;
}

export interface GoogleReviewsPayload {
  configured: boolean;
  /** Aggregate business rating, e.g. 4.9. */
  rating?: number;
  /** Total review count behind that rating. */
  count?: number;
  /** Link to the Business Profile on Google Maps. */
  mapsUrl?: string;
  reviews: GoogleReviewSlide[];
}

/** The slice of the Places API response this route reads. */
interface PlacesDetailsResponse {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: {
    rating?: number;
    text?: { text?: string };
    relativePublishTimeDescription?: string;
    authorAttribution?: {
      displayName?: string;
      photoUri?: string;
    };
  }[];
}

export async function GET() {
  const key = process.env.GOOGLE_MAPS_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!key || !placeId) {
    return NextResponse.json({
      configured: false,
      reviews: [],
    } satisfies GoogleReviewsPayload);
  }

  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
      headers: {
        "X-Goog-Api-Key": key,
        "X-Goog-FieldMask": "rating,userRatingCount,googleMapsUri,reviews",
      },
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      throw new Error(`Places API ${res.status}: ${await res.text()}`);
    }
    const place: PlacesDetailsResponse = await res.json();

    const reviews: GoogleReviewSlide[] = (place.reviews ?? [])
      // Rating-only reviews have no text — nothing to quote in the carousel.
      .filter((r) => r.text?.text)
      .map((r) => ({
        name: r.authorAttribution?.displayName ?? "Google user",
        img: r.authorAttribution?.photoUri,
        rating: r.rating ?? 5,
        review: r.text!.text!,
        time: r.relativePublishTimeDescription ?? "",
      }));

    return NextResponse.json({
      configured: true,
      rating: place.rating,
      count: place.userRatingCount,
      mapsUrl: place.googleMapsUri,
      reviews,
    } satisfies GoogleReviewsPayload);
  } catch (err) {
    console.error("Google reviews fetch error:", err);
    // Empty list → the client keeps the manual testimonials; no visitor-facing error.
    return NextResponse.json({
      configured: true,
      reviews: [],
    } satisfies GoogleReviewsPayload);
  }
}
