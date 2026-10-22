const site = "https://pokumekachi.vercel.app";

const pages = [
    { path: "", priority: "1.0", changefreq: "weekly" },
    { path: "/blog", priority: "0.8", changefreq: "weekly" },
    { path: "/contact", priority: "0.6", changefreq: "monthly" },
    { path: "/projects", priority: "0.8", changefreq: "weekly" },
    { path: "/projects/loimon", priority: "0.6", changefreq: "monthly" },
    { path: "/projects/ybiau", priority: "0.6", changefreq: "monthly" },
];

export async function GET() {
    const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
    .map(
        (p) => `  <url>
    <loc>${site}${p.path}</loc>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`,
    )
    .join("\n")}
</urlset>`;

    return new Response(body, {
        headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=0, s-maxage=3600",
        },
    });
}
