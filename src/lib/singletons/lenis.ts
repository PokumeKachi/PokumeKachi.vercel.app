import { browser } from "$app/environment";
import Lenis from "lenis";
import { LENIS_LERP } from "$lib/design-language/motion";

let instance: Lenis | undefined;

export default function getLenis(): Lenis {
    if (instance) return instance;
    if (!browser) throw new Error("getLenis() must be called on the client");

    instance = new Lenis({ lerp: LENIS_LERP, autoRaf: true });
    return instance;
}

if (import.meta.hot) {
    import.meta.hot.dispose(() => {
        instance?.destroy();
        instance = undefined;
    });
}
