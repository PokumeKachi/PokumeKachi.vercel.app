<script lang="ts">
    import ScrollArt from "$lib/components/ScrollArt.svelte";

    import type { PageData } from "./$types";

    let { data }: { data: PageData } = $props();
</script>

<main class="container">
    <ScrollArt />

    <header class="page-header">
        <p class="eyebrow">Writing & notes</p>
        <h1 class="page-title">Blog</h1>
        <p class="intro">Thoughts, projects, and things I've learned.</p>
    </header>

    {#if data.posts.length === 0}
        <p class="empty">No posts yet.</p>
    {:else}
        <ul class="posts" aria-label="Blog posts">
            {#each data.posts as post (post.slug)}
                <li>
                    <a class="fx-tilt fx-sheen" href={`/blog/${post.slug}`}>
                        <span class="meta">
                            {#if post.date}
                                <time datetime={post.date}>{post.dateLabel}</time>
                            {/if}
                            <span class="arrow" aria-hidden="true">↗</span>
                        </span>

                        <h2>{post.title}</h2>
                        {#if post.description}
                            <p>{post.description}</p>
                        {/if}
                    </a>
                </li>
            {/each}
        </ul>
    {/if}
</main>

<style>
    .container {
        position: relative;
        isolation: isolate;

        width: min(100% - 2rem, 52rem);
        margin-inline: auto;
        padding-block: clamp(3rem, 8dvw, 7rem);
    }

    .page-header,
    .posts {
        position: relative;
        z-index: 1;
    }

    .page-header {
        margin-bottom: 3rem;
    }

    .intro {
        margin-top: 1rem;
        opacity: 0.7;
        line-height: 1.7;
    }

    .posts {
        display: grid;
        gap: 1rem;
        margin: 0;
        padding: 0;
    }

    .posts li {
        list-style: none;
    }

    .posts a {
        display: block;
        padding: clamp(1.25rem, 4dvw, 1.75rem);
        border: 1px solid var(--pico-border-color);
        border-radius: var(--ui-radius);
        background: var(--pico-card-background-color);
        box-shadow: var(--ui-shadow);
        text-decoration: none;
        transition:
            transform var(--ui-fast) var(--ui-ease),
            border-color var(--ui-fast) ease,
            box-shadow var(--ui-fast) ease;
    }

    .meta {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 0.8rem;
        opacity: 0.6;
    }

    .arrow {
        transition:
            transform var(--ui-fast) var(--ui-ease),
            opacity var(--ui-fast) ease;
    }

    h2 {
        margin: 0.6rem 0 0.35rem;
        font-size: clamp(1.35rem, 3dvw, 1.75rem);
        line-height: 1.3;
    }

    p {
        margin: 0;
        line-height: 1.6;
        opacity: 0.7;
    }

    .empty {
        padding-block: 2rem;
        opacity: 0.6;
    }

    @media (hover: hover) {
        .posts a:hover {
            border-color: var(--pico-primary);
            box-shadow: var(--ui-shadow-lift);
        }

        .posts a:hover .arrow {
            transform: translate(3px, -3px);
            opacity: 1;
        }
    }
</style>
