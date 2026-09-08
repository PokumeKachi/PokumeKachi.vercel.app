<script lang="ts">
    const links = [
        [
            "GitHub",
            "https://icones.pro/wp-content/uploads/2021/06/icone-github-violet.png",
            "https://github.com/PokumeKachi",
        ],
        [
            "Discord",
            "https://en.wikifur.com/w/images/d/d0/Discord_logo.png",
            "https://discord.com/users/1401468404367491135",
        ],
        [
            "Instagram",
            "https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg",
            "https://www.instagram.com/kachiyes",
        ],
    ] as const;
</script>

<main class="container">
    <ul>
        {#each links as [name, icon, url]}
            <li>
                <img src={icon} alt={name} />
                <a href={url}></a>
            </li>
        {/each}
    </ul>
</main>

<style>
    li {
        position: relative;
        list-style: none;
        padding: 0;
        width: 5rem;
        height: 5rem;
    }

    img {
        width: 5rem;
        pointer-events: none;
        user-select: none;
        transition:
            transform 0.2s ease,
            filter 0.2s ease;
    }

    a {
        position: absolute;
        inset: 0;
    }

    li:hover img {
        transform: scale(1.15) translateY(-0.2rem);
        filter: drop-shadow(0 0 0.5rem currentColor);
    }
</style>
