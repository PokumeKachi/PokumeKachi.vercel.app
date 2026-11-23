import { marked } from "marked";

export type Post = {
    slug: string;
    title: string;
    date: string;
    dateLabel: string;
    description: string;
    html: string;
};

const files = import.meta.glob<string>("$lib/content/blogs/*.md", {
    eager: true,
    query: "?raw",
    import: "default",
});

const dateFormatter = new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeZone: "UTC",
});

function field(frontmatter: string, key: string): string {
    return (
        frontmatter
            .match(new RegExp(`^${key}:\\s*(.*?)\\s*$`, "m"))?.[1]
            ?.replace(/^(['"])(.*)\1$/, "$2")
            .trim() ?? ""
    );
}

function formatDate(date: string): string {
    const parsed = new Date(`${date}T00:00:00Z`);
    return Number.isNaN(parsed.getTime()) ? date : dateFormatter.format(parsed);
}

function toPost(path: string, raw: string): Post {
    const frontmatterMatch = raw.match(
        /^---\s*\r?\n([\s\S]*?)\r?\n---\s*(?:\r?\n|$)/,
    );
    const frontmatter = frontmatterMatch?.[1] ?? "";
    const content = raw.slice(frontmatterMatch?.[0].length ?? 0).trim();
    const fallbackSlug =
        path.split("/").pop()?.replace(/\.md$/, "") ?? "untitled";

    const heading = content.match(/^#\s+(.+?)\s*#*\s*(?:\r?\n|$)/)?.[1];
    const date = field(frontmatter, "date");
    const body = content.replace(/^#\s+.+(?:\r?\n)+/, "").trim();

    return {
        slug: field(frontmatter, "slug") || fallbackSlug,
        title:
            field(frontmatter, "title") ||
            heading ||
            fallbackSlug.replace(/[-_]/g, " "),
        date,
        dateLabel: formatDate(date),
        description: field(frontmatter, "description"),
        html: marked.parse(body, { async: false }) as string,
    };
}

export function getPosts(): Post[] {
    return Object.entries(files)
        .map(([path, raw]) => toPost(path, raw))
        .sort((a, b) => {
            if (!a.date && !b.date) return a.slug.localeCompare(b.slug);
            if (!a.date) return 1;
            if (!b.date) return -1;
            return b.date.localeCompare(a.date);
        });
}

export function getPost(slug: string): Post | undefined {
    return getPosts().find((post) => post.slug === slug);
}
