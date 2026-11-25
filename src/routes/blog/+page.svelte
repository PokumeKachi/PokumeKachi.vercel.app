<script lang="ts">
    import type { PageData } from "./$types";

    let { data }: { data: PageData } = $props();

    const dateFormatter = new Intl.DateTimeFormat("en", {
        dateStyle: "medium",
        timeZone: "UTC",
    });

    function formatDate(date: string): string {
        const parsed = new Date(`${date}T00:00:00Z`);

        if (Number.isNaN(parsed.getTime())) return date;

        return dateFormatter.format(parsed);
    }
</script>

<header>
    <h1>Thoughts.</h1>
</header>

{#if data.posts.length === 0}
    <p>No posts yet.</p>
{:else}
    <section aria-label="Blog posts">
        {#each data.posts as post (post.slug)}
            <a href={`/blog/${post.slug}`}>
                <article>
                    <p>
                        {#if post.description}
                            {post.description}
                        {/if}
                        {#if post.date}
                            {post.description ? "-" : ""}
                            <time datetime={post.date}>
                                {formatDate(post.date)}
                            </time>
                        {/if}
                    </p>
                </article>
            </a>
        {/each}
    </section>
{/if}
