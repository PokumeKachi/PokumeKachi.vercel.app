<script lang="ts">
    import { capabilities, languages, profile } from "$lib/content/about";
    import { site } from "$lib/content/site";
</script>

<section class="about" aria-labelledby="about-title">
    <div class="about-intro">
        <span class="rail" aria-hidden="true"></span>
        <p class="eyebrow">01 — About</p>
        <h2 id="about-title">Small tools,<br />built carefully.</h2>
        <p class="lede">{site.tagline}</p>

        <dl class="facts">
            {#each profile.facts as fact}
                <div>
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
            <span class="rail" aria-hidden="true"></span>
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
                <span class="rail" aria-hidden="true"></span>
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

    /* A thin rule draws itself with scroll in every section, so even the
       pinned column has something that keeps moving as you read it. */
    .chapter {
        position: relative;
    }

    .rail {
        position: absolute;
        inset-block: 0;
        left: 0;
        width: 2px;
        border-radius: 999px;
        background: linear-gradient(
            to bottom,
            var(--pico-primary),
            color-mix(in oklab, var(--pico-primary) 12%, transparent)
        );
        transform: scaleY(0);
        transform-origin: top;
    }

    /* 01 — the column pins while it is read, so a view() timeline on the
       sticky box itself keeps tracking layout position past the pin and can
       leave a reveal frozen (or visibly lingering) mid-flight. Naming the
       timeline on the non-sticky section instead gives every reveal inside a
       stable range that resolves on the way in, before the column pins. */
    @supports (animation-timeline: view()) {
        .about {
            view-timeline-name: --about;
            view-timeline-axis: block;
        }

        .about-intro .eyebrow,
        .about-intro h2,
        .about-intro .facts > div {
            animation: reveal linear both;
            animation-timeline: --about;
            animation-range: entry 0% entry 100%;
        }

        /* Small offsets cascade the heading and fact cards; each still
           closes on the same fully-inside point, so nothing is left in
           flight under the pin. */
        .about-intro h2 {
            animation-range: entry 5% entry 100%;
        }

        .about-intro .facts > div:nth-child(2) {
            animation-range: entry 6% entry 100%;
        }

        .about-intro .facts > div:nth-child(3) {
            animation-range: entry 12% entry 100%;
        }

        .about-intro .facts > div:nth-child(4) {
            animation-range: entry 18% entry 100%;
        }

        /* The lede rests at 0.7, so it closes on its own keyframes instead
           of `reveal`, which would leave it fully opaque. */
        .about-intro .lede {
            animation: reveal-lede linear both;
            animation-timeline: --about;
            animation-range: entry 0% entry 100%;
        }

        /* Unpin gracefully: lift and dim across the section's exit range
           instead of snapping out of sticky mode with leftover motion. */
        .about-intro {
            animation: intro-leave linear both;
            animation-timeline: --about;
            animation-range: exit 0% exit 100%;
        }

        .about-intro > .rail {
            animation: rail-grow linear both;
            animation-timeline: --about;
            animation-range: entry 0% exit 100%;
        }

        @keyframes reveal-lede {
            from {
                opacity: 0;
                transform: perspective(900px) translateY(5rem) translateX(-2rem)
                    rotateX(18deg) rotateZ(-4deg) scale(0.88);
                filter: blur(6px);
            }
            60% {
                opacity: 0.7;
            }
            to {
                opacity: 0.7;
                transform: none;
                filter: none;
            }
        }

        @keyframes intro-leave {
            from {
                opacity: 1;
                transform: none;
            }
            to {
                opacity: 0;
                transform: translate3d(0, -2rem, 0);
            }
        }

        @keyframes rail-grow {
            from {
                transform: scaleY(0);
                opacity: 0.35;
            }
            to {
                transform: scaleY(1);
                opacity: 1;
            }
        }
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

    @supports (animation-timeline: view()) {
        /* 02–05 — the chapter block flies in through .reveal and its rule
           draws for the whole time it is on screen; every part inside then
           gets its own scroll-driven motion, with the tag pills cascading a
           beat apart from one another. */
        .chapter > .rail {
            animation: rail-grow linear both;
            animation-timeline: view();
            animation-range: entry 0% exit 100%;
        }

        .chapter-no {
            animation: chapter-mark linear both;
            animation-timeline: view();
            animation-range: entry 10% cover 40%;
        }

        @keyframes chapter-mark {
            from {
                opacity: 0;
                transform: translate3d(-3rem, 1rem, 0) rotate(-12deg) scale(0.6);
            }
            to {
                opacity: 1;
                transform: none;
            }
        }

        h3 {
            animation: chapter-title linear both;
            animation-timeline: view();
            animation-range: entry 0% cover 30%;
        }

        .tags {
            animation: tags-drift linear both;
            animation-timeline: view();
            animation-range: entry 0% cover 40%;
        }

        .tags li {
            animation: tag-in linear both;
            animation-timeline: view();
            animation-range: entry 0% cover 30%;
        }

        .tags li:nth-child(3n + 2) {
            animation-range: entry 0% cover 38%;
        }

        .tags li:nth-child(3n) {
            animation-range: entry 0% cover 46%;
        }

        @keyframes chapter-title {
            from {
                opacity: 0;
                transform: translateY(2.5rem);
                filter: blur(4px);
            }
            to {
                opacity: 1;
                transform: none;
                filter: none;
            }
        }

        @keyframes tags-drift {
            from {
                transform: translate3d(1.5rem, 0, 0);
            }
            to {
                transform: none;
            }
        }

        @keyframes tag-in {
            from {
                opacity: 0;
                transform: translateY(1.25rem) rotate(-6deg) scale(0.82);
            }
            to {
                opacity: 1;
                transform: none;
            }
        }
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

    /* The pinned column has to fit the viewport: pin it a little tighter on
       short screens, and stop pinning where it cannot fit at all — otherwise
       its tail falls below the fold and its reveals never finish. */
    @media (max-height: 52rem) {
        .about-intro {
            top: calc(var(--header-height, 0px) + 1rem);
        }
    }

    @media (max-height: 48rem), (max-width: 55rem) {
        .about-intro {
            position: static;
        }
    }

    @media (max-width: 48rem) {
        .about {
            grid-template-columns: 1fr;
        }

        .chapter {
            min-height: auto;
        }
    }
</style>
