<main class="container">
    <section class="hero">
        <p class="eyebrow">Student · Developer · Vietnam</p>
        <h1>Pokume <span>Kachi</span></h1>
        <p class="lede">
            I build clean, fast interfaces and small tools that make the web a
            little more useful.
        </p>

        <nav class="actions" aria-label="Explore">
            <a class="primary" href="/projects">Projects</a>
            <a href="/blog">Writing</a>
            <a href="/contact">Contact</a>
        </nav>
    </section>
</main>

<style>
    .hero {
        padding-block: clamp(4rem, 14vh, 9rem);
    }

    .eyebrow {
        margin: 0 0 1.25rem;
        font-size: 0.78rem;
        font-weight: 600;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        opacity: 0.55;
    }

    h1 {
        margin: 0;
        font-size: clamp(3rem, 10vw, 7rem);
        font-weight: 900;
        line-height: 0.95;
        letter-spacing: -0.06em;
    }

    h1 span {
        background: linear-gradient(
            120deg,
            var(--pico-primary),
            color-mix(in oklab, var(--pico-primary) 40%, white)
        );
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
    }

    .lede {
        max-width: 44ch;
        margin: 1.5rem 0 2.5rem;
        font-size: clamp(1rem, 2vw, 1.2rem);
        line-height: 1.7;
        opacity: 0.72;
    }

    .actions {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        gap: 0.75rem;
    }

    .actions a {
        display: inline-flex;
        align-items: center;
        padding: 0.6rem 1.1rem;
        border: 1px solid var(--pico-border-color);
        border-radius: 999px;
        background: var(--pico-card-background-color);
        font-weight: 600;
        text-decoration: none;
        transition:
            transform var(--ui-fast) var(--ui-ease),
            border-color var(--ui-fast) ease,
            background-color var(--ui-fast) ease;
    }

    .actions a.primary {
        border-color: var(--pico-primary);
        background: var(--pico-primary);
        color: var(--pico-primary-inverse);
    }

    @media (hover: hover) {
        .actions a:hover {
            transform: translateY(-2px);
            border-color: var(--pico-primary);
        }
    }

    @keyframes rise {
        from {
            opacity: 0;
            transform: translateY(1rem);
        }
    }

    .hero > * {
        animation: rise 700ms var(--ui-ease) both;
    }

    .hero > :nth-child(2) {
        animation-delay: 80ms;
    }

    .hero > :nth-child(3) {
        animation-delay: 160ms;
    }

    .hero > :nth-child(4) {
        animation-delay: 240ms;
    }
</style>
