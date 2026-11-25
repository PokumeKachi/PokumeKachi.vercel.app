<script lang="ts">
    const languages = [
        {
            name: "C++",
            url: "https://isocpp.org",
            icon: "https://www.svgrepo.com/show/452183/cpp.svg",
        },
        {
            name: "Rust",
            url: "https://www.rust-lang.org",
            icon: "https://www.svgrepo.com/show/473774/rust.svg",
        },
        {
            name: "TypeScript",
            url: "https://www.typescriptlang.org",
            icon: "https://www.svgrepo.com/show/374146/typescript-official.svg",
        },
        {
            name: "Python",
            url: "https://www.python.org",
            icon: "https://www.svgrepo.com/show/452091/python.svg",
        },
        {
            name: "Lua",
            url: "https://www.lua.org",
            icon: "https://www.svgrepo.com/show/508927/lua02.svg",
        },
        {
            name: "Dart",
            url: "https://dart.dev",
            icon: "https://www.svgrepo.com/show/353631/dart.svg",
        },
    ];
</script>

<svelte:head>
    <title>Legacy — Pokume Kachi</title>
</svelte:head>

<header>
    <hgroup>
        <h1>Legacy</h1>
        <p>Older stuff from before this site.</p>
    </hgroup>
</header>

<section aria-labelledby="whoiam-title">
    <h2 id="whoiam-title">whoiam</h2>

    <div class="overflow-auto">
        <table>
            <tbody>
                <tr>
                    <th>Name</th>
                    <td>Pokume Kachi</td>
                </tr>
                <tr>
                    <th>Country</th>
                    <td>Vietnam</td>
                </tr>
                <tr>
                    <th>Age</th>
                    <td>18</td>
                </tr>
                <tr>
                    <th>Occupation</th>
                    <td>Student</td>
                </tr>
                <tr>
                    <th>Education</th>
                    <td>
                        Vinh Linh High School · K66.2023–2026<br />
                        VNU-HCMUS · APCS Major · K26
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</section>

