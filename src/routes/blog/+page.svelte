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

<svelte:head>
    <title>Blog — Pokume Kachi</title>
</svelte:head>

<header>
    <p><small>Writing &amp; notes</small></p>
    <hgroup>
        <h1>Blog</h1>
        <p>Thoughts, projects, and things I've learned.</p>
    </hgroup>
</header>

{#if data.posts.length === 0}
    <p>No posts yet.</p>
{:else}
    <section aria-label="Blog posts">
        {#each data.posts as post (post.slug)}
            <article>
                <header>
                    <h2>{post.title}</h2>
                    <p>
                        {#if post.date}
                            <small>
                                <time datetime={post.date}>
                                    {formatDate(post.date)}
                                </time>
                            </small>
                        {/if}
                        {#if post.description}
                            {post.date ? "—" : ""}
                            {post.description}
                        {/if}
                    </p>
                </header>

                {@html post.html}
            </article>
        {/each}
    </section>
{/if}
