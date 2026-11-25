<script lang="ts">
    import { onMount } from "svelte";

    const GLOW_LERP = 0.2;
    const GLOW_SIZE = 120;

    // Subtle illumination on foreground surfaces.
    const SURFACE_GLOW = {
        core: 14,
        middle: 7,
        edge: 2.5,
    };

    const SURFACE_CLASS = "ambient-gradient-surface";

    const BACKGROUND_PROPERTIES = [
        ["--original-image", "background-image"],
        ["--original-repeat", "background-repeat"],
        ["--original-position", "background-position"],
        ["--original-size", "background-size"],
        ["--original-origin", "background-origin"],
        ["--original-clip", "background-clip"],
        ["--original-attachment", "background-attachment"],
        ["--original-blend", "background-blend-mode"],
    ] as const;

    let ambientGlow: HTMLDivElement;

    onMount(() => {
        const root = document.documentElement;

        const surfaces = new Map<
            HTMLElement,
            {
                x?: number;
                y?: number;
                classAdded: boolean;
                previousVariables: Map<
                    string,
                    { value: string; priority: string }
                >;
            }
        >();

        const previousRootVariables = new Map(
            ["--glow-size", "--mouse-x", "--mouse-y"].map((name) => [
                name,
                {
                    value: root.style.getPropertyValue(name),
                    priority: root.style.getPropertyPriority(name),
                },
            ]),
        );

        root.style.setProperty("--glow-size", `${GLOW_SIZE}px`);

        root.style.setProperty(
            "--surface-glow-core",
            `${SURFACE_GLOW.core}%`,
        );

        root.style.setProperty(
            "--surface-glow-middle",
            `${SURFACE_GLOW.middle}%`,
        );

        root.style.setProperty(
            "--surface-glow-edge",
            `${SURFACE_GLOW.edge}%`,
        );

        const ambientLayer = ambientGlow;
        document.body.appendChild(ambientLayer);

        let pointerX = -1000;
        let pointerY = -1000;

        let ambientX = -1000;
        let ambientY = -1000;

        let hasPointer = false;
        let animationFrame = 0;

        // Preserve and configure a painted surface.
        function registerSurface(element: HTMLElement) {
            if (
                element === root ||
                element === document.body &&
                    element.classList.contains("ambient-glow") ||
                element === ambientLayer ||
                surfaces.has(element)
            ) {
                return;
            }

            const computed = getComputedStyle(element);

            // Detect genuinely opaque background colors.
            function isOpaque(color: string) {
                if (!color || color === "transparent") {
                    return false;
                }

                const match = color.match(
                    /[,/]\s*([\d.]+)%?\s*\)$/,
                );

                if (!match) return true;

                const alpha = Number(match[1]);
                const isPercentage = match[0].includes("%");

                return isPercentage ? alpha >= 98 : alpha >= 0.98;
            }

            const hasImage = computed.backgroundImage !== "none";
            const hasOpaqueColor = isOpaque(computed.backgroundColor);

            if (!hasImage && !hasOpaqueColor) {
                return;
            }

            const previousVariables = new Map<
                string,
                { value: string; priority: string }
            >();

            BACKGROUND_PROPERTIES.forEach(([variable, property]) => {
                previousVariables.set(variable, {
                    value: element.style.getPropertyValue(variable),
                    priority: element.style.getPropertyPriority(variable),
                });

                element.style.setProperty(
                    variable,
                    computed.getPropertyValue(property),
                );
            });

            const classAdded = !element.classList.contains(SURFACE_CLASS);

            if (classAdded) {
                element.classList.add(SURFACE_CLASS);
            }

            surfaces.set(element, {
                classAdded,
                previousVariables,
            });
        }

        // Automatically discover painted surfaces.
        function scan(node: Node) {
            if (!(node instanceof Element)) return;

            if (node instanceof HTMLElement) {
                registerSurface(node);
            }

            node.querySelectorAll("*").forEach((element) => {
                if (element instanceof HTMLElement) {
                    registerSurface(element);
                }
            });
        }

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === "childList") {
                    mutation.addedNodes.forEach(scan);
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });

        scan(document.body);

        function update() {
            let moving = false;

            // Viewport-wide ambient gradient.
            ambientX += (pointerX - ambientX) * GLOW_LERP;
            ambientY += (pointerY - ambientY) * GLOW_LERP;

            root.style.setProperty("--mouse-x", `${ambientX}px`);
            root.style.setProperty("--mouse-y", `${ambientY}px`);

            if (
                Math.abs(pointerX - ambientX) > 0.1 ||
                Math.abs(pointerY - ambientY) > 0.1
            ) {
                moving = true;
            }

            // Individual surface coordinates.
            surfaces.forEach((surface, element) => {
                if (!element.isConnected) {
                    surfaces.delete(element);
                    return;
                }

                const rect = element.getBoundingClientRect();

                const targetX = pointerX - rect.left;
                const targetY = pointerY - rect.top;

                const currentX = surface.x ?? targetX;
                const currentY = surface.y ?? targetY;

                const nextX =
                    currentX + (targetX - currentX) * GLOW_LERP;

                const nextY =
                    currentY + (targetY - currentY) * GLOW_LERP;

                surface.x = nextX;
                surface.y = nextY;

                element.style.setProperty(
                    "--surface-x",
                    `${nextX}px`,
                );

                element.style.setProperty(
                    "--surface-y",
                    `${nextY}px`,
                );

                if (
                    Math.abs(targetX - nextX) > 0.1 ||
                    Math.abs(targetY - nextY) > 0.1
                ) {
                    moving = true;
                }
            });

            animationFrame = moving
                ? requestAnimationFrame(update)
                : 0;
        }

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

        function handleScroll() {
            if (hasPointer) scheduleUpdate();
        }

        document.addEventListener("pointermove", handlePointerMove, {
            passive: true,
        });

        document.addEventListener("scroll", handleScroll, {
            passive: true,
            capture: true,
        });

        window.addEventListener("resize", handleScroll, {
            passive: true,
        });

        return () => {
            observer.disconnect();

            document.removeEventListener("pointermove", handlePointerMove);
            document.removeEventListener("scroll", handleScroll, true);
            window.removeEventListener("resize", handleScroll);

            cancelAnimationFrame(animationFrame);

            surfaces.forEach((surface, element) => {
                if (surface.classAdded) {
                    element.classList.remove(SURFACE_CLASS);
                }

                surface.previousVariables.forEach(
                    ({ value, priority }, variable) => {
                        if (value) {
                            element.style.setProperty(
                                variable,
                                value,
                                priority,
                            );
                        } else {
                            element.style.removeProperty(variable);
                        }
                    },
                );

                element.style.removeProperty("--surface-x");
                element.style.removeProperty("--surface-y");
            });

            ambientLayer.remove();

            previousRootVariables.forEach(
                ({ value, priority }, name) => {
                    if (value) {
                        root.style.setProperty(name, value, priority);
                    } else {
                        root.style.removeProperty(name);
                    }
                },
            );

            root.style.removeProperty("--surface-glow-core");
            root.style.removeProperty("--surface-glow-middle");
            root.style.removeProperty("--surface-glow-edge");
        };
    });