<section aria-labelledby="whatido-title">
    <h2 id="whatido-title">whatido</h2>

    <article>
        <h3>Languages</h3>

        <div class="grid">
            {#each languages as language}
                <figure>
                    <a href={language.url}>
                        <img
                            src={language.icon}
                            alt={language.name}
                            width="96"
                            height="96"
                        />
                    </a>
                    <figcaption><small>{language.name}</small></figcaption>
                </figure>
            {/each}
        </div>
    </article>

    <article>
        <h3>Full-stack Websites</h3>

        <ul>
            <li>
                Fast, lightweight websites with
                <a href="https://github.com/tokio-rs/axum">Axum</a>
                on the back-end and
                <a href="https://htmx.org">HTMX</a>
                on the front-end.
            </li>

            <li>
                Quickly built web apps using
                <a href="https://nodejs.org">Node.js</a>
                and
                <a href="https://react.dev">React</a>.
            </li>

            <li>
                Full-stack applications built around
                <a href="https://svelte.dev/docs/kit">SvelteKit</a>.
            </li>

            <li>
                Other tools I work with include
                <a href="https://tailwindcss.com">Tailwind CSS</a>,
                <a href="https://getbootstrap.com">Bootstrap</a>,
                <a href="https://postcss.org">PostCSS</a>,
                <a href="https://www.postgresql.org">PostgreSQL</a>,
                <a href="https://www.mongodb.com">MongoDB</a>,
                <a href="https://redis.io">Redis</a>,
                <a href="https://nginx.org">Nginx</a>,
                <a href="https://caddyserver.com">Caddy</a>,
                <a href="https://podman.io">Podman</a>, and
                <a href="https://www.docker.com">Docker</a>.
            </li>
        </ul>

        <h3>Native Applications</h3>

        <ul>
            <li>
                Rapidly prototyped desktop and mobile apps with
                <a href="https://flutter.dev">Flutter</a>.
            </li>

            <li>
                Native applications with
                <a href="https://www.qt.io">Qt</a>
                and
                <a href="https://gtk-rs.org">GTK</a>.
            </li>

            <li>
                Small, fast terminal applications with
                <a href="https://ratatui.rs">Ratatui</a>
                and
                <a href="https://textual.textualize.io">Textual</a>.
            </li>
        </ul>

        <h3>Sysadmin &amp; Hosting</h3>

        <ul>
            <li>
                Comfortable working with Linux, including
                <a href="https://nixos.org">NixOS</a>,
                <a href="https://archlinux.org">Arch Linux</a>,
                <a href="https://debian.org">Debian</a>, and
                <a href="https://ubuntu.com/server">Ubuntu Server</a>.
            </li>

            <li>
                Using <a href="https://nix.dev">Nix</a>
                to keep development environments reproducible and easy to set
                up.
            </li>

            <li>
                Running and deploying services with
                <a href="https://podman.io">Podman</a>
                and
                <a href="https://www.docker.com">Docker</a>.
            </li>
        </ul>
    </article>
</section>

<section aria-labelledby="whatidid-title">
    <h2 id="whatidid-title">whatidid</h2>

    <article>
        <section>
            <h4>
                A bunch of Godot games
                <small>(2022–2024)</small>
            </h4>

            <ul>
                <li>
                    <a
                        href="https://github.com/PokumeKachi/godot-projects-archive/tree/main/v3-projects/BrackeyJam%202023.1"
                    >
                        One entry to Brackeys' Game Jam 2023.1
                    </a>
                </li>

                <li>
                    <a
                        href="https://github.com/PokumeKachi/godot-projects-archive/tree/main/v3-projects/Keyboard%20Game%20For%20Sang%20Tao%20Tre"
                    >
                        One entry for Hoi thi Tin hoc tre cap Tinh Quang Tri
                        2022–2023
                    </a>
                </li>

                <li>
                    <a
                        href="https://github.com/PokumeKachi/godot-projects-archive/tree/main/v3-projects/olympia"
                    >
                        One entry for Hoi thi Nghien cuu khoa hoc cap Tinh
                        Quang Tri 2023–2024
                    </a>
                </li>
            </ul>

            <p>
                <a
                    href="https://github.com/PokumeKachi/godot-projects-archive"
                >
                    All open-sourced on GitHub.
                </a>
            </p>
        </section>

        <section>
            <h4>
                A Lua script that generates a whole dictionary database from a
                text file with a custom-made syntax
                <small>(October–December 2024)</small>
            </h4>

            <p>
                <a href="https://github.com/PokumeKachi/the-dumpster">
                    Open-sourced on GitHub.
                </a>
            </p>
        </section>

        <section>
            <h4>
                Another Lua script that acts as a question bank, generating test
                papers from a text file with even more custom-made syntax
                <small>(October–December 2024)</small>
            </h4>

            <p>
                <a href="https://github.com/PokumeKachi/mph">
                    Open-sourced on GitHub.
                </a>
            </p>
        </section>

        <section>
            <h4>
                An Arduino robot controller program
                <small>(July 2025)</small>
            </h4>

            <p>
                Written for the
                <strong>FPTU AI &amp; Robotics Challenge 2025 Round 2</strong>.
            </p>

            <p>
                <a href="https://github.com/PokumeKachi/fptu-robot">
                    Open-sourced on GitHub.
                </a>
            </p>
        </section>

        <section>
            <h4>
                A static portfolio website
                <small>(February 2026)</small>
            </h4>

            <p>
                <em>Replaced by The website you are looking at right now.</em>
            </p>

            <p>
                Powered by
                <a href="https://astro.build">Astro</a>
                and
                <a href="https://tailwindcss.com">Tailwind CSS</a>.
            </p>

            <p>
                <a
                    href="https://github.com/PokumeKachi/pokumekachi.web.app"
                >
                    Open-sourced on GitHub.
                </a>
            </p>

            <p>
                Deployed on
                <a href="https://firebase.google.com">Firebase</a>
                at
                <a href="https://pokumekachi.web.app/legacy">
                    pokumekachi.web.app/legacy
                </a>.
            </p>
        </section>

        <section>
            <h4>
                The website you are looking at right now
                <small>(August 2026)</small>
            </h4>

            <p>
                Powered by
                <a href="https://svelte.dev/docs/kit">SvelteKit</a>
                and
                <a href="https://picocss.com">Pico CSS</a>.
            </p>

            <p>
                <a
                    href="https://github.com/PokumeKachi/pokumekachi.vercel.app"
                >
                    Open-sourced on GitHub.
                </a>
            </p>

            <p>
                Deployed on
                <a href="https://vercel.com">Vercel</a>
                at
                <a href="https://pokumekachi.vercel.app">
                    pokumekachi.vercel.app
                </a>.
            </p>
        </section>

        <section>
            <h4>Linux <small>(2023–now)</small></h4>

            <ul>
                <li>Debian (August 2023–December 2023)</li>
                <li>Arch Linux (December 2023–May 2025)</li>
                <li>NixOS (May 2025–June 2026)</li>
                <li>Arch Linux (June 2026–now)</li>
            </ul>
        </section>
    </article>
</section>
