<script lang="ts">
    import { getContext, onMount } from "svelte";
    import Lenis from "lenis";

    let { url = "https://example.com" } = $props();

    const lenisReady = getContext("lenis");

    onMount(() => {
        let disposed = false;
        let lenis: Lenis | undefined;

        const scrollKeys = new Set([
            "ArrowUp",
            "ArrowDown",
            "ArrowLeft",
            "ArrowRight",
            "PageUp",
            "PageDown",
            "Home",
            "End",
            " ",
        ]);

        function preventKeyboardScroll(event: KeyboardEvent) {
            if (!scrollKeys.has(event.key)) return;

            if (
                event.target instanceof Element &&
                event.target.closest(
                    [
                        "input",
                        "textarea",
                        "select",
                        "button",
                        "a[href]",
                        "[contenteditable='true']",
                        "[role='textbox']",
                        "[role='button']",
                    ].join(", "),
                )
            ) {
                return;
            }

            event.preventDefault();
        }

        document.documentElement.classList.add("scroll-locked");
        window.addEventListener("keydown", preventKeyboardScroll, true);

        lenisReady.then((instance) => {
            if (disposed) return;

            lenis = instance;
            lenis.stop();
        });

        return () => {
            disposed = true;

            window.removeEventListener("keydown", preventKeyboardScroll, true);
            document.documentElement.classList.remove("scroll-locked");

            lenis?.start();
        };
    });

    function openExternal() {
        window.open(url, "_blank", "noopener,noreferrer");
    }
</script>

<div class="iframe-wrapper">
    <button
        type="button"
        class="topbar"
        onclick={openExternal}
        aria-label="Open in new tab"
        title="Open in new tab"
    >
        <span>Open in new tab</span>
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
        >
            <path d="M14 3h7v7" /> <path d="M10 14 21 3" />
            <path
                d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"
            />
        </svg>
    </button>
    <iframe
        src={url}
        loading="lazy"
        title="Embedded content"
        sandbox="allow-scripts allow-same-origin allow-forms"
        allow="accelerometer; camera; encrypted-media; gyroscope; picture-in-picture"
    ></iframe>
</div>

<style>
    .iframe-wrapper {
        display: flex;
        flex-direction: column;

        width: 100%;
        height: calc(100dvh - var(--header-height));
        min-height: 0;

        overflow: hidden;
        border-radius: var(--pico-border-radius);
        background: #f0f0f0;
    }

    .topbar {
        flex: 0 0 auto;
    }

    iframe {
        display: block;
        flex: 1 1 auto;

        width: 100%;
        height: 0;
        min-height: 0;

        border: 0;
        margin: 0;
        background: #f0f0f0;
    }

    .topbar {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.5rem 0.75rem;
        margin: 0;
        border: 0;
        border-radius: 0;
        background: var(--pico-card-background-color);
        color: inherit;
        cursor: pointer;
        text-align: left;
    }
    .topbar:hover {
        background: var(--pico-primary-background);
    }
    .topbar:focus-visible {
        outline: 2px solid currentColor;
        outline-offset: -2px;
    }
    .topbar span {
        font-size: 0.9rem;
    }
    .topbar svg {
        width: 1.1rem;
        height: 1.1rem;
        flex-shrink: 0;
    }
</style>
