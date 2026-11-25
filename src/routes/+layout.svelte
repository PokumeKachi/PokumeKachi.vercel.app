<script lang="ts">
    import "@picocss/pico/css/pico.min.css";
    import "../layout.css";

    import { onMount } from "svelte";

    import Header from "./Header.svelte";
    import Footer from "./Footer.svelte";

    let { children } = $props();

    onMount(() => {
        // Automatically add the glow class to every article.
        const applyGlow = () => {
            document
                .querySelectorAll("article:not(.glow)")
                .forEach((element) => {
                    element.classList.add("glow");
                });
        };

        const observer = new MutationObserver(applyGlow);

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });

        applyGlow();

        // Cursor tracking.
        let pointerX = 0;
        let pointerY = 0;
        let animationFrame = 0;

        function handlePointerMove(event: PointerEvent) {
            pointerX = event.clientX;
            pointerY = event.clientY;

            if (animationFrame) return;

            function update() {
                let moving = false;

                document
                    .querySelectorAll<HTMLElement>(".glow")
                    .forEach((element) => {
                        const rect = element.getBoundingClientRect();

                        const targetX = pointerX - rect.left;
                        const targetY = pointerY - rect.top;

                        const currentX = Number(
                            element.dataset.glowX ?? targetX,
                        );
                        const currentY = Number(
                            element.dataset.glowY ?? targetY,
                        );

                        const nextX =
                            currentX + (targetX - currentX) * 0.12;
                        const nextY =
                            currentY + (targetY - currentY) * 0.12;

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

            animationFrame = requestAnimationFrame(update);
        }

        document.addEventListener("pointermove", handlePointerMove);

        return () => {
            observer.disconnect();
            document.removeEventListener("pointermove", handlePointerMove);
            cancelAnimationFrame(animationFrame);
        };
    });
</script>

<Header />

<main class="container">
    {@render children()}
</main>

<Footer />
