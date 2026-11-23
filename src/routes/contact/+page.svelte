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
                    <img class="themed-image" src={icon} alt="" />
                    <span>{name}</span>
                </a>
            </li>
        {/each}
    </ul>
</main>

<style>
    .intro {
        margin-block: clamp(2.5rem, 8vh, 5rem) 2.5rem;
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
        gap: 1.25rem;
        padding: 0;
    }

    li {
        padding: 0;
    }

    a {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.6rem;
        width: 5rem;
        padding: 0.75rem 0.25rem;

        border: 1px solid transparent;
        border-radius: var(--ui-radius);
        text-align: center;
        text-decoration: none;

        transition:
            transform var(--ui-fast) var(--ui-ease),
            border-color var(--ui-fast) ease,
            background-color var(--ui-fast) ease;
    }

    span {
        font-size: 0.8rem;
        font-weight: 600;
        opacity: 0.7;
    }

    img {
        width: 3rem;
        height: 3rem;
    }

    @media (hover: hover) {
        a:hover {
            transform: translateY(-3px);
            border-color: var(--pico-border-color);
            background: var(--pico-card-background-color);
        }

        a:hover span {
            opacity: 1;
        }
    }
</style>
