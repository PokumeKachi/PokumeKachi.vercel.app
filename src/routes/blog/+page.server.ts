import { marked } from "marked";
import type { PageServerLoad } from "./$types";

type Post = {
    slug: string;
    title: string;
    date: string;
    description: string;
    html: string;
};

const markdownFiles = import.meta.glob("$lib/content/blogs/*.md", {
    eager: true,
    query: "?raw",
    import: "default",
}) as Record<string, string>;

function readField(frontmatter: string, key: string): string {
    const match = frontmatter.match(new RegExp(`^${key}:\\s*(.*?)\\s*$`, "m"));

    return match?.[1]?.replace(/^(['"])(.*)\1$/, "$2").trim() ?? "";
}

function createPost(path: string, raw: string): Post {
    const slug = path.split("/").pop()?.replace(/\.md$/, "") ?? "untitled";

    const frontmatterMatch = raw.match(
        /^---\s*\r?\n([\s\S]*?)\r?\n---\s*(?:\r?\n|$)/,
    );

    const frontmatter = frontmatterMatch?.[1] ?? "";
    const content = raw.slice(frontmatterMatch?.[0].length ?? 0).trim();

    const headingMatch = content.match(/^#\s+(.+?)\s*#*\s*(?:\r?\n|$)/);

    const title =
        readField(frontmatter, "title") ||
        headingMatch?.[1] ||
        slug.replace(/[-_]/g, " ");

    const body = content.replace(/^#\s+.+(?:\r?\n)+/, "").trim();

    return {
        slug,
        title,
        date: readField(frontmatter, "date"),
        description: readField(frontmatter, "description"),
        html: marked.parse(body, { async: false }) as string,
    };
}

export const load: PageServerLoad = () => {
    const posts = Object.entries(markdownFiles)
        .map(([path, raw]) => createPost(path, raw))
        .sort((a, b) => {
            if (!a.date && !b.date) return a.slug.localeCompare(b.slug);
            if (!a.date) return 1;
            if (!b.date) return -1;

            return b.date.localeCompare(a.date);
        });

    return { posts };
};
