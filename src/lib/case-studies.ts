import { db } from "@/lib/db";
import { caseStudies as staticCaseStudies, type CaseStudy } from "@/lib/site-data";

export async function getAllCaseStudies(): Promise<CaseStudy[]> {
  try {
    const dbStudies = await db.caseStudy.findMany({
      orderBy: { createdAt: "desc" },
    });

    const mapped: CaseStudy[] = dbStudies.map((s) => ({
      id: s.slug,
      client: s.client,
      industry: s.industry as CaseStudy["industry"],
      summary: s.summary,
      metric: s.metric,
      metricLabel: s.metricLabel,
      image: s.image,
      content: JSON.parse(s.content),
    }));

    return [...mapped, ...staticCaseStudies];
  } catch (err) {
    // No database configured (e.g. free test deploy) — fall back to static content.
    console.warn("Case studies DB unavailable, using static data only:", err);
    return staticCaseStudies;
  }
}

export function caseStudiesEmailHtml(studies: CaseStudy[], siteUrl: string) {
  const cards = studies
    .map(
      (s) => `
        <tr>
          <td style="padding:0 0 20px 0;">
            <a href="${siteUrl}/case-studies/${s.id}" style="text-decoration:none;color:inherit;">
              <div style="border:1px solid #eee;border-radius:12px;overflow:hidden;">
                <img src="${s.image}" alt="${s.client}" style="width:100%;height:160px;object-fit:cover;display:block;" />
                <div style="padding:16px;">
                  <p style="margin:0 0 4px 0;font-size:11px;letter-spacing:0.05em;text-transform:uppercase;color:#888;">${s.industry}</p>
                  <h3 style="margin:0 0 8px 0;font-size:16px;color:#111;">${s.client}</h3>
                  <p style="margin:0 0 10px 0;font-size:13px;color:#555;line-height:1.5;">${s.summary}</p>
                  <p style="margin:0;font-size:13px;font-weight:bold;color:#631DFE;">${s.metric} ${s.metricLabel}</p>
                </div>
              </div>
            </a>
          </td>
        </tr>`
    )
    .join("");

  return `
    <div style="font-family:sans-serif;max-width:480px;margin:0 auto;">
      <h2 style="color:#111;">Thanks for subscribing to RavenClaw!</h2>
      <p style="color:#555;font-size:14px;line-height:1.6;">
        We'll email you whenever we publish new work. In the meantime, here are a few case studies to check out:
      </p>
      <table style="width:100%;border-collapse:collapse;margin-top:16px;">
        ${cards}
      </table>
      <p style="text-align:center;">
        <a href="${siteUrl}/case-studies" style="color:#631DFE;font-size:13px;">See all case studies →</a>
      </p>
    </div>
  `;
}
