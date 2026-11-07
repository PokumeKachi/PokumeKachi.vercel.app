export const PATH_TITLES: Record<string, string> = {
    "/": "Pokume Kachi.",
    "/projects": "Products, delivered.",
    "/blog": "Personal life, updated.",
    "/contact": "Communication, simplified.",
    "/projects/loimon": "The optimally distributed knowledge system",
    "/projects/ybiau": "Your Brain In ASCII / UTF-8",
} as const;

export const HEADER_LINKS = [
    ["Home", "/"],
    ["Projects", "/projects"],
    ["Blog", "/blog"],
    ["Contact", "/contact"],
] as const;
