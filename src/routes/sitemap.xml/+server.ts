import { PATH_TITLES } from "$lib/content/sitemap";

const site = "https://pokumekachi.vercel.app";

export function GET() {
    const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Object.keys(PATH_TITLES)
    .map(
        (path) => `  <url>
    <loc>${site}${path}</loc>
    <changefreq>${path === "/" || path === "/blog" || path === "/projects" ? "weekly" : "monthly"}</changefreq>
    <priority>${path === "/" ? "1.0" : path === "/blog" || path === "/projects" ? "0.8" : "0.6"}</priority>
  </url>`,
    )
    .join("\n")}
</urlset>`;

    return new Response(body, {
        headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=0, s-maxage=3600",
        },
    });
}
