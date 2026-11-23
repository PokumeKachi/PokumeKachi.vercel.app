<script lang="ts">
    import { onMount } from "$lib";

    import { hero } from "$lib/content/home";
    import { TILT_MAX, TILT_SENSITIVITY } from "$lib/design-language/hero";

    let content: HTMLElement;
    let title: HTMLElement;

    onMount(() => {
        if (
            !matchMedia("(hover: hover) and (pointer: fine)").matches ||
            matchMedia("(prefers-reduced-motion: reduce)").matches
        )
            return;

        window.addEventListener("pointermove", tilt);
        window.addEventListener("pointerleave", level);

        return () => {
            window.removeEventListener("pointermove", tilt);
            window.removeEventListener("pointerleave", level);
        };
    });

    function tilt(event: PointerEvent) {
        if (!content || !title) return;

        const box = title.getBoundingClientRect();
        const x = event.clientX - box.left - box.width / 2;
        const y = event.clientY - box.top - box.height / 2;
        const clamp = (value: number) =>
            Math.max(-TILT_MAX, Math.min(TILT_MAX, value));

        content.style.setProperty("--rx", `${clamp(-y * TILT_SENSITIVITY).toFixed(2)}deg`);
        content.style.setProperty("--ry", `${clamp(x * TILT_SENSITIVITY).toFixed(2)}deg`);
    }

    function level() {
        if (!content) return;
        content.style.setProperty("--rx", "0deg");
        content.style.setProperty("--ry", "0deg");
    }
</script>

<section class="hero">
    <div class="content" bind:this={content}>
        <p class="eyebrow">{hero.eyebrow}</p>
        <h1 bind:this={title}>{hero.lead} <span>{hero.accent}</span></h1>
        <p class="lede">{hero.description}</p>

        <nav class="actions" aria-label="Explore">
            {#each hero.actions as action}
                <a
                    class:primary={action.primary}
                    class="fx-tilt"
                    href={action.href}>{action.label}</a
                >
            {/each}
        </nav>
    </div>
</section>

<style>
    .hero {
        position: relative;
        min-height: calc(100dvh - var(--header-height, 0px));

        perspective: 1100px;
        perspective-origin: 50% 35%;
    }

    .content {
        position: relative;
        z-index: 1;
        padding-block: clamp(5rem, 16vh, 10rem);

        transform-style: preserve-3d;
        transform: translateY(calc(var(--parallax, 0) * -3rem))
            rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
        transition: transform 320ms var(--ui-ease);
    }

    @supports (animation-timeline: scroll()) {
        .content {
            animation: hero-parallax linear both;
            animation-timeline: scroll(root block);
            animation-range: 0 45vh;
        }
    }

    @keyframes hero-parallax {
        to {
            --parallax: 1;
            opacity: 0.4;
        }
    }

    .eyebrow {
        --z: 20px;
        margin-bottom: 1.25rem;
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
    }

    .actions a.primary {
        border-color: var(--pico-primary);
        background: var(--pico-primary);
        color: var(--pico-primary-inverse);
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

    .content > * {
        animation: rise var(--ui-entrance, 700ms) var(--ui-ease) both;
    }

    .content > :nth-child(2) {
        animation-delay: 80ms;
    }

    .content > :nth-child(3) {
        animation-delay: 160ms;
    }

    .content > :nth-child(4) {
        animation-delay: 240ms;
    }
</style>
