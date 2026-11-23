<script lang="ts">
    import { archive } from "$lib/content/archive";
</script>

<section class="archive" aria-labelledby="archive-title">
    <h2 id="archive-title">Elsewhere &amp; before</h2>

    <div class="list">
        {#each archive as item}
            <article>
                <header>
                    <h3>{item.title}</h3>
                    <small>{item.period}</small>
                </header>

                {#if item.detail}
                    <p>{item.detail}</p>
                {/if}

                {#if item.items}
                    <ul>
                        {#each item.items as entry}
                            <li>{entry}</li>
                        {/each}
                    </ul>
                {/if}

                {#if item.links}
                    <ul class="links">
                        {#each item.links as link}
                            <li><a href={link.url}>{link.label} ↗</a></li>
                        {/each}
                    </ul>
                {/if}
            </article>
        {/each}
    </div>
</section>

<style>
    .archive {
        display: grid;
        gap: 1.5rem;
        margin-top: clamp(3rem, 8vh, 5rem);
    }

    h2 {
        margin: 0;
        font-size: clamp(1.75rem, 4vw, 2.5rem);
    }

    .list {
        display: grid;
        gap: 1rem;
    }

    article {
        padding: clamp(1.25rem, 4vw, 1.75rem);
    }

    header {
        display: flex;
        flex-wrap: wrap;
        align-items: baseline;
        justify-content: space-between;
        gap: 0.5rem;
    }

    h3 {
        margin: 0;
        font-size: 1.15rem;
    }

    small {
        color: var(--pico-muted-color);
    }

    p {
        margin: 0.75rem 0 0;
        line-height: 1.6;
        opacity: 0.8;
    }

    ul {
        margin: 0.75rem 0 0;
        padding-left: 1.25rem;
    }

    .links {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        padding: 0;
        list-style: none;
    }
</style>
