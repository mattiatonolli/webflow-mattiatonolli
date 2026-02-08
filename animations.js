// -------------------------------
// Scroll orizzontale e skew panels
// -------------------------------
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const panels = gsap.utils.toArray(".panel");
  const wrapper = document.querySelector(".wrapper");

  if (!wrapper) return;

  if (window.innerWidth > 991) { // desktoa
    let skewSetter = gsap.quickSetter(".panel", "skewX", "deg");
    let clamp = gsap.utils.clamp(-15, 15);

    gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: ".section-scroll",
        pin: true,
        scrub: 1.5,
        snap: 1 / (panels.length - 1),
        end: () => "+=" + wrapper.offsetWidth,
        onUpdate: self => {
          let velocity = self.getVelocity();
          let skew = clamp(velocity / -800);

          if (Math.abs(skew) > Math.abs(proxy.skew)) {
            proxy.skew = skew;
            gsap.to(proxy, {
              skew: 0,
              duration: 0.8,
              ease: "power3.out",
              overwrite: true,
              onUpdate: () => skewSetter(proxy.skew)
            });
          }
        }
      }
    });
  } else { // mobile = scroll verticale
    panels.forEach(p => gsap.set(p, { skewX: 0 }));
  }


// -------------------------------
// Handle pageshow / cache back
// -------------------------------
window.addEventListener("pageshow", event => {
  if (event.persisted) window.location.reload();
});

// -------------------------------
// Animazione overlay all'accesso
// -------------------------------
window.addEventListener("load", () => {
  const overlay = document.querySelector(".back-transition-end");
  const transitionLogo = document.querySelector(".transition-logo");
  if (!overlay || !transitionLogo) return;

  if (!sessionStorage.getItem("visited")) {
    overlay.style.transform = "translateY(-100%)";
    transitionLogo.style.transform = "translateY(100%)";
    sessionStorage.setItem("visited", "true");
    return;
  }

  gsap.to(overlay, { y: "-100%", duration: 1.2, ease: "power4.inOut" });
  gsap.to(transitionLogo, { y: "100%", duration: 1.2, ease: "power4.inOut" });
});