</script>

<div class="ambient-glow" bind:this={ambientGlow} aria-hidden="true"></div>

<style>
    :global(:root) {
        --ambient-hue: 150deg;
    }

    /* =========================================
       VIEWPORT AMBIENT GRADIENT
       ========================================= */

    :global(.ambient-glow) {
        position: fixed;
        inset: 0;
        z-index: -100;

        pointer-events: none;

        opacity: 0.85;
        filter: hue-rotate(var(--ambient-hue));

        background: radial-gradient(
            circle var(--glow-size, 120px) at
                var(--mouse-x, -1000px) var(--mouse-y, -1000px),

            color-mix(in srgb, var(--pico-primary, #3b82f6) 38%, transparent) 0%,
            color-mix(in srgb, var(--pico-primary, #3b82f6) 20%, transparent) 30%,
            color-mix(in srgb, var(--pico-primary, #3b82f6) 7%, transparent) 65%,
            transparent 100%
        );
    }

    /* =========================================
       AUTOMATIC FOREGROUND SURFACES
       ========================================= */

    :global(.ambient-gradient-surface) {
        background-image:
            radial-gradient(
                circle var(--glow-size, 120px) at
                    var(--surface-x, -1000px) var(--surface-y, -1000px),

                color-mix(
                    in srgb,
                    var(--pico-primary, #3b82f6)
                        var(--surface-glow-core, 14%),
                    transparent
                ) 0%,

                color-mix(
                    in srgb,
                    var(--pico-primary, #3b82f6)
                        var(--surface-glow-middle, 7%),
                    transparent
                ) 30%,

                color-mix(
                    in srgb,
                    var(--pico-primary, #3b82f6)
                        var(--surface-glow-edge, 2.5%),
                    transparent
                ) 65%,

                transparent 100%
            ),
            var(--original-image, none);

        background-repeat:
            no-repeat,
            var(--original-repeat, repeat);

        background-position:
            0 0,
            var(--original-position, 0% 0%);

        background-size:
            100% 100%,
            var(--original-size, auto);

        background-origin:
            border-box,
            var(--original-origin, padding-box);

        background-clip:
            border-box,
            var(--original-clip, border-box);

        background-attachment:
            scroll,
            var(--original-attachment, scroll);

        background-blend-mode:
            normal,
            var(--original-blend, normal);
    }
</style>
