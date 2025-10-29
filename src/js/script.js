let gtk = document.querySelector("header > div > h1");
let navMenu = document.querySelector("header > div > nav");

const lenis = new Lenis({
  // Value between 0 and 1. Lower value = smoother scroll.
  lerp: 0.05,
  // Multiplier for the mouse wheel. Higher value = faster scrolling.
  wheelMultiplier: 2,
  // Set to true to enable infinite scrolling.
  infinite: false,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);
  gsap.to("#explore-btn", {
    y: "20px",
    duration: 0.8,
    repeat: "-1",
    yoyo: true,
    ease: "power1.inOut",
  });
  console.log([2, 3, 4, 5, 7].length);
  if (window.innerWidth > 1280) {
    gsap
      .timeline({
        defaults: { ease: "power3.inOut", duration: 0.3 },
        scrollTrigger: {
          trigger: "body",
          start: "top+=50 top",
          toggleActions: "play pause play reverse",
        },
      })
      .to(navMenu, {
        x: "-50%",
      })
      .to(
        gtk,
        {
          y: "-250%",
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.35"
      )
      .to(
        navMenu,
        {
          y: "-80%",
        },
        "-=0.2"
      );

    const pagesCtr = document.querySelector("#pages-ctr");
    const sections = gsap.utils.toArray("#all-ctr section");

    sections.forEach((section) => {
      const title = section.querySelector(`#${section.id} > h1`);
      if (section.id === "pacujalur") {
        const pacu = section.querySelector("#pacu");
        const jalur = section.querySelector("#jalur");

        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=250%",
            scrub: true,
            pin: true,
          },
        });

        tl.from(title, { y: "-100%", opacity: 0, duration: 0.6 })
          .from(pacu.querySelectorAll("div > *"), {
            y: 50,
            opacity: 0,
            stagger: 0.2,
            duration: 0.4,
          })
          .to(jalur, {
            y: `-${jalur.offsetHeight}px`,
            duration: 1,
            ease: "power2.inOut",
          })
          .from(jalur.querySelectorAll("div > *"), {
            y: 50,
            opacity: 0,
            stagger: 0.2,
            duration: 0.4,
          })
          .to(
            title,
            {
              autoAlpha: 0,
              y: "-100%",
              duration: 0.6,
            },
            "+=0.5"
          );
      }

      if (section.id === "bagian-jalur") {
        const kepala = section.querySelector("#kepala");
        const badan = section.querySelector("#badan");
        const buritan = section.querySelector("#buritan");
        const rolesCtr = section.querySelectorAll("section .roles-ctr");

        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=700%",
            scrub: true,
            pin: true,
          },
          defaults: {
            duration: 0.4,
          },
        });

        const rolesMctr = section.querySelector(".roles-m-ctr");
        const rolesKepala = kepala.querySelector(".roles-ctr");
        const rolesBadan = badan.querySelector(".roles-ctr");
        const rolesBuritan = buritan.querySelector(".roles-ctr");
        tl.from(title, { y: "-100%", opacity: 0, duration: 0.6 })
          .from(kepala.querySelectorAll(".animatee"), {
            y: 50,
            opacity: 0,
            stagger: 0.2,
          })
          .to(
            rolesKepala,
            {
              x: `-${rolesKepala.offsetWidth - rolesMctr.offsetWidth}px`,
              duration: 1,
            },
            "+=0.5"
          )
          .to(badan, {
            marginTop: `-${badan.offsetHeight}px`,
            duration: 1,
            ease: "power2.inOut",
          })
          .to(
            "#longboat",
            {
              y: "-100vh",
              ease: "power.in",
              duration: 2,
            },
            "<"
          )
          .from(badan.querySelectorAll(".animatee"), {
            y: 50,
            opacity: 0,
            stagger: 0.2,
          })
          .to(
            rolesBadan,
            {
              x: `-${rolesBadan.offsetWidth - rolesMctr.offsetWidth}px`,
              duration: 1,
            },
            "+=0.5"
          )
          .to(buritan, {
            marginTop: `-${buritan.offsetHeight}px`,
            duration: 1,
            ease: "power2.inOut",
          })
          .to(
            "#longboat",
            {
              y: "-=100vh",
              ease: "power.in",
              duration: 2,
            },
            "<"
          )
          .from(buritan.querySelectorAll(".animatee"), {
            y: 50,
            opacity: 0,
            stagger: 0.2,
          })
          .to(
            rolesBuritan,
            {
              x: `-${rolesBuritan.offsetWidth - rolesMctr.offsetWidth}px`,
              duration: 1,
            },
            "+=0.5"
          )
          .to(
            title,
            {
              autoAlpha: 0,
              y: "-100%",
              duration: 0.6,
            },
            "+=0.5"
          );
      }
    });
  }
});
