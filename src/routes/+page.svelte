<script lang="ts">
    import { onMount } from "$lib";

    let scene: HTMLElement;
    let hero: HTMLElement;

    onMount(() => {
        if (
            !matchMedia("(hover: hover) and (pointer: fine)").matches ||
            matchMedia("(prefers-reduced-motion: reduce)").matches
        )
            return;

        scene.addEventListener("pointermove", tilt);
        scene.addEventListener("pointerleave", level);

        return () => {
            scene.removeEventListener("pointermove", tilt);
            scene.removeEventListener("pointerleave", level);
        };
    });

    function tilt(event: PointerEvent) {
        if (!hero) return;

        const box = hero.getBoundingClientRect();
        const x = (event.clientX - box.left) / box.width - 0.5;
        const y = (event.clientY - box.top) / box.height - 0.5;

        hero.style.setProperty("--rx", `${(-y * 9).toFixed(2)}deg`);
        hero.style.setProperty("--ry", `${(x * 9).toFixed(2)}deg`);
    }

    function level() {
        if (!hero) return;
        hero.style.setProperty("--rx", "0deg");
        hero.style.setProperty("--ry", "0deg");
    }
</script>

<main class="container">
    <div class="scene" bind:this={scene}>
        <div class="orb orb-a" aria-hidden="true"></div>
        <div class="orb orb-b" aria-hidden="true"></div>
        <div class="ring" aria-hidden="true"></div>

        <section class="hero" bind:this={hero}>
            <p class="eyebrow">Student · Developer · Vietnam</p>
            <h1 data-text="Pokume Kachi">Pokume <span>Kachi</span></h1>
            <p class="lede">
                I build clean, fast interfaces and small tools that make the web
                a little more useful.
            </p>

            <nav class="actions" aria-label="Explore">
                <a class="primary" href="/projects">Projects</a>
                <a href="/blog">Writing</a>
                <a href="/contact">Contact</a>
            </nav>
        </section>
    </div>
</main>

<style>
    .container {
        position: relative;
    }

    .scene {
        position: relative;
        min-height: calc(100dvh - var(--header-height, 0px));

        perspective: 1100px;
        perspective-origin: 50% 35%;
        transform-style: preserve-3d;
    }

    .hero {
        position: relative;
        z-index: 1;
        padding-block: clamp(5rem, 16vh, 10rem);

        transform-style: preserve-3d;
        transform: rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
        transition: transform 320ms var(--ui-ease);
    }

    .orb {
        position: absolute;
        width: 16rem;
        aspect-ratio: 1;
        border-radius: 50%;
        background: radial-gradient(
            circle closest-side,
            color-mix(in oklab, var(--pico-primary) 22%, transparent),
            transparent
        );
        pointer-events: none;
        animation: drift 16s ease-in-out infinite;
    }

    .orb-a {
        top: 4%;
        right: 6%;
    }

    .orb-b {
        bottom: 12%;
        left: 2%;
        width: 11rem;
        animation-delay: -7s;
        animation-duration: 20s;
    }

    .ring {
        position: absolute;
        top: 16%;
        right: 12%;
        width: 18rem;
        aspect-ratio: 1;

        border: 1px solid color-mix(in oklab, var(--pico-primary) 26%, transparent);
        border-radius: 50%;

        transform: rotateX(68deg);
        animation: orbit 22s linear infinite;
        pointer-events: none;
    }

    @keyframes drift {
        0%,
        100% {
            transform: translate3d(0, 0, 0) scale(1);
        }
        50% {
            transform: translate3d(0, -1.5rem, 40px) scale(1.08);
        }
    }

    @keyframes orbit {
        to {
            transform: rotateX(68deg) rotateZ(360deg);
        }
    }

    .eyebrow {
        --z: 20px;
        margin: 0 0 1.25rem;
        font-size: 0.78rem;
        font-weight: 600;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        opacity: 0.55;
    }

    h1 {
        --z: 60px;
        position: relative;
        margin: 0;
        font-size: clamp(3rem, 10vw, 7rem);
        font-weight: 900;
        line-height: 0.95;
        letter-spacing: -0.06em;
    }

    /* Extruded ghost layers give the heading real depth. */
    h1::before,
    h1::after {
        content: attr(data-text);
        position: absolute;
        inset: 0;
        z-index: -1;
        color: var(--pico-primary);
        pointer-events: none;
    }

    h1::before {
        transform: translateZ(-26px);
        opacity: 0.14;
    }

    h1::after {
        transform: translateZ(-52px);
        opacity: 0.07;
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
        --z: 35px;
        max-width: 44ch;
        margin: 1.5rem 0 2.5rem;
        font-size: clamp(1rem, 2vw, 1.2rem);
        line-height: 1.7;
        opacity: 0.72;
    }

    .actions {
        --z: 45px;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        gap: 0.75rem;
        transform-style: preserve-3d;
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
            box-shadow var(--ui-fast) ease,
            border-color var(--ui-fast) ease;
    }

    .actions a.primary {
        border-color: var(--pico-primary);
        background: var(--pico-primary);
        color: var(--pico-primary-inverse);
    }

    @media (hover: hover) {
        .actions a:hover {
            transform: translate3d(0, -3px, 26px);
            border-color: var(--pico-primary);
            box-shadow: 0 14px 30px -12px
                color-mix(in oklab, var(--pico-primary) 55%, transparent);
        }
    }

    @keyframes rise {
        from {
            opacity: 0;
            transform: translate3d(0, 1.2rem, calc(var(--z, 0px) - 40px));
        }
        to {
            opacity: 1;
            transform: translate3d(0, 0, var(--z, 0px));
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
