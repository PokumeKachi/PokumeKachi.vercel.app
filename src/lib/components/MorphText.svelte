<script lang="ts">
    import { onMount } from "svelte";

    type Props = {
        text: string;
        duration?: number;
    };

    let { text, duration = 500 }: Props = $props();

    let display: HTMLHeadingElement;
    let size: HTMLSpanElement;
    let a: HTMLSpanElement;
    let b: HTMLSpanElement;

    let currentText = "";
    let frameId = 0;

    export function morphTo(nextText: string) {
        if (!a || !b || !display || !size) return;
        if (nextText === currentText) return;

        cancelAnimationFrame(frameId);

        size.textContent = nextText;

        a.textContent = currentText;
        b.textContent = nextText;

        a.style.opacity = "1";
        b.style.opacity = "0";
        a.style.filter = "";
        b.style.filter = "";

        const start = performance.now();

        function frame(now: number) {
            const p = Math.min((now - start) / duration, 1);

            display.style.filter =
                p > 0 && p < 1 ? "url(#morph-threshold)" : "none";

            const blurA = Math.min(8 / Math.max(1 - p, 0.001) - 8, 100);

            const blurB = Math.min(8 / Math.max(p, 0.001) - 8, 100);

            a.style.opacity = String(1 - p);
            b.style.opacity = String(p);

            a.style.filter = `blur(${Math.max(0, blurA)}px)`;

            b.style.filter = `blur(${Math.max(0, blurB)}px)`;

            if (p < 1) {
                frameId = requestAnimationFrame(frame);
                return;
            }

            a.textContent = nextText;

            a.style.opacity = "1";
            b.style.opacity = "0";

            a.style.filter = "";
            b.style.filter = "";

            display.style.filter = "none";

            currentText = nextText;
            frameId = 0;
        }

        frameId = requestAnimationFrame(frame);
    }

    onMount(() => {
        currentText = text;

        size.textContent = text;
        a.textContent = text;
        b.textContent = "";

        a.style.opacity = "1";
        b.style.opacity = "0";

        return () => {
            cancelAnimationFrame(frameId);
        };
    });
</script>

<svelte:head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossorigin="anonymous"
    />
    <link
        href="https://fonts.googleapis.com/css2?family=Figtree:wght@900&display=swap"
        rel="stylesheet"
    />
</svelte:head>

<svg width="0" height="0" aria-hidden="true">
    <defs>
        <filter id="morph-threshold">
            <feColorMatrix
                type="matrix"
                values="
					1 0 0 0 0
					0 1 0 0 0
					0 0 1 0 0
					0 0 0 255 -100
				"
            />
        </filter>
    </defs>
</svg>

<h1 class="morph" bind:this={display}>
    <span class="sizer" bind:this={size} aria-hidden="true"></span>
    <span class="layer" bind:this={a} aria-hidden="true"></span>
    <span class="layer" bind:this={b} aria-hidden="true"></span>
</h1>

<style>
    .morph {
        position: relative;
        display: grid;
        width: 100%;
        max-width: 100%;
        min-width: 0;
        margin: 0;
        font-family: "Figtree", sans-serif;
        font-weight: 900;
        font-size: clamp(1rem, 4vw, 3rem);
        line-height: 1;
    }

    .sizer,
    .layer {
        grid-area: 1 / 1;
        min-width: 0;
        overflow-wrap: break-word;
    }

    .sizer {
        visibility: hidden;
        pointer-events: none;
    }

    .layer {
        pointer-events: none;
    }

    .layer:last-child {
        position: absolute;
        inset: 0;
    }

    @media (min-width: 601px) {
        .sizer,
        .layer {
            white-space: nowrap;
        }
    }
</style>
