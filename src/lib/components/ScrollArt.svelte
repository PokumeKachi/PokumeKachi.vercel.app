<div class="scroll-art" aria-hidden="true">
    <span class="art art-a"></span>
    <span class="art art-b"></span>
    <span class="art art-c"></span>
</div>

<style>
    .scroll-art {
        position: absolute;
        inset: 0;
        z-index: 0;
        overflow: hidden;
        pointer-events: none;
        perspective: 800px;
    }

    .art {
        position: absolute;
        width: 24rem;
        aspect-ratio: 1;
        border-radius: 38% 62% 47% 53% / 55% 42% 58% 45%;
        background: radial-gradient(
            circle at 35% 30%,
            color-mix(in oklab, var(--pico-primary) 20%, transparent),
            transparent 70%
        );
        opacity: 0.4;
    }

    .art-a {
        top: 6%;
        left: -12%;
    }

    .art-b {
        top: 42%;
        right: -14%;
        width: 30rem;
    }

    .art-c {
        bottom: 2%;
        left: 18%;
        width: 18rem;
    }

    /* Native scroll-driven animation: no scroll listener, no JS. Browsers
       without support simply show the shapes in their resting positions. */
    @supports (animation-timeline: scroll()) {
        .art {
            animation: drift linear both;
            animation-timeline: scroll(root block);
            animation-duration: auto;
        }
    }

    @keyframes drift {
        from {
            transform: translate3d(0, 20rem, -260px) rotateX(-35deg)
                rotate(0deg) scale(0.8);
        }
        to {
            transform: translate3d(0, -20rem, 120px) rotateX(35deg)
                rotate(200deg) scale(1.2);
        }
    }
</style>
