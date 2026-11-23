<script lang="ts">
    import ScrollLock from "$lib/behaviors/ScrollLock.svelte";

    const links = [
        {
            name: "GitHub",
            icon: "https://www.svgrepo.com/show/447165/github-outline.svg",
            url: "https://github.com/PokumeKachi",
        },
        {
            name: "Discord",
            icon: "https://www.svgrepo.com/show/447163/discord-outline.svg",
            url: "https://discord.com/users/1401468404367491135",
        },
        {
            name: "Instagram",
            icon: "https://www.svgrepo.com/show/447167/instagram-outline.svg",
            url: "https://www.instagram.com/kachiyes",
        },
    ] as const;
</script>

<ScrollLock />

<main class="container">
    <header class="intro">
        <p class="eyebrow">Say hello</p>
        <h1>Let's connect.</h1>
    </header>

    <ul>
        {#each links as { name, icon, url }}
            <li>
                <a href={url} aria-label={`Visit ${name}`}>
                    <span class="badge">
                        <img class="themed-image" src={icon} alt="" />
                    </span>
                    <span class="label">{name}</span>
                </a>
            </li>
        {/each}
    </ul>
</main>

<style>
    .intro {
        margin-block: clamp(2.5rem, 8vh, 5rem) 3rem;
        text-align: center;
    }

    .eyebrow {
        margin: 0 0 0.75rem;
        font-size: 0.78rem;
        font-weight: 600;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        opacity: 0.55;
    }

    h1 {
        margin: 0;
        font-size: clamp(2rem, 6vw, 3.5rem);
        line-height: 1.1;
    }

    ul {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1.5rem;
        padding: 0;
    }

    li {
        padding: 0;
    }

    a {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.75rem;
        width: 6.5rem;
        padding: 1rem 0.5rem;

        border: 1px solid transparent;
        border-radius: var(--ui-radius);
        text-align: center;
        text-decoration: none;

        transition:
            border-color var(--ui-fast) ease,
            background-color var(--ui-fast) ease;
    }

    .badge {
        display: grid;
        place-items: center;
        width: 4.5rem;
        height: 4.5rem;

        border: 1px solid var(--pico-border-color);
        border-radius: 50%;
        background: var(--pico-card-background-color);
        box-shadow: var(--ui-shadow);

        transition:
            transform var(--ui-fast) var(--ui-ease),
            border-color var(--ui-fast) ease,
            box-shadow var(--ui-fast) ease;
    }

    img {
        width: 2.25rem;
        height: 2.25rem;
    }

    .label {
        font-size: 0.85rem;
        font-weight: 600;
        opacity: 0.65;
        transition: opacity var(--ui-fast) ease;
    }

    @media (hover: hover) {
        a:hover {
            border-color: var(--pico-border-color);
            background: var(--pico-card-background-color);
        }

        a:hover .badge {
            transform: translateY(-4px);
            border-color: var(--pico-primary);
            box-shadow: 0 12px 28px -12px
                color-mix(in oklab, var(--pico-primary) 55%, transparent);
        }

        a:hover .label {
            opacity: 1;
        }
    }
</style>
