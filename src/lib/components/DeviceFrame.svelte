<script lang="ts">
    import ScrollLock from "$lib/behaviors/ScrollLock.svelte";

    interface Props {
        url?: string;
    }

    let { url = "https://example.com" }: Props = $props();

    const embedUrl = $derived.by(() => {
        try {
            const parsed = new URL(url);

            if (
                !["http:", "https:"].includes(parsed.protocol) ||
                parsed.username ||
                parsed.password
            ) {
                return null;
            }

            return parsed;
        } catch {
            return null;
        }
    });
</script>

<ScrollLock />

<div class="iframe-wrapper">
    {#if embedUrl}
        <a
            class="topbar"
            href={embedUrl.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${embedUrl.hostname} in a new tab`}
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
                <path
                    d="M14 3h7v7M10 14 21 3M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"
                />
            </svg>
        </a>

        <iframe
            src={embedUrl.href}
            title={`Embedded content from ${embedUrl.hostname}`}
            sandbox="allow-scripts allow-forms"
            allow="encrypted-media; picture-in-picture"
        ></iframe>
    {:else}
        <p class="embed-error" role="alert">
            Invalid URL. Only HTTP and HTTPS URLs are supported.
        </p>
    {/if}
</div>

<style>
    .iframe-wrapper {
        display: flex;
        flex-direction: column;

        width: 100%;
        height: var(
            --remaining-height,
            calc(100dvh - var(--header-height, 0px))
        );
        min-height: 0;

        overflow: hidden;
        border-radius: var(--pico-border-radius);
        background: var(--pico-card-background-color);
    }

    .topbar {
        display: flex;
        flex: 0 0 auto;
        align-items: center;
        justify-content: space-between;

        width: 100%;
        padding: 0.5rem 0.75rem;
        margin: 0;

        border: 0;
        border-radius: 0;
        background: var(--pico-card-background-color);
        color: inherit;

        text-align: left;
        text-decoration: none;
        cursor: pointer;
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
        flex: 1 1 0;

        width: 100%;
        height: 0;
        min-width: 0;
        min-height: 0;

        margin: 0;
        border: 0;
        background: var(--pico-card-background-color);
    }

    .embed-error {
        margin: auto;
        padding: 1rem;
        text-align: center;
    }
</style>
