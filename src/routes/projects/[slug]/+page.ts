import { error } from "@sveltejs/kit";
import projects from "$lib/content/projects";
import type { PageLoad } from "./$types";

export const load: PageLoad = ({ params }) => {
    const url = projects[params.slug as keyof typeof projects];

    if (!url) {
        error(404, "Project not found");
    }

    return { url };
};
