import { browser, Lenis } from "$lib";
import { LENIS_LERP } from "$lib/design-language/motion";

let instance: Lenis | undefined;

export default function getLenis(): Lenis {
    if (instance) return instance;
    if (!browser) throw new Error("getLenis() must be called on the client");

    return (instance = new Lenis({
        lerp: LENIS_LERP,
        autoRaf: true,
    }));
}
