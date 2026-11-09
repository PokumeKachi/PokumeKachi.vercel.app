<script lang="ts">
    import ScrollLock from "$lib/behaviors/ScrollLock.svelte";

    let { url = "https://example.com" } = $props();

    const hostname = $derived.by(() => {
        try {
            return new URL(url).hostname;
        } catch {
            return "external site";
        }
    });

    function openExternal() {
        try {
            const u = new URL(url);
            if (u.protocol !== "http:" && u.protocol !== "https:") return;
            window.open(u.href, "_blank", "noopener,noreferrer");
        } catch {}
    }
</script>

<ScrollLock />

<div class="iframe-wrapper">
    <button
        type="button"
        class="topbar"
        onclick={openExternal}
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
            <path d="M14 3h7v7" />
            <path d="M10 14 21 3" />
            <path
                d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"
            />
        </svg>
    </button>

    <iframe
        src={url}
        loading="lazy"
        title={`Embedded content from ${hostname}`}
        sandbox="allow-scripts allow-same-origin allow-forms"
        allow="encrypted-media; picture-in-picture"
    ></iframe>
</div>

<style>
    .iframe-wrapper {
        display: flex;
        flex-direction: column;

        width: 100%;
        height: var(
            --remaining-height,
            calc(100svh - var(--header-height, 0px))
        );

        overflow: hidden;
        border-radius: var(--pico-border-radius);
        background: var(--pico-card-background-color);
    }

    .topbar {
        flex: 0 0 auto;

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

    iframe {
        display: block;
        flex: 1 1 auto;

        width: 100%;
        height: 0;
        min-height: 0;

        border: 0;
        margin: 0;
        background: var(--pico-card-background-color);
    }
</style>
