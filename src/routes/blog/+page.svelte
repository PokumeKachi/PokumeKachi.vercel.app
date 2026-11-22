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

<main class="container">
    <header class="page-header">
        <p class="eyebrow">WRITING & NOTES</p>
        <h1>Blog</h1>
        <p class="intro">Thoughts, projects, and things I've learned.</p>
    </header>

    {#if data.posts.length === 0}
        <p class="empty">No posts yet.</p>
    {:else}
        <section class="posts" aria-label="Blog posts">
            {#each data.posts as post (post.slug)}
                <article class="post">
                    <header class="post-header">
                        {#if post.date}
                            <time datetime={post.date}>
                                {formatDate(post.date)}
                            </time>
                        {/if}

                        <h2>{post.title}</h2>

                        {#if post.description}
                            <p class="description">
                                {post.description}
                            </p>
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

<style>
    .container {
        width: min(100% - 2rem, 52rem);
        margin-inline: auto;
        padding-block: clamp(3rem, 8dvw, 7rem);
    }

    .page-header {
        margin-bottom: 3rem;
    }

    .eyebrow {
        margin-bottom: 0.75rem;
        font-size: 0.75rem;
        font-weight: 700;
        letter-spacing: 0.14em;
        opacity: 0.6;
    }

    h1 {
        margin: 0;
        font-size: clamp(2.5rem, 7dvw, 4rem);
        line-height: 1.1;
        letter-spacing: -0.05em;
    }

    .intro {
        margin-top: 1rem;
        opacity: 0.7;
        line-height: 1.7;
    }

    .posts {
        display: grid;
        gap: 1.5rem;
    }

    .post {
        min-width: 0;
        padding: clamp(1.25rem, 4dvw, 2rem);
        border: 1px solid var(--border-color, rgb(128 128 128 / 25%));
        border-radius: 1.25rem;
        background: var(--card-background, transparent);
        overflow-wrap: anywhere;
    }

    .post-header {
        margin-bottom: 1.5rem;
    }

    time {
        display: block;
        margin-bottom: 0.75rem;
        font-size: 0.8rem;
        opacity: 0.6;
    }

    .post-header h2 {
        margin: 0;
        font-size: clamp(1.5rem, 4dvw, 2rem);
        line-height: 1.3;
        letter-spacing: -0.035em;
    }

    .description {
        margin-top: 0.75rem;
        line-height: 1.7;
        opacity: 0.7;
    }

    .empty {
        padding-block: 2rem;
        opacity: 0.6;
    }

    :global(.markdown-content) {
        line-height: 1.8;
        overflow-wrap: anywhere;
    }

    :global(.markdown-content > :first-child) {
        margin-top: 0;
    }

    :global(.markdown-content > :last-child) {
        margin-bottom: 0;
    }

    :global(.markdown-content h2),
    :global(.markdown-content h3) {
        margin-top: 1.75em;
        margin-bottom: 0.5em;
        line-height: 1.4;
    }

    :global(.markdown-content p),
    :global(.markdown-content ul),
    :global(.markdown-content ol) {
        margin-block: 1em;
    }

    :global(.markdown-content a) {
        text-underline-offset: 0.2em;
    }

    :global(.markdown-content img) {
        display: block;
        max-width: 100%;
        height: auto;
        margin-block: 1.5rem;
        border-radius: 0.75rem;
    }

    :global(.markdown-content pre) {
        max-width: 100%;
        padding: 1rem;
        overflow-x: auto;
        border-radius: 0.75rem;
        background: var(--code-background, rgb(128 128 128 / 12%));
    }

    :global(.markdown-content code) {
        font-family: monospace;
        font-size: 0.9em;
    }

    :global(.markdown-content blockquote) {
        margin-inline: 0;
        padding-left: 1rem;
        border-left: 3px solid var(--border-color, rgb(128 128 128 / 35%));
        opacity: 0.8;
    }

    :global(.markdown-content table) {
        display: block;
        max-width: 100%;
        overflow-x: auto;
        border-collapse: collapse;
    }

    :global(.markdown-content th),
    :global(.markdown-content td) {
        padding: 0.5rem 0.75rem;
        border: 1px solid var(--border-color, rgb(128 128 128 / 25%));
        text-align: left;
    }
</style>
