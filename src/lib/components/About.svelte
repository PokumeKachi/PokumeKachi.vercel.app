<script lang="ts">
    import { capabilities, languages, profile } from "$lib/content/about";
    import { site } from "$lib/content/site";
</script>

<section class="about" aria-labelledby="about-title">
    <div class="about-intro">
        <p class="eyebrow">01 — About</p>
        <h2 id="about-title">Small tools,<br />built carefully.</h2>
        <p class="lede">{site.tagline}</p>

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
    </div>

    <div class="chapters">
        <section class="chapter reveal">
            <p class="chapter-no">02 — Languages</p>
            <h3>What I write in</h3>
            <ul class="tags">
                {#each languages as tag}
                    <li><a href={tag.url}>{tag.label}</a></li>
                {/each}
            </ul>
        </section>

        {#each capabilities as group, i}
            <section class="chapter reveal">
                <p class="chapter-no">0{i + 3} — Toolkit</p>
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
        grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);
        gap: clamp(2rem, 6vw, 6rem);
        padding-block: clamp(4rem, 10vh, 8rem);
    }

    .about-intro {
        position: sticky;
        top: calc(var(--header-height, 0px) + 3rem);
        align-self: start;
    }

    h2 {
        margin: 0;
        font-size: clamp(2rem, 5vw, 3.5rem);
        line-height: 1.05;
        letter-spacing: -0.04em;
    }

    .lede {
        max-width: 36ch;
        margin: 1.25rem 0 2rem;
        line-height: 1.7;
        opacity: 0.7;
    }

    .facts {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 12rem), 1fr));
        gap: 0.75rem;
        margin: 0;
    }

    .facts div {
        padding: 1rem;
        border: 1px solid var(--pico-border-color);
        border-radius: var(--ui-radius);
        background: var(--pico-card-background-color);
    }

    dt {
        color: var(--pico-muted-color);
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.1em;
    }

    dd {
        margin: 0.5rem 0 0;
    }

    dd span {
        display: block;
    }

    .chapters {
        display: grid;
    }

    .chapter {
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-height: 60vh;
        padding-block: 2rem;
    }

    .chapter-no {
        margin: 0 0 0.75rem;
        color: var(--pico-primary);
        font-size: 0.75rem;
        font-weight: 700;
        letter-spacing: 0.16em;
        text-transform: uppercase;
    }

    h3 {
        margin: 0 0 1.25rem;
        font-size: clamp(1.5rem, 3vw, 2rem);
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

    @media (max-width: 48rem) {
        .about {
            grid-template-columns: 1fr;
        }

        .about-intro {
            position: static;
        }

        .chapter {
            min-height: auto;
        }
    }
</style>
