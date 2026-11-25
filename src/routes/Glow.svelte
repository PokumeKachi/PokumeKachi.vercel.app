<script lang="ts">
    import { onMount } from "svelte";

    onMount(() => {
        const articles = new Set<HTMLElement>();

        let pointerX = 0;
        let pointerY = 0;
        let animationFrame = 0;

        const applyGlow = () => {
            document
                .querySelectorAll<HTMLElement>("article")
                .forEach((element) => {
                    if (articles.has(element)) return;

                    articles.add(element);
                    element.classList.add("glow");
                });
        };

        const observer = new MutationObserver(applyGlow);

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });

        applyGlow();

        function update() {
            let moving = false;

            articles.forEach((element) => {
                if (!element.isConnected) {
                    articles.delete(element);
                    return;
                }

                const rect = element.getBoundingClientRect();

                const targetX = pointerX - rect.left;
                const targetY = pointerY - rect.top;

                const currentX = Number(element.dataset.glowX ?? targetX);
                const currentY = Number(element.dataset.glowY ?? targetY);

                const nextX = currentX + (targetX - currentX) * 0.12;
                const nextY = currentY + (targetY - currentY) * 0.12;

                element.dataset.glowX = String(nextX);
                element.dataset.glowY = String(nextY);

                element.style.setProperty("--mouse-x", `${nextX}px`);
                element.style.setProperty("--mouse-y", `${nextY}px`);

                if (
                    Math.abs(targetX - nextX) > 0.1 ||
                    Math.abs(targetY - nextY) > 0.1
                ) {
                    moving = true;
                }
            });

            if (moving) {
                animationFrame = requestAnimationFrame(update);
            } else {
                animationFrame = 0;
            }
        }

        function handlePointerMove(event: PointerEvent) {
            pointerX = event.clientX;
            pointerY = event.clientY;

            if (!animationFrame) {
                animationFrame = requestAnimationFrame(update);
            }
        }

        document.addEventListener("pointermove", handlePointerMove);

        return () => {
            observer.disconnect();
            document.removeEventListener("pointermove", handlePointerMove);
            cancelAnimationFrame(animationFrame);

            articles.forEach((element) => {
                element.classList.remove("glow");
                element.style.removeProperty("--mouse-x");
                element.style.removeProperty("--mouse-y");
                delete element.dataset.glowX;
                delete element.dataset.glowY;
            });
        };
    });
</script>

<style>
    :global(article.glow) {
        --glow-size: 180px;
        --glow-color: var(--pico-primary);
        --glow-color-strong: var(--pico-primary-focus);

        position: relative;
        isolation: isolate;
    }

    :global(article.glow::before),
    :global(article.glow::after) {
        z-index: -1;
        content: "";
        position: absolute;
        inset: 0;
        pointer-events: none;
        border-radius: inherit;
    }

    :global(article.glow::before) {
        background: radial-gradient(
            circle var(--glow-size) at var(--mouse-x, -1000px)
                var(--mouse-y, -1000px),
            color-mix(in srgb, var(--glow-color) 18%, transparent) 0%,
            color-mix(in srgb, var(--glow-color) 10%, transparent) 30%,
            color-mix(in srgb, var(--glow-color) 4%, transparent) 65%,
            transparent 100%
        );
    }

    :global(article.glow::after) {
        padding: 2px;

        background: radial-gradient(
            circle var(--glow-size) at var(--mouse-x, -1000px)
                var(--mouse-y, -1000px),
            color-mix(in srgb, var(--glow-color-strong) 85%, transparent) 0%,
            color-mix(in srgb, var(--glow-color) 55%, transparent) 25%,
            color-mix(in srgb, var(--glow-color) 15%, transparent) 60%,
            transparent 100%
        );

        -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
    }
</style>
