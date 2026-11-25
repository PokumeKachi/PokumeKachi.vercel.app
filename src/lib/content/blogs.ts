import { marked } from "marked";

export type Post = {
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
  const filename = path.split("/").pop()?.replace(/\.md$/, "") ?? "untitled";

  const frontmatterMatch = raw.match(
    /^---\s*\r?\n([\s\S]*?)\r?\n---\s*(?:\r?\n|$)/,
  );

  const frontmatter = frontmatterMatch?.[1] ?? "";
  const content = raw.slice(frontmatterMatch?.[0].length ?? 0).trim();

  const headingMatch = content.match(/^#\s+(.+?)\s*#*\s*(?:\r?\n|$)/);
  const heading = headingMatch?.[1] ?? filename.replace(/[-_]/g, " ");

  const title = readField(frontmatter, "title") || heading;
  const slug = readField(frontmatter, "slug") || filename;
  const body = content.replace(/^#\s+.+(?:\r?\n)+/, "").trim();

  return {
    slug,
    title,
    date: readField(frontmatter, "date"),
    description: readField(frontmatter, "description"),
    html: marked.parse(body, { async: false }) as string,
  };
}

export const posts: Post[] = Object.entries(markdownFiles)
  .map(([path, raw]) => createPost(path, raw))
  .sort((a, b) => {
    if (!a.date && !b.date) return a.slug.localeCompare(b.slug);
    if (!a.date) return 1;
    if (!b.date) return -1;

    return b.date.localeCompare(a.date);
  });

export function getPost(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}
