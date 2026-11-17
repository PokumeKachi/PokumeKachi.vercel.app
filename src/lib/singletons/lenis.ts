import { browser, Lenis } from "$lib";
import { LENIS_LERP } from "$lib/design-language/motion";

let instance: Lenis | undefined;

export default function getLenis(): Lenis {
    if (instance) return instance;
    if (!browser) throw new Error("getLenis() must be called on the client");

    const wrapper = document.querySelector<HTMLElement>("#page-scroll") ?? undefined;
    const content =
        document.querySelector<HTMLElement>("#page-content") ?? undefined;

    return (instance = new Lenis({
        lerp: LENIS_LERP,
        autoRaf: true,
        // wrapper: content,
        // content: content,
    }));
}
