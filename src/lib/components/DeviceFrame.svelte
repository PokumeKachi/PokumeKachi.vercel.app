<script lang="ts">
    let {
        url = "https://example.com",
        title,
        description,
    }: {
        url?: string;
        title?: string;
        description?: string;
    } = $props();

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

<div>
    {#if title}
        <header>
            <hgroup>
                <h1>{title}</h1>
                {#if description}
                    <p>{description}</p>
                {/if}
            </hgroup>
        </header>
    {/if}

    {#if embedUrl}
        <nav aria-label="Embedded site">
            <ul>
                <li>
                    <a
                        href={embedUrl.href}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Open in new tab
                    </a>
                </li>
            </ul>
        </nav>

        <iframe
            src={embedUrl.href}
            title={`Embedded content from ${embedUrl.hostname}`}
            width="100%"
            height="720"
            loading="lazy"
        ></iframe>
    {:else}
        <p role="alert">
            Invalid URL. Only HTTP and HTTPS URLs are supported.
        </p>
    {/if}
</div>
