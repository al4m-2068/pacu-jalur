let lastPoint = 0;
let hidePoint = 20;
let navBar = document.querySelector("header > div > h1");
document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger);
  // header animation
  if (window.innerWidth > 1280) {
    const sections = gsap.utils.toArray("#pages-ctr section");
    window.addEventListener("scroll", () => {
      const crtScroll = window.scrollY;
      if (crtScroll <= hidePoint) {
        gsap.to(navBar, {
          y: 0,
          x: 0,
          duration: 0.2,
        });
      } else if (crtScroll > lastPoint) {
        gsap.to(navBar, {
          y: "-250%",
          duration: 0.2,
        });
      }
      lastPoint = crtScroll;
    });
    // Arti Nama
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#all-ctr",
        pin: true,
        start: "top top",
        end: "+=300%",
        scrub: true,
        markers: true, //debug mode
      },
    });
    let jalur = document.getElementById("jalur");
    tl.to("#pages-ctr", {
      y: "-100vh",
      duration: 5,
    })
      .from("#pacujalur > h1", {
        opacity: 0,
      })
      .from(
        "#pacu > div > h2, #pacu > div > p",
        {
          opacity: 0,
          stagger: 1,
          duration: 3,
        },
        "+=0.5"
      )
      .to(
        "#jalur",
        {
          y: `-${jalur.offsetHeight}px`, // Geser elemen #jalur ke atas
          ease: "power1.out",
          duration: 3,
        },
        "+=4"
      )
      .from(
        "#jalur > div > h2, #jalur > div > p",
        {
          opacity: 0,
          stagger: 0.5,
          duration: 2,
        },
        "+=0.5"
      )
      .to("#bagian-jalur", {
        y: "-100vh",
        duration: 5,
      })
      .to("#badan", {
        y: `-${document.getElementById("badan").offsetHeight}px`,
        duration: 5,
      });
  }
});
