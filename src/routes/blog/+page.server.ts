import { getPosts } from "$lib/content/posts.server";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = () => ({ posts: getPosts() });
