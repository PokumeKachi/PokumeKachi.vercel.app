import { browser, Lenis } from "$lib";
import { LENIS_LERP } from "$lib/design-language/motion";

let instance: Lenis | undefined;

export default function getLenis(): Lenis {
    if (instance) return instance;
    if (!browser) throw new Error("getLenis() must be called on the client");

    const content = document.querySelector<HTMLElement>("#page");
    if (!content) throw new Error("#page must exist before initializing Lenis");

    return (instance = new Lenis({
        wrapper: window,
        content,
        lerp: LENIS_LERP,
        autoRaf: true,
    }));
}
