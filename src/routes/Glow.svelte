<script lang="ts">
    import { onMount } from "svelte";

    onMount(() => {
        const glowElements = new Set<HTMLElement>();
        const autoAddedClasses = new Set<HTMLElement>();

        let pointerX = 0;
        let pointerY = 0;
        let animationFrame = 0;

        // Register every element that already has the glow class.
        const applyGlow = () => {
            document
                .querySelectorAll<HTMLElement>(".glow")
                .forEach((element) => {
                    glowElements.add(element);
                });

            // Automatically register articles as glow elements.
            document
                .querySelectorAll<HTMLElement>("article")
                .forEach((element) => {
                    if (!element.classList.contains("glow")) {
                        element.classList.add("glow");
                        autoAddedClasses.add(element);
                    }

                    glowElements.add(element);
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

            glowElements.forEach((element) => {
                if (!element.isConnected) {
                    glowElements.delete(element);
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

            glowElements.forEach((element) => {
                element.style.removeProperty("--mouse-x");
                element.style.removeProperty("--mouse-y");

                delete element.dataset.glowX;
                delete element.dataset.glowY;
            });

            // Only remove classes that this component added.
            autoAddedClasses.forEach((element) => {
                element.classList.remove("glow");
            });
        };
    });
</script>

<style>
    :global(.glow) {
        --glow-size: 180px;
        --glow-color: var(--pico-primary);
        --glow-color-strong: var(--pico-primary-focus);

        position: relative;
        isolation: isolate;
    }

    :global(.glow::before),
    :global(.glow::after) {
        z-index: -1;
        content: "";
        position: absolute;
        inset: 0;
        pointer-events: none;
        border-radius: inherit;
    }

    :global(.glow::before) {
        background: radial-gradient(
            circle var(--glow-size) at var(--mouse-x, -1000px)
                var(--mouse-y, -1000px),
            color-mix(in srgb, var(--glow-color) 18%, transparent) 0%,
            color-mix(in srgb, var(--glow-color) 10%, transparent) 30%,
            color-mix(in srgb, var(--glow-color) 4%, transparent) 65%,
            transparent 100%
        );
    }

    :global(.glow::after) {
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
