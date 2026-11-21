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
    <ul>
        {#each links as { name, icon, url }}
            <li>
                <img class="themed-image" src={icon} alt={name} />
                <a href={url} aria-label={`Visit ${name}`}></a>
            </li>
        {/each}
    </ul>
</main>

<style>
    ul {
        display: flex;
        justify-content: center;
        gap: 1rem;
        padding: 0;
    }

    li {
        position: relative;
        width: 5rem;
        height: 5rem;
        padding: 0;
    }

    a {
        position: absolute;
        inset: 0;
    }

    img {
        width: 5rem;
    }
</style>
