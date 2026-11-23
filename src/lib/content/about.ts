export type Tag = { label: string; url: string };

export const profile = {
    facts: [
        { label: "Name", value: "Pokume Kachi" },
        { label: "Country", value: "Vietnam" },
        { label: "Occupation", value: "Student" },
        {
            label: "Education",
            value: [
                "Vinh Linh High School · K66.2023–2026",
                "VNU-HCMUS · APCS Major · K26",
            ],
        },
    ],
} as const;

export const languages: Tag[] = [
    { label: "C++", url: "https://isocpp.org" },
    { label: "Rust", url: "https://www.rust-lang.org" },
    { label: "TypeScript", url: "https://www.typescriptlang.org" },
    { label: "Python", url: "https://www.python.org" },
    { label: "Lua", url: "https://www.lua.org" },
    { label: "Dart", url: "https://dart.dev" },
];

export const capabilities: { title: string; tags: Tag[] }[] = [
    {
        title: "Full-stack websites",
        tags: [
            { label: "Axum", url: "https://github.com/tokio-rs/axum" },
            { label: "HTMX", url: "https://htmx.org" },
            { label: "Node.js", url: "https://nodejs.org" },
            { label: "React", url: "https://react.dev" },
            { label: "SvelteKit", url: "https://svelte.dev/docs/kit" },
            { label: "Tailwind CSS", url: "https://tailwindcss.com" },
            { label: "Bootstrap", url: "https://getbootstrap.com" },
            { label: "PostCSS", url: "https://postcss.org" },
            { label: "PostgreSQL", url: "https://www.postgresql.org" },
            { label: "MongoDB", url: "https://www.mongodb.com" },
            { label: "Redis", url: "https://redis.io" },
            { label: "Nginx", url: "https://nginx.org" },
            { label: "Caddy", url: "https://caddyserver.com" },
            { label: "Podman", url: "https://podman.io" },
            { label: "Docker", url: "https://www.docker.com" },
        ],
    },
    {
        title: "Native applications",
        tags: [
            { label: "Flutter", url: "https://flutter.dev" },
            { label: "Qt", url: "https://www.qt.io" },
            { label: "GTK", url: "https://gtk-rs.org" },
            { label: "Ratatui", url: "https://ratatui.rs" },
            { label: "Textual", url: "https://textual.textualize.io" },
        ],
    },
    {
        title: "Sysadmin & hosting",
        tags: [
            { label: "NixOS", url: "https://nixos.org" },
            { label: "Arch Linux", url: "https://archlinux.org" },
            { label: "Debian", url: "https://debian.org" },
            { label: "Ubuntu Server", url: "https://ubuntu.com/server" },
            { label: "Nix", url: "https://nix.dev" },
            { label: "Podman", url: "https://podman.io" },
            { label: "Docker", url: "https://www.docker.com" },
        ],
    },
];
