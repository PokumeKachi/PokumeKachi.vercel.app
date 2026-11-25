<script lang="ts">
    import { capabilities, languages, profile } from "$lib/content/about";
    import { site } from "$lib/content/site";

    const languageWords = ["What", "I", "write", "in"];
    const words = (title: string) => title.split(" ");
</script>

<section class="about" aria-labelledby="about-title">
    <div class="about-intro">
        <span class="ghost" aria-hidden="true">01</span>
        <div class="depth">
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
    </div>

    <div class="chapters">
        <section class="chapter chapter-left">
            <span class="ghost" aria-hidden="true">02</span>
            <p class="chapter-no">02 — Languages</p>
            <h3 class="title">
                {#each languageWords as word, w}
                    <span>{word}</span>{#if w < languageWords.length - 1}{" "}{/if}
                {/each}
            </h3>
            <ul class="tags">
                {#each languages as tag}
                    <li><a href={tag.url}>{tag.label}</a></li>
                {/each}
            </ul>
        </section>

        {#each capabilities as group, i}
            <section
                class="chapter"
                class:chapter-right={i === 0}
                class:chapter-dissolve={i === 1}
                class:chapter-morph={i === 2}
            >
                <span class="ghost" aria-hidden="true">0{i + 3}</span>
                <p class="chapter-no">0{i + 3} — Toolkit</p>
                <h3 class="title">
                    {#each words(group.title) as word, w}
                        <span>{word}</span>{#if w < words(group.title).length - 1}{" "}{/if}
                    {/each}
                </h3>
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

    .chapter {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-height: 60vh;
        padding-block: 2rem;
    }

    /* Big ghost numerals replace hard rules: they sit behind the content and
       parallax with scroll, so each section has its own quiet backdrop. */
    .depth,
    .chapter > :not(.ghost) {
        position: relative;
        z-index: 1;
    }

    .ghost {
        position: absolute;
        top: -0.2em;
        right: 0;
        z-index: 0;
        font-size: clamp(5rem, 13vw, 9rem);
        font-weight: 900;
        line-height: 0.9;
        letter-spacing: -0.09em;
        color: color-mix(in oklab, var(--pico-primary) 4%, transparent);
        pointer-events: none;
        user-select: none;
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

    .chapter-no {
        margin: 0 0 0.75rem;
        color: var(--pico-primary);
        font-size: 0.75rem;
        font-weight: 700;
        letter-spacing: 0.16em;
        text-transform: uppercase;
    }

    .title {
        margin: 0 0 1.25rem;
        font-size: clamp(1.5rem, 3vw, 2rem);
    }

    .title span {
        display: inline-block;
    }

    .tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin: 0;
        padding: 0;
        list-style: none;
    }

    /* The global stylesheet sets square markers and a bottom margin on every
       li; reset both here so the pills sit flush without stray bullets. */
    .tags li {
        display: block;
        margin: 0;
        padding: 0;
        list-style: none;
        list-style-type: none;
    }

    .tags li::marker {
        content: "";
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

    @supports (animation-timeline: view()) {
        /* ------------------------------------------------------------------
           01 — About: the whole column flies out of Z. The timeline is named
           on the non-sticky grid, so reveals resolve before the pin and can
           never freeze mid-flight or leave residue while it is stuck.
           ------------------------------------------------------------------ */
        .about {
            view-timeline-name: --about;
            view-timeline-axis: block;
        }

        .depth {
            animation: depth-in linear both;
            animation-timeline: --about;
            animation-range: entry 0% entry 100%;
        }

        .depth > .eyebrow,
        .depth > h2,
        .depth > .lede,
        .depth > .facts > div {
            animation: depth-child linear both;
            animation-timeline: --about;
            animation-range: entry 0% entry 100%;
        }

        .depth > h2 {
            animation-range: entry 6% entry 100%;
        }

        .depth > .lede {
            animation-name: depth-lede;
            animation-range: entry 12% entry 100%;
        }

        .depth > .facts > div:nth-child(2) {
            animation-range: entry 18% entry 100%;
        }

        .depth > .facts > div:nth-child(3) {
            animation-range: entry 24% entry 100%;
        }

        .depth > .facts > div:nth-child(4) {
            animation-range: entry 30% entry 100%;
        }

        @keyframes depth-in {
            from {
                opacity: 0;
                transform: perspective(1100px) translateZ(-440px) rotateX(16deg)
                    scale(0.74);
                filter: blur(14px);
            }
            55% {
                opacity: 1;
                filter: none;
            }
            to {
                opacity: 1;
                transform: perspective(1100px) translateZ(0) rotateX(0deg) scale(1);
                filter: none;
            }
        }

        @keyframes depth-child {
            from {
                opacity: 0;
                transform: translateY(1.75rem);
            }
            to {
                opacity: 1;
                transform: none;
            }
        }

        @keyframes depth-lede {
            from {
                opacity: 0;
                transform: translateY(1.75rem);
            }
            to {
                opacity: 0.7;
                transform: none;
            }
        }

        /* Unpin gracefully instead of snapping out of sticky mode. */
        .about-intro {
            animation: intro-leave linear both;
            animation-timeline: --about;
            animation-range: exit 0% exit 100%;
        }

        @keyframes intro-leave {
            from {
                opacity: 1;
                transform: none;
            }
            to {
                opacity: 0;
                transform: translate3d(0, -2rem, 0) scale(0.96);
            }
        }

        .about-intro > .ghost {
            animation: ghost-depth linear both;
            animation-timeline: --about;
            animation-range: entry 0% exit 100%;
        }

        @keyframes ghost-depth {
            from {
                opacity: 0;
                transform: translate3d(0, 5rem, 0) scale(0.8);
            }
            to {
                opacity: 1;
                transform: translate3d(0, -5rem, 0) scale(1.1);
            }
        }

        /* ------------------------------------------------------------------
           02 — Languages: everything enters from the left, skewed and turned.
           ------------------------------------------------------------------ */
        .chapter-left {
            animation: section-left linear both;
            animation-timeline: view();
            animation-range: entry 0% cover 40%;
        }

        @keyframes section-left {
            from {
                opacity: 0;
                transform: translate3d(-7rem, 2rem, -160px) rotateY(20deg)
                    skewX(-8deg);
                filter: blur(10px);
            }
            to {
                opacity: 1;
                transform: none;
                filter: none;
            }
        }

        .chapter-left .chapter-no {
            animation: mark-left linear both;
            animation-timeline: view();
            animation-range: entry 4% cover 36%;
        }

        @keyframes mark-left {
            from {
                opacity: 0;
                transform: translate3d(-2.5rem, 0, 0) rotate(-14deg);
            }
            to {
                opacity: 1;
                transform: none;
            }
        }

        .chapter-left .title span {
            animation: word-left linear both;
            animation-timeline: view();
            animation-range: entry 0% cover 32%;
        }

        .chapter-left .title span:nth-child(2) {
            animation-range: entry 4% cover 36%;
        }

        .chapter-left .title span:nth-child(3) {
            animation-range: entry 8% cover 40%;
        }

        .chapter-left .title span:nth-child(4) {
            animation-range: entry 12% cover 44%;
        }

        @keyframes word-left {
            from {
                opacity: 0;
                transform: translate3d(-2rem, 0, 0) rotateY(35deg);
                filter: blur(4px);
            }
            to {
                opacity: 1;
                transform: none;
                filter: none;
            }
        }

        .chapter-left .tags li {
            animation: pill-left linear both;
            animation-timeline: view();
            animation-range: entry 0% cover 34%;
        }

        .chapter-left .tags li:nth-child(2n) {
            animation-range: entry 4% cover 40%;
        }

        .chapter-left .tags li:nth-child(3n) {
            animation-range: entry 8% cover 46%;
        }

        @keyframes pill-left {
            from {
                opacity: 0;
                transform: translate3d(-2.5rem, 0, 0) rotate(-8deg) scale(0.8);
            }
            to {
                opacity: 1;
                transform: none;
            }
        }

        /* ------------------------------------------------------------------
           03 — Full-stack: the mirror gesture, entering from the right.
           ------------------------------------------------------------------ */
        .chapter-right {
            animation: section-right linear both;
            animation-timeline: view();
            animation-range: entry 0% cover 40%;
        }

        @keyframes section-right {
            from {
                opacity: 0;
                transform: translate3d(7rem, 2rem, -160px) rotateY(-20deg)
                    skewX(8deg);
                filter: blur(10px);
            }
            to {
                opacity: 1;
                transform: none;
                filter: none;
            }
        }

        .chapter-right .chapter-no {
            animation: mark-right linear both;
            animation-timeline: view();
            animation-range: entry 4% cover 36%;
        }

        @keyframes mark-right {
            from {
                opacity: 0;
                transform: translate3d(2.5rem, 0, 0) rotate(14deg);
            }
            to {
                opacity: 1;
                transform: none;
            }
        }

        .chapter-right .title span {
            animation: word-right linear both;
            animation-timeline: view();
            animation-range: entry 0% cover 32%;
        }

        .chapter-right .title span:nth-child(2) {
            animation-range: entry 4% cover 36%;
        }

        .chapter-right .title span:nth-child(3) {
            animation-range: entry 8% cover 40%;
        }

        .chapter-right .title span:nth-child(4) {
            animation-range: entry 12% cover 44%;
        }

        .chapter-right .title span:nth-child(5) {
            animation-range: entry 16% cover 48%;
        }

        @keyframes word-right {
            from {
                opacity: 0;
                transform: translate3d(2rem, 0, 0) rotateY(-35deg);
                filter: blur(4px);
            }
            to {
                opacity: 1;
                transform: none;
                filter: none;
            }
        }

        .chapter-right .tags li {
            animation: pill-right linear both;
            animation-timeline: view();
            animation-range: entry 0% cover 34%;
        }

        .chapter-right .tags li:nth-child(2n) {
            animation-range: entry 4% cover 40%;
        }

        .chapter-right .tags li:nth-child(3n) {
            animation-range: entry 8% cover 46%;
        }

        @keyframes pill-right {
            from {
                opacity: 0;
                transform: translate3d(2.5rem, 0, 0) rotate(8deg) scale(0.8);
            }
            to {
                opacity: 1;
                transform: none;
            }
        }

        /* ------------------------------------------------------------------
           04 — Native: the block disintegrates in from above. Every word and
           pill drifts down out of a blur with its own scatter and spin.
           ------------------------------------------------------------------ */
        .chapter-dissolve {
            animation: section-dissolve linear both;
            animation-timeline: view();
            animation-range: entry 0% cover 45%;
        }

        @keyframes section-dissolve {
            from {
                opacity: 0;
                transform: translate3d(0, -5rem, 0) scale(1.07);
                filter: blur(16px);
                clip-path: inset(0 0 100% 0);
            }
            70% {
                clip-path: inset(0 0 0 0);
                opacity: 1;
            }
            to {
                opacity: 1;
                transform: none;
                filter: none;
                clip-path: inset(0 0 0 0);
            }
        }

        .chapter-dissolve .chapter-no {
            animation: mark-dissolve linear both;
            animation-timeline: view();
            animation-range: entry 4% cover 40%;
        }

        @keyframes mark-dissolve {
            from {
                opacity: 0;
                transform: translate3d(0, -2rem, 0) rotateX(70deg);
                filter: blur(6px);
            }
            to {
                opacity: 1;
                transform: none;
                filter: none;
            }
        }

        .chapter-dissolve .title span,
        .chapter-dissolve .tags li {
            animation: dust-in linear both;
            animation-timeline: view();
            animation-range: entry 0% cover 42%;
        }

        .chapter-dissolve .title span:nth-child(2),
        .chapter-dissolve .tags li:nth-child(3n) {
            --scatter: 18px;
            --spin: 9deg;
            animation-range: entry 6% cover 48%;
        }

        .chapter-dissolve .title span:nth-child(3),
        .chapter-dissolve .tags li:nth-child(3n + 1) {
            --scatter: -14px;
            --spin: -8deg;
            animation-range: entry 3% cover 45%;
        }

        @keyframes dust-in {
            from {
                opacity: 0;
                transform: translate3d(var(--scatter, 0px), -3rem, 0)
                    rotate(var(--spin, -10deg)) scale(0.85);
                filter: blur(7px);
            }
            to {
                opacity: 1;
                transform: none;
                filter: none;
            }
        }

        /* ------------------------------------------------------------------
           05 — Sysadmin: everything morphs into shape, from soft blobs and
           squeezed glyphs to the crisp final geometry.
           ------------------------------------------------------------------ */
        .chapter-morph {
            animation: section-morph linear both;
            animation-timeline: view();
            animation-range: entry 0% cover 45%;
        }

        @keyframes section-morph {
            from {
                opacity: 0;
                transform: scale(0.72) rotate(-7deg);
                filter: blur(12px) saturate(1.7);
                border-radius: 48% 52% 45% 55% / 54% 42% 58% 46%;
                clip-path: polygon(
                    22% 0,
                    78% 0,
                    100% 24%,
                    100% 76%,
                    78% 100%,
                    22% 100%,
                    0 76%,
                    0 24%
                );
            }
            60% {
                opacity: 1;
                clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
            }
            to {
                opacity: 1;
                transform: none;
                filter: none;
                border-radius: 0;
                clip-path: inset(0);
            }
        }

        .chapter-morph .chapter-no {
            animation: mark-morph linear both;
            animation-timeline: view();
            animation-range: entry 4% cover 40%;
        }

        @keyframes mark-morph {
            from {
                opacity: 0;
                transform: scale(0.4) rotate(-24deg);
                filter: blur(6px);
            }
            to {
                opacity: 1;
                transform: none;
                filter: none;
            }
        }

        .chapter-morph .title span {
            animation: word-morph linear both;
            animation-timeline: view();
            animation-range: entry 0% cover 38%;
        }

        .chapter-morph .title span:nth-child(2) {
            animation-range: entry 4% cover 42%;
        }

        .chapter-morph .title span:nth-child(3) {
            animation-range: entry 8% cover 46%;
        }

        .chapter-morph .title span:nth-child(4) {
            animation-range: entry 12% cover 50%;
        }

        @keyframes word-morph {
            from {
                opacity: 0;
                transform: scaleX(0.3) scaleY(1.4) rotate(-6deg);
                filter: blur(8px);
                letter-spacing: -0.12em;
            }
            60% {
                opacity: 1;
                transform: scaleX(1.1) scaleY(0.94) rotate(2deg);
                filter: none;
            }
            to {
                opacity: 1;
                transform: none;
                filter: none;
                letter-spacing: normal;
            }
        }

        .chapter-morph .tags a {
            animation: pill-morph linear both;
            animation-timeline: view();
            animation-range: entry 0% cover 40%;
        }

        .chapter-morph .tags li:nth-child(2n) a {
            animation-range: entry 4% cover 44%;
        }

        .chapter-morph .tags li:nth-child(3n) a {
            animation-range: entry 8% cover 48%;
        }

        @keyframes pill-morph {
            from {
                opacity: 0;
                transform: scale(0.2) rotate(-45deg);
                border-radius: 50%;
                filter: blur(5px);
            }
            70% {
                transform: scale(1.12) rotate(4deg);
                border-radius: 999px;
            }
            to {
                opacity: 1;
                transform: none;
                border-radius: 999px;
                filter: none;
            }
        }

        /* Ghost numerals drift differently in each section. */
        .chapter > .ghost {
            animation: ghost-parallax linear both;
            animation-timeline: view();
            animation-range: cover 0% cover 100%;
        }

        @keyframes ghost-parallax {
            from {
                transform: translate3d(0, 4rem, 0);
            }
            to {
                transform: translate3d(0, -4rem, 0);
            }
        }

        .chapter-left > .ghost {
            animation-name: ghost-left;
        }

        @keyframes ghost-left {
            from {
                transform: translate3d(-5rem, 0, 0);
            }
            to {
                transform: translate3d(5rem, 0, 0);
            }
        }

        .chapter-right > .ghost {
            animation-name: ghost-right;
        }

        @keyframes ghost-right {
            from {
                transform: translate3d(5rem, 0, 0);
            }
            to {
                transform: translate3d(-5rem, 0, 0);
            }
        }

        .chapter-dissolve > .ghost {
            animation-name: ghost-dissolve;
        }

        @keyframes ghost-dissolve {
            from {
                opacity: 0;
                transform: translate3d(0, -4rem, 0) scale(1.2);
                filter: blur(10px);
            }
            to {
                opacity: 1;
                transform: translate3d(0, 4rem, 0) scale(0.9);
                filter: none;
            }
        }

        .chapter-morph > .ghost {
            animation-name: ghost-morph;
        }

        @keyframes ghost-morph {
            from {
                transform: rotate(-18deg) scale(0.7);
            }
            to {
                transform: rotate(18deg) scale(1.15);
            }
        }
    }

    /* The pinned column has to fit the viewport: pin it a little tighter on
       short screens, and stop pinning where it cannot fit at all. */
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
            padding-block: 3rem;
        }

        .ghost {
            font-size: clamp(5rem, 24vw, 9rem);
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .depth,
        .depth > *,
        .about-intro,
        .about-intro > .ghost,
        .chapter,
        .chapter > :not(.ghost),
        .title span,
        .tags li,
        .tags a {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
            filter: none !important;
            clip-path: none !important;
        }

        .depth > .lede {
            opacity: 0.7 !important;
        }

        .ghost {
            opacity: 0.5 !important;
        }
    }
</style>
