type Motion = {
  gsap: (typeof import("gsap"))["gsap"];
  ScrollTrigger: (typeof import("gsap/ScrollTrigger"))["ScrollTrigger"];
};

let library: Promise<Motion> | undefined;

function loadMotion() {
  library ??= Promise.all([import("gsap"), import("gsap/ScrollTrigger")])
    .then(([{ gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger);
      return { gsap, ScrollTrigger };
    })
    .catch((error) => {
      library = undefined;
      throw error;
    });
  return library;
}

/** Load desktop motion only when it can be used; static content is always available. */
export function mountScrollMotion(
  query: string,
  setup: (motion: Motion) => void | (() => void),
) {
  const preference = window.matchMedia(query);
  let mounted = true;
  let generation = 0;
  let undo: (() => void) | undefined;
  const update = () => {
    const current = ++generation;
    undo?.();
    undo = undefined;
    if (!mounted || !preference.matches) return;
    void loadMotion()
      .then((motion) => {
        if (!mounted || current !== generation || !preference.matches) return;
        const context = motion.gsap.context(() => setup(motion));
        undo = () => context.revert();
        void document.fonts.ready.then(() => {
          if (mounted && current === generation) motion.ScrollTrigger.refresh();
        });
      })
      .catch(() => {
        // Network failures leave the complete, ordinary document usable.
      });
  };
  preference.addEventListener("change", update);
  update();
  return () => {
    mounted = false;
    generation++;
    preference.removeEventListener("change", update);
    undo?.();
  };
}
