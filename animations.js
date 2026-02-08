

  gsap.registerPlugin(ScrollTrigger);

  const panels = gsap.utils.toArray(".panel");
  const wrapper = document.querySelector(".wrapper");

  if (window.innerWidth > 991) { // desktop = scroll orizzontale
    let proxy = { skew: 0 };
    let skewSetter = gsap.quickSetter(".panel", "skewX", "deg");
    let clamp = gsap.utils.clamp(-15, 15);

    gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: ".section-scroll",
        pin: true,
        scrub: 1.5,
        snap: {
          snapTo: 1 / (panels.length - 1),
          duration: 0.2,
          ease: "power2.inOut"
        },
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
  // Click animazione su img-home-a
  // -------------------------------

  gsap.utils.toArray(".img-home-a").forEach(trigger => {
    trigger.addEventListener("click", e => {
      e.preventDefault();

      const url = trigger.closest("a")?.href ?? "#";
      const currentPanel = trigger.closest(".panel");
      if (!currentPanel) return;

      const prevPanel = currentPanel.previousElementSibling;
      const nextPanel = currentPanel.nextElementSibling;

      const title = currentPanel.querySelector(".project-name");
      const cta = currentPanel.querySelector(".go-to-project");
      const image = currentPanel.querySelector(".img_home");
      const bg = document.querySelector(".transition-bg");
      if (!title || !cta || !image || !bg) return;
      alert("Hai cliccato il pulsante2");
      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        onComplete: () => window.location.href = url
      });

      // Testi salgono e spariscono
      tl.to([title, cta], { y: "-100%", duration: 0.9, stagger: 0.05, ease: "power4.inOut" });

      // Background diventa nero
      tl.to(bg, { opacity: 1, duration: 1.5, ease: "power4.inOut" }, "<");

      // Immagine: zoom centrale
      tl.to(image, {
        scaleX: 2.5,
        scaleY: 2.5,
        transformOrigin: "center center",
        duration: 1.8,
        ease: "power4.inOut"
      }, "<");

      // Pannelli laterali escono dalla viewport
      if (prevPanel) tl.to(prevPanel, { x: "-100vw", duration: 1, ease: "power2.inOut" }, "<");
      if (nextPanel) tl.to(nextPanel, { x: "100vw", duration: 1, ease: "power2.inOut" }, "<");
    });
    });





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

