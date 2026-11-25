import { error } from "@sveltejs/kit";

import { getPost, posts } from "$lib/content/blogs";

import type { EntryGenerator, PageServerLoad } from "./$types";

export const prerender = "auto";

export const entries: EntryGenerator = () =>
  posts.map(({ slug }) => ({ slug }));

export const load: PageServerLoad = ({ params }) => {
  const post = getPost(params.slug);

  if (!post) error(404, "Post not found");

  return { post };
};
