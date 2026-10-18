import type Lenis from "lenis";

let instance: Lenis | null = null;

export const setLenis = (l: Lenis | null) => {
  instance = l;
};
export const getLenis = () => instance;

/** Smooth-scroll to a hash target (or fall back to native scrolling). */
export function scrollToTarget(target: string | number | HTMLElement, offset = 0) {
  if (instance) {
    instance.scrollTo(target, { offset, duration: 1.6, easing: (t) => 1 - Math.pow(1 - t, 4) });
    return;
  }
  if (typeof target === "string") {
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  } else if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: "smooth" });
  } else {
    target.scrollIntoView({ behavior: "smooth" });
  }
}
