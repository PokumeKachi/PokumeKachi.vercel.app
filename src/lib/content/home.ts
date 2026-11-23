type HeroAction = { label: string; href: string; primary?: boolean };

export const hero: {
    eyebrow: string;
    lead: string;
    accent: string;
    description: string;
    actions: HeroAction[];
} = {
    eyebrow: "Student · Developer · Vietnam",
    lead: "Pokume",
    accent: "Kachi",
    description:
        "I build clean, fast interfaces and small tools that make the web a little more useful.",
    actions: [
        { label: "Projects", href: "/projects", primary: true },
        { label: "Writing", href: "/blog" },
        { label: "Contact", href: "/contact" },
    ],
};
