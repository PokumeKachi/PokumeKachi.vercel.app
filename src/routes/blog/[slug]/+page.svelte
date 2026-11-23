<script lang="ts">
    import ScrollArt from "$lib/components/ScrollArt.svelte";

    import type { PageData } from "./$types";

    let { data }: { data: PageData } = $props();
</script>

<main class="container">
    <ScrollArt />

    <a class="back" href="/blog">← All posts</a>

    <article>
        <header>
            {#if data.post.date}
                <time datetime={data.post.date}>{data.post.dateLabel}</time>
            {/if}
            <h1>{data.post.title}</h1>
            {#if data.post.description}
                <p class="description">{data.post.description}</p>
            {/if}
        </header>

        <div class="markdown-content">
            {@html data.post.html}
        </div>
    </article>
</main>

<style>
    .container {
        position: relative;
        isolation: isolate;

        width: min(100% - 2rem, 52rem);
        margin-inline: auto;
        padding-block: clamp(2rem, 6dvw, 4rem);
    }

    .back,
    article {
        position: relative;
        z-index: 1;
    }

    .back {
        display: inline-block;
        margin-bottom: 2rem;
        font-size: 0.9rem;
        text-decoration: none;
        opacity: 0.7;
    }

    .back:hover {
        opacity: 1;
    }

    article {
        padding: clamp(1.5rem, 5dvw, 3rem);
    }

    time {
        display: block;
        margin-bottom: 0.75rem;
        font-size: 0.8rem;
        opacity: 0.6;
    }

    h1 {
        margin: 0;
        font-size: clamp(2rem, 6dvw, 3.25rem);
        line-height: 1.1;
        letter-spacing: -0.05em;
    }

    .description {
        margin: 1rem 0 0;
        line-height: 1.7;
        opacity: 0.7;
    }

    .markdown-content {
        margin-top: 2.5rem;
    }
</style>
