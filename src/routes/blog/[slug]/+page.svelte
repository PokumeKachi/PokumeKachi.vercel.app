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
    <title>{data.post.title} — Pokume Kachi</title>
    {#if data.post.description}
        <meta name="description" content={data.post.description} />
    {/if}
</svelte:head>

<article>
    <header>
        <hgroup>
            <h1>{data.post.title}</h1>
            <p>
                {#if data.post.date}
                    <small>
                        <time datetime={data.post.date}>
                            {formatDate(data.post.date)}
                        </time>
                    </small>
                {/if}
                {#if data.post.description}
                    {data.post.date ? "—" : ""}
                    {data.post.description}
                {/if}
            </p>
        </hgroup>
    </header>

    {@html data.post.html}

    <footer><a href="/blog">← All posts</a></footer>
</article>
