import { PATH_TITLES } from "./sitemap";

export type Project = {
    slug: string;
    name: string;
    title: string;
    url: string;
};

export const projects: Project[] = [
    {
        slug: "ybiau",
        name: "ybiau",
        title: PATH_TITLES["/projects/ybiau"],
        url: "https://ybiau.vercel.app",
    },
    {
        slug: "loimon",
        name: "Lối Mòn",
        title: PATH_TITLES["/projects/loimon"],
        url: "https://loimon.vercel.app",
    },
];

export function getProject(slug: string): Project | undefined {
    return projects.find((project) => project.slug === slug);
}
