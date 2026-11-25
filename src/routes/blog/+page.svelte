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

<main>
    <header>
        <p class="eyebrow">Writing &amp; notes</p>
        <h1>Blog</h1>
        <p>Thoughts, projects, and things I've learned.</p>
    </header>

    {#if data.posts.length === 0}
        <p>No posts yet.</p>
    {:else}
        <section class="posts" aria-label="Blog posts">
            {#each data.posts as post (post.slug)}
                <article class="post">
                    <header>
                        {#if post.date}
                            <time datetime={post.date}>
                                {formatDate(post.date)}
                            </time>
                        {/if}

                        <h2>{post.title}</h2>

                        {#if post.description}
                            <p>{post.description}</p>
                        {/if}
                    </header>

                    <div class="markdown-content">
                        {@html post.html}
                    </div>
                </article>
            {/each}
        </section>
    {/if}
</main>
