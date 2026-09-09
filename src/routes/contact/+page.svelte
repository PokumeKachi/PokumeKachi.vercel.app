<script lang="ts">
    const links = [
        [
            "GitHub",
            "https://www.svgrepo.com/show/447165/github-outline.svg",
            "https://github.com/PokumeKachi",
        ],
        [
            "Discord",
            "https://www.svgrepo.com/show/447163/discord-outline.svg",
            "https://discord.com/users/1401468404367491135",
        ],
        [
            "Instagram",
            "https://www.svgrepo.com/show/447167/instagram-outline.svg",
            "https://www.instagram.com/kachiyes",
        ],
    ] as const;
</script>

<main class="container">
    <ul class="grid">
        {#each links as [name, icon, url]}
            <li>
                <img class="themed-image" src={icon} alt={name} />
                <a href={url}></a>
            </li>
        {/each}
    </ul>
</main>

<style>
    li {
        position: relative;
        padding: 0;
        width: 5rem;
        height: 5rem;
    }

    a {
        position: absolute;
        inset: 0;
    }

    ul {
        display: flex;
        justify-content: center;
        gap: 1rem;
        padding: 0;
    }

    img {
        width: 5rem;
        transition:
            transform 0.2s ease,
            filter 0.2s ease;
    }
</style>
