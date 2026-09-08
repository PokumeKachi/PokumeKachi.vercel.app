<script lang="ts">
	import { page } from "$app/state";
	import { PAGE_TRANSITION_DURATION } from "$lib/animation";

	let { navigating } = $props();

	let activePath = $state(page.url.pathname);

	$effect(() => {
		activePath = page.url.pathname;
	});

	function navigate(href: string, event: MouseEvent) {
		if (navigating) {
			event.preventDefault();
			return;
		}

		activePath = href;
	}
</script>

<header class="container" style={`--transition-duration: ${PAGE_TRANSITION_DURATION * 2}ms`}>
	<nav>
		<ul>
			<li><h1>Pokume Kachi</h1></li>
		</ul>

		<ul>
			{#each [
				["Home", "/"],
				["Projects", "/projects"],
				["Contact", "/contact"]
			] as [name, href]}
				<li>
					<a
						{href}
						class:active={activePath === href}
						aria-current={activePath === href ? "page" : undefined}
						onclick={(event) => navigate(href, event)}
					>
						<em>{name}</em>
					</a>
				</li>
			{/each}
		</ul>
	</nav>
</header>

<style>
	nav ul:last-child a {
		position: relative;
	}

	nav ul:last-child a::after {
		content: "";
		position: absolute;
		left: 0;
		right: 0;
		bottom: -0.25rem;
		height: 2px;
		background: currentColor;
		transform: scaleX(0);
		transform-origin: center;
		transition:
			transform var(--transition-duration) cubic-bezier(0, 1, 0, 1);
	}

	nav ul:last-child a.active::after {
		transform: scaleX(1);
	}
</style>
