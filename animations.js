<script>
  document.addEventListener("DOMContentLoaded", function() {

gsap.registerPlugin(ScrollTrigger);

const panels = gsap.utils.toArray(".panel");
const paginationItems = gsap.utils.toArray(".pagination_item");
const wrapper = document.querySelector(".wrapper");

if(window.innerWidth > 991){ // desktop = scroll orizzontale

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

      onUpdate: (self) => {
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
  // Non serve GSAP per lo scroll verticale
  // Solo rimuoviamo eventuale skew
  panels.forEach(p => gsap.set(p, { skewX: 0 }));
}
</script>


<script>
document.querySelectorAll(".img-home-a").forEach(trigger => {
  trigger.addEventListener("click", function(e) {
    e.preventDefault();

    const url = this.closest("a") ? this.closest("a").href : "#";

    // Prendo il panel corrente
    const currentPanel = this.closest(".panel");
    const prevPanel = currentPanel.previousElementSibling;
    const nextPanel = currentPanel.nextElementSibling;

    const title = currentPanel.querySelector(".project-name");
    const cta = currentPanel.querySelector(".go-to-project");
    const image = currentPanel.querySelector(".img_home");
    const bg = document.querySelector(".transition-bg");

    if (!title || !cta || !image) return;

    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      onComplete: () => {
        window.location.href = url;
      }
    });

    // 1️⃣ Testi: salgono e spariscono
    tl.to([title, cta], { y: "-100%", duration: 0.9, stagger: 0.05, ease: "power4.inOut" });

    // 2️⃣ Background diventa nero
    tl.to(bg, { opacity: 1, duration: 1.5, ease: "power4.inOut" }, "<");

    // 3️⃣ Immagine: zoom centrale
    tl.to(image, { scaleX: "2.5", // scala solo in larghezza
  								 scaleY: "2.5", // scala solo in altezza
 									 transformOrigin: "center center", duration: 1.8, ease: "power4.inOut" }, "<");

    // 4️⃣ Pannelli laterali: escono dalla viewport
    if (prevPanel) tl.to(prevPanel, { x: "-100vw", duration: 1, ease: "power2.inOut" }, "<");
    if (nextPanel) tl.to(nextPanel, { x: "100vw", duration: 1, ease: "power2.inOut" }, "<");
  });
});
});
</script>

<script>
window.addEventListener("pageshow", function (event) {
  if (event.persisted) {
    window.location.reload();
  }
});
</script>

<script>
window.addEventListener("load", () => {
  const overlay = document.querySelector(".back-transition-end");
  const transition_logo = document.querySelector(".transition-logo");
  if (!overlay) return;

  // controllo se è già stato sul sito
  if (!sessionStorage.getItem("visited")) {
    // PRIMO accesso → nascondo overlay e basta
    overlay.style.transform = "translateY(-100%)";
    transition_logo.style.transform = "translateY(100%)";
    sessionStorage.setItem("visited", "true");
    return;
  }

  // accessi successivi → animazione
  gsap.to(overlay, {
    y: "-100%",
    duration: 1.2,
    ease: "power4.inOut"
  });

  gsap.to(transition_logo, {
    y: "100%",
    duration: 1.2,
    ease: "power4.inOut"
  });
});
</script>


<style>
html, body {
  overflow-x: hidden;
}
</style>
