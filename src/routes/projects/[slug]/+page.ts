import { error } from "@sveltejs/kit";

import {
    getProject,
    projects,
} from "$lib/content/projects";

import type { EntryGenerator, PageLoad } from "./$types";

export const prerender = 'auto';

export const entries: EntryGenerator = () =>
    projects.map(({ slug }) => ({ slug }));

export const load: PageLoad = ({ params }) => {
    const project = getProject(params.slug);

    if (!project) error(404, "Project not found");

    return { project };
};
