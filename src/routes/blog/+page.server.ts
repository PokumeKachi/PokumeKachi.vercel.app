import { posts } from "$lib/content/blogs";

import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = () => ({ posts });
