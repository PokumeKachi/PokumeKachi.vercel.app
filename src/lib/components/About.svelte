<script lang="ts">
    import { capabilities, languages, profile } from "$lib/content/about";
</script>

<section class="about" aria-labelledby="about-title">
    <h2 id="about-title">About</h2>

    <dl class="facts">
        {#each profile.facts as fact}
            <div class="reveal">
                <dt>{fact.label}</dt>
                <dd>
                    {#each Array.isArray(fact.value) ? fact.value : [fact.value] as line}
                        <span>{line}</span>
                    {/each}
                </dd>
            </div>
        {/each}
    </dl>

    <div class="groups">
        <section class="reveal">
            <h3>Languages</h3>
            <ul class="tags">
                {#each languages as tag}
                    <li><a href={tag.url}>{tag.label}</a></li>
                {/each}
            </ul>
        </section>

        {#each capabilities as group}
            <section class="reveal">
                <h3>{group.title}</h3>
                <ul class="tags">
                    {#each group.tags as tag}
                        <li><a href={tag.url}>{tag.label}</a></li>
                    {/each}
                </ul>
            </section>
        {/each}
    </div>
</section>

<style>
    .about {
        display: grid;
        gap: 2rem;
        padding-block: clamp(3rem, 8vh, 6rem);
    }

    h2 {
        margin: 0;
        font-size: clamp(1.75rem, 4vw, 2.5rem);
    }

    h3 {
        margin: 0 0 1rem;
        font-size: 1rem;
        color: var(--pico-muted-color);
        font-weight: 600;
        letter-spacing: 0.04em;
    }

    .facts {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 14rem), 1fr));
        gap: 1rem;
        margin: 0;
    }

    .facts div {
        padding: 1.25rem;
        border: 1px solid var(--pico-border-color);
        border-radius: var(--ui-radius);
        background: var(--pico-card-background-color);
    }

    dt {
        color: var(--pico-muted-color);
        font-size: 0.8rem;
        text-transform: uppercase;
        letter-spacing: 0.1em;
    }

    dd {
        margin: 0.5rem 0 0;
    }

    dd span {
        display: block;
    }

    .groups {
        display: grid;
        gap: 1.75rem;
    }

    .tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin: 0;
        padding: 0;
        list-style: none;
    }

    .tags a {
        display: inline-block;
        padding: 0.35rem 0.75rem;
        border: 1px solid var(--pico-border-color);
        border-radius: 999px;
        color: var(--pico-color);
        font-size: 0.85rem;
        text-decoration: none;
        transition:
            border-color var(--ui-fast) ease,
            color var(--ui-fast) ease;
    }

    @media (hover: hover) {
        .tags a:hover {
            border-color: var(--pico-primary);
            color: var(--pico-primary);
        }
    }
</style>
