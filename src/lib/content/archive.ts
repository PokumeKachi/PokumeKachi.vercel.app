import type { Tag } from "./about";

export type ArchiveItem = {
    title: string;
    period: string;
    detail?: string;
    items?: string[];
    links?: Tag[];
};

export const archive: ArchiveItem[] = [
    {
        title: "Godot games",
        period: "2022–2024",
        detail: "Small games and competition entries built with Godot.",
        items: [
            "Brackeys Game Jam 2023.1 entry",
            "Hoi thi Tin hoc tre cap Tinh Quang Tri 2022–2023 entry",
            "Hoi thi Nghien cuu khoa hoc cap Tinh Quang Tri 2023–2024 entry",
        ],
        links: [
            {
                label: "Source",
                url: "https://github.com/PokumeKachi/godot-projects-archive",
            },
        ],
    },
    {
        title: "Dictionary database generator",
        period: "Oct–Dec 2024",
        detail:
            "A Lua script that builds a whole dictionary database from a text file using a custom syntax.",
        links: [
            { label: "Source", url: "https://github.com/PokumeKachi/the-dumpster" },
        ],
    },
    {
        title: "Question bank generator",
        period: "Oct–Dec 2024",
        detail:
            "Another Lua tool that generates test papers from a text file with an extended custom syntax.",
        links: [{ label: "Source", url: "https://github.com/PokumeKachi/mph" }],
    },
    {
        title: "Arduino robot controller",
        period: "July 2025",
        detail: "Built for FPTU AI & Robotics Challenge 2025, Round 2.",
        links: [
            { label: "Source", url: "https://github.com/PokumeKachi/fptu-robot" },
        ],
    },
    {
        title: "Static portfolio (retired)",
        period: "February 2026",
        detail: "Built with Astro and Tailwind CSS. Replaced by this site.",
        links: [
            {
                label: "Source",
                url: "https://github.com/PokumeKachi/pokumekachi.web.app",
            },
            {
                label: "Live archive",
                url: "https://pokumekachi.web.app/legacy",
            },
        ],
    },
    {
        title: "This portfolio",
        period: "August 2026",
        detail: "Built with SvelteKit and Pico CSS, deployed on Vercel.",
        links: [
            {
                label: "Source",
                url: "https://github.com/PokumeKachi/pokumekachi.vercel.app",
            },
            { label: "Live", url: "https://pokumekachi.vercel.app" },
        ],
    },
    {
        title: "Linux journey",
        period: "2023–now",
        items: [
            "Debian · Aug 2023 – Dec 2023",
            "Arch Linux · Dec 2023 – May 2025",
            "NixOS · May 2025 – Jun 2026",
            "Arch Linux · Jun 2026 – now",
        ],
    },
];
