<script>
    import { onMount } from "svelte";
    let { url = "https://example.com" } = $props();
    let ratio = $state("16/9");
    function updateRatio() {
        const w = window.innerWidth;
        const h = window.innerHeight;
        ratio = `${w}/${h}`;
    }
    function openExternal() {
        window.open(url, "_blank", "noopener,noreferrer");
    }
    onMount(() => {
        updateRatio();
        window.addEventListener("resize", updateRatio);
        return () => {
            window.removeEventListener("resize", updateRatio);
        };
    });
</script>

<div class="container">
    <div class="iframe-wrapper">
        <button
            type="button"
            class="topbar"
            onclick={openExternal}
            aria-label="Open preview in new tab"
            title="Open preview in new tab"
        >
            <span>Preview</span>
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
            style="width:100%; aspect-ratio:{ratio}; border:0; display:block; background:#f0f0f0;"
        ></iframe>
    </div>
</div>

<style>
    .iframe-wrapper {
        overflow: hidden;
        border-radius: var(--pico-border-radius);
        background: #f0f0f0;
    }
    .topbar {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.5rem 0.75rem;
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
