<script lang="ts">
    import { onMount } from "svelte";

    const GLOW_LERP = 0.2;
    const GLOW_SIZE = 120;

    let ambientGlow: HTMLDivElement;

    onMount(() => {
        const glowElements = new Set<HTMLElement>();
        const autoAddedClasses = new Set<HTMLElement>();

        // Configure global glow size.
        const root = document.documentElement;
        const previousGlowSize = root.style.getPropertyValue("--glow-size");
        const previousGlowSizePriority =
            root.style.getPropertyPriority("--glow-size");

        root.style.setProperty("--glow-size", `${GLOW_SIZE}px`);

        // Mount outside the application layout.
        const ambientLayer = ambientGlow;
        document.body.appendChild(ambientLayer);

        let pointerX = -1000;
        let pointerY = -1000;

        let ambientX = -1000;
        let ambientY = -1000;

        let hasPointer = false;
        let animationFrame = 0;

        const applyGlow = () => {
            // Register explicitly assigned glow elements.
            document
                .querySelectorAll<HTMLElement>(".glow")
                .forEach((element) => {
                    glowElements.add(element);
                });

            // Automatically register articles.
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
            attributes: true,
            attributeFilter: ["class"],
        });

        applyGlow();

        function update() {
            let moving = false;

            // Viewport-wide ambient glow.
            ambientX += (pointerX - ambientX) * GLOW_LERP;
            ambientY += (pointerY - ambientY) * GLOW_LERP;

            ambientLayer.style.setProperty("--mouse-x", `${ambientX}px`);
            ambientLayer.style.setProperty("--mouse-y", `${ambientY}px`);

            if (
                Math.abs(pointerX - ambientX) > 0.1 ||
                Math.abs(pointerY - ambientY) > 0.1
            ) {
                moving = true;
            }

            // Individual glow elements.
            glowElements.forEach((element) => {
                if (!element.isConnected) {
                    glowElements.delete(element);
                    return;
                }

                const rect = element.getBoundingClientRect();

                // Convert viewport coordinates into element coordinates.
                const targetX = pointerX - rect.left;
                const targetY = pointerY - rect.top;

                const currentX = Number(element.dataset.glowX ?? targetX);
                const currentY = Number(element.dataset.glowY ?? targetY);

                const nextX =
                    currentX + (targetX - currentX) * GLOW_LERP;
                const nextY =
                    currentY + (targetY - currentY) * GLOW_LERP;

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

        // Schedule an animation frame if one isn't already running.
        function scheduleUpdate() {
            if (!animationFrame) {
                animationFrame = requestAnimationFrame(update);
            }
        }

        function handlePointerMove(event: PointerEvent) {
            pointerX = event.clientX;
            pointerY = event.clientY;

            if (!hasPointer) {
                hasPointer = true;
                ambientX = pointerX;
                ambientY = pointerY;
            }

            scheduleUpdate();
        }

        // Recalculate element positions when scrolling.
        function handleScroll() {
            if (hasPointer) {
                scheduleUpdate();
            }
        }

        // Listen for pointer movement.
        document.addEventListener("pointermove", handlePointerMove, {
            passive: true,
        });

        // Capture scroll events, including nested scroll containers.
        document.addEventListener("scroll", handleScroll, {
            passive: true,
            capture: true,
        });

        // Recalculate positions when the viewport changes.
        window.addEventListener("resize", handleScroll, {
            passive: true,
        });

        return () => {
            observer.disconnect();

            document.removeEventListener("pointermove", handlePointerMove);
            document.removeEventListener("scroll", handleScroll, true);
            window.removeEventListener("resize", handleScroll);

            cancelAnimationFrame(animationFrame);

            // Clean up individual glow elements.
            glowElements.forEach((element) => {
                element.style.removeProperty("--mouse-x");
                element.style.removeProperty("--mouse-y");

                delete element.dataset.glowX;
                delete element.dataset.glowY;
            });

            // Remove automatically assigned classes.
            autoAddedClasses.forEach((element) => {
                element.classList.remove("glow");
            });

            // Remove the portal element.
            ambientLayer.remove();

            // Restore the previous global glow size.
            if (previousGlowSize) {
                root.style.setProperty(
                    "--glow-size",
                    previousGlowSize,
                    previousGlowSizePriority,
                );
            } else {
                root.style.removeProperty("--glow-size");
            }
        };
    });
</script>

<!-- Viewport-wide ambient glow -->
<div class="ambient-glow" bind:this={ambientGlow} aria-hidden="true"></div>

<style>
    :global(:root) {
        --ambient-hue: 150deg;
    }

    /* Viewport-wide complementary ambient glow. */
    :global(.ambient-glow) {
        position: fixed;
        inset: 0;
        z-index: -100;

        pointer-events: none;

        opacity: 0.85;
        filter: hue-rotate(var(--ambient-hue));

        background: radial-gradient(
            circle var(--glow-size, 120px) at var(--mouse-x, -1000px)
                var(--mouse-y, -1000px),
            color-mix(in srgb, var(--pico-primary, #3b82f6) 38%, transparent) 0%,
            color-mix(in srgb, var(--pico-primary, #3b82f6) 20%, transparent) 30%,
            color-mix(in srgb, var(--pico-primary, #3b82f6) 7%, transparent) 65%,
            transparent 100%
        );
    }

    /* Individual glow elements. */
    :global(.glow) {
        --glow-color: var(--pico-primary, #3b82f6);
        --glow-color-strong: var(--pico-primary-focus, #2563eb);

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

    /* Ambient surface illumination. */
    :global(.glow::before) {
        background: radial-gradient(
            circle var(--glow-size, 120px) at var(--mouse-x, -1000px)
                var(--mouse-y, -1000px),
            color-mix(in srgb, var(--glow-color) 18%, transparent) 0%,
            color-mix(in srgb, var(--glow-color) 10%, transparent) 30%,
            color-mix(in srgb, var(--glow-color) 4%, transparent) 65%,
            transparent 100%
        );
    }

    /* Border illumination. */
    :global(.glow::after) {
        padding: 2px;

        background: radial-gradient(
            circle var(--glow-size, 120px) at var(--mouse-x, -1000px)
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
