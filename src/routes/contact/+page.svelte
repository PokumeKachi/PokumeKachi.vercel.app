<script lang="ts">
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

<svelte:head>
    <title>Contact — Pokume Kachi</title>
</svelte:head>

<main>
    <header>
        <h1>Contact</h1>
        <p>Find me online.</p>
    </header>

    <section aria-label="Social links">
        <ul class="socials">
            {#each links as { name, icon, url }}
                <li>
                    <a href={url}>
                        <img class="themed-image" src={icon} alt="" />
                        <span>{name}</span>
                    </a>
                </li>
            {/each}
        </ul>
    </section>
</main>
