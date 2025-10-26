let lastPoint = 0;
let hidePoint = 20;
let navBar = document.querySelector("header > h1");
document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger);
  // header animation
  if (window.innerWidth > 1024) {
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
        trigger: "#pacujalur",
        pin: true,
        start: "top top",
        end: "+=400%",
        scrub: true,
        markers: true, //debug mode
      },
    });
    tl.from("#pacujalur > h1", {
      opacity: 0,
      duration: 3,
    })
      .from(
        "#pacu > div > h2, #pacu > div > p",
        {
          opacity: 0,
          stagger: 0.2,
          duration: 2,
        },
        "+=1.5"
      )
      .to(
        "#jalur",
        {
          y: "-100vh", // Geser elemen #jalur ke atas
          ease: "power1.out",
          duration: 3,
        },
        "+=2"
      )
      .from(
        "#jalur > div > h2, #jalur > div > p",
        {
          opacity: 0,
          stagger: 0.5,
          duration: 2,
        },
        "+=1.5"
      );
  }
});
