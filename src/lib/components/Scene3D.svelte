<script lang="ts">
    import { onMount } from "$lib";

    import type * as THREE from "three";

    import { SCENE } from "$lib/design-language/hero";

    let host: HTMLDivElement;

    onMount(() => {
        let disposed = false;
        let stop: (() => void) | undefined;

        const init = async () => {
            const THREE = await import("three");
            if (disposed || !host) return;

            let renderer: THREE.WebGLRenderer;
            try {
                renderer = new THREE.WebGLRenderer({
                    alpha: true,
                    antialias: false,
                    powerPreference: "low-power",
                });
            } catch {
                return;
            }

            renderer.setPixelRatio(Math.min(window.devicePixelRatio, SCENE.maxPixelRatio));
            renderer.setClearColor(0x000000, 0);
            host.appendChild(renderer.domElement);

            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
            camera.position.z = 9;

            const root = new THREE.Group();
            scene.add(root);

            const resolveAccent = () => {
                const probe = document.createElement("span");
                probe.style.color = "var(--pico-primary)";
                document.body.appendChild(probe);
                const value = getComputedStyle(probe).color;
                probe.remove();
                return value || "#0172ad";
            };

            const material = new THREE.LineBasicMaterial({
                color: new THREE.Color(resolveAccent()),
                transparent: true,
                opacity: SCENE.opacity,
            });
            const pointMaterial = new THREE.PointsMaterial({
                color: new THREE.Color(resolveAccent()),
                size: 0.035,
                transparent: true,
                opacity: SCENE.pointOpacity,
                sizeAttenuation: true,
            });

            const geometries: THREE.BufferGeometry[] = [];
            const addShape = (source: THREE.BufferGeometry, x: number, y: number, z: number) => {
                const edges = new THREE.EdgesGeometry(source);
                source.dispose();
                geometries.push(edges);
                const line = new THREE.LineSegments(edges, material);
                line.position.set(x, y, z);
                root.add(line);
            };

            addShape(new THREE.IcosahedronGeometry(1.7, 1), -4.8, 2.6, -1);
            addShape(new THREE.TorusGeometry(1.2, 0.4, 6, 14), 4.4, -1.8, 0);
            addShape(new THREE.OctahedronGeometry(1.1, 0), 3.4, 2.8, -2);
            addShape(new THREE.BoxGeometry(1.6, 1.6, 1.6), -4.2, -3.2, -1);

            const positions = new Float32Array(SCENE.pointCount * 3);
            for (let i = 0; i < positions.length; i += 3) {
                positions[i] = (Math.random() - 0.5) * 16;
                positions[i + 1] = (Math.random() - 0.5) * 14;
                positions[i + 2] = (Math.random() - 0.5) * 8 - 2;
            }
            const pointGeometry = new THREE.BufferGeometry();
            pointGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
            geometries.push(pointGeometry);
            const points = new THREE.Points(pointGeometry, pointMaterial);
            scene.add(points);

            const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
            const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;

            let pointerX = 0;
            let pointerY = 0;
            let easedX = 0;
            let easedY = 0;
            let frame = 0;

            const progress = () => {
                const max = document.documentElement.scrollHeight - window.innerHeight;
                return max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
            };

            const render = () => {
                const p = progress();
                root.rotation.y = p * SCENE.spin + easedX * SCENE.pointer;
                root.rotation.x = p * Math.PI * 0.9 + easedY * SCENE.pointer * 0.6;
                root.rotation.z = p * Math.PI * 0.35 - easedX * 0.2;
                root.position.y = (0.5 - p) * SCENE.swing;
                root.scale.setScalar(1 + p * 0.25);
                points.rotation.y = -p * Math.PI * 2;
                renderer.render(scene, camera);
            };

            const resize = () => {
                const width = host.clientWidth || 1;
                const height = host.clientHeight || 1;
                renderer.setSize(width, height, false);
                camera.aspect = width / height;
                camera.updateProjectionMatrix();
                render();
            };

            const tick = () => {
                easedX += (pointerX - easedX) * 0.06;
                easedY += (pointerY - easedY) * 0.06;
                render();
                frame = requestAnimationFrame(tick);
            };

            const onPointer = (event: PointerEvent) => {
                pointerX = (event.clientX / window.innerWidth - 0.5) * 2;
                pointerY = (event.clientY / window.innerHeight - 0.5) * 2;
                if (reduced) {
                    easedX = pointerX;
                    easedY = pointerY;
                    render();
                }
            };

            const onVisibility = () => {
                cancelAnimationFrame(frame);
                if (!document.hidden && !reduced) frame = requestAnimationFrame(tick);
            };

            const theme = matchMedia("(prefers-color-scheme: dark)");
            const onTheme = () => {
                const accent = new THREE.Color(resolveAccent());
                material.color.copy(accent);
                pointMaterial.color.copy(accent);
                render();
            };

            const observer = new ResizeObserver(resize);
            observer.observe(host);

            if (finePointer) window.addEventListener("pointermove", onPointer, { passive: true });
            document.addEventListener("visibilitychange", onVisibility);
            theme.addEventListener("change", onTheme);

            resize();
            if (!reduced) frame = requestAnimationFrame(tick);

            stop = () => {
                cancelAnimationFrame(frame);
                observer.disconnect();
                window.removeEventListener("pointermove", onPointer);
                document.removeEventListener("visibilitychange", onVisibility);
                theme.removeEventListener("change", onTheme);
                geometries.forEach((geometry) => geometry.dispose());
                material.dispose();
                pointMaterial.dispose();
                renderer.dispose();
                renderer.domElement.remove();
            };

            if (disposed) stop();
        };

        void init();

        return () => {
            disposed = true;
            stop?.();
        };
    });
</script>

<div class="scene3d" bind:this={host} aria-hidden="true"></div>

<style>
    /* Fixed to the viewport and outside route containers so the scene is
       never clipped by a page wrapper or its transform/overflow. */
    .scene3d {
        position: fixed;
        inset: 0;
        z-index: -1;
        pointer-events: none;
        opacity: 0.9;
    }

    .scene3d :global(canvas) {
        display: block;
        width: 100%;
        height: 100%;
    }
</style>
