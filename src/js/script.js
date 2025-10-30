let gtk = document.querySelector("header > div > h1");
let navMenu = document.querySelector("header > div > nav");

const lenis = new Lenis({
  // Value between 0 and 1. Lower value = smoother scroll.
  lerp: 0.05,
  // Multiplier for the mouse wheel. Higher value = faster scrolling.
  wheelMultiplier: 1,
  // Set to true to enable infinite scrolling.
  infinite: false,
});

// From the GSAP Forum

function getScrollPosition(animation, progress) {
  let p = gsap.utils.clamp(0, 1, progress || 0),
    nested = !animation.scrollTrigger,
    st = nested ? animation.parent.scrollTrigger : animation.scrollTrigger,
    containerAnimation = st.vars.containerAnimation,
    range = st.end - st.start,
    position = st.start + range * p;
  if (containerAnimation) {
    st = containerAnimation.scrollTrigger;
    return (
      st.start +
      (st.end - st.start) * (position / containerAnimation.duration())
    );
  } else if (nested) {
    let start =
        st.start +
        (animation.startTime() / animation.parent.duration()) * range,
      end =
        st.start +
        ((animation.startTime() + animation.duration()) /
          animation.parent.duration()) *
          range;
    return start + (end - start) * p;
  }
  return position;
}

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

const scrollKe = (sectionId) => {
  const st = ScrollTrigger.getById(sectionId);

  if (st) {
    lenis.scrollTo(st.start, {
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  } else {
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      lenis.scrollTo(targetElement, { duration: 1.2 });
    }
  }
};

function shareContent() {
  // Periksa apakah browser mendukung Web Share API?
  if (navigator.share) {
    navigator
      .share({
        title: document.title,
        text: "Find out where the 'Aura Farming' trend comes from!",
        url: window.location.href,
      })
      .then(() => console.log("Thanks for sharing!"))
      .catch((error) => console.error("Failed to share:", error));
  } else {
    alert(
      "Web Share API is not supported in this browser.. Try to copy the URL manually!."
    );
  }
}

lenis.stop();
const loadingScreen = document.getElementById("loader");
const loadingPa = loadingScreen.querySelectorAll("h1")[0];
const loadingWe = loadingScreen.querySelectorAll("h1")[1];
const loadingLur = loadingScreen.querySelectorAll("h1")[2];
const loadingText = loadingScreen.querySelectorAll("h1")[3];
gsap.set(loadingPa, { y: "50%" });
gsap.set(loadingWe, { opacity: 0 });
gsap.set(loadingLur, { y: "-50%" });

const loaderTextAnim = gsap.fromTo(
  loadingText,
  { opacity: "10%" },
  {
    opacity: "50%",
    yoyo: true,
    duration: 1,
    repeat: "-1",
  }
);
window.addEventListener("load", function () {
  // Hide the loading screen after looooadded
  gsap
    .timeline({
      defaults: {
        duration: 0.2,
        ease: "power1.in",
      },
    })
    .to(loadingPa, {
      y: "0",
    })
    .to(
      loadingLur,
      {
        y: "0",
      },
      "<"
    )
    .to(loadingWe, { opacity: 1 })
    .call(() => {
      loaderTextAnim.kill();
    })
    .to(
      loadingScreen,
      {
        y: `-${loadingScreen.offsetHeight}px`,
        duration: 1.5,
        ease: "power1.out",
      },
      "+=1"
    )
    .to(loadingScreen, { display: "none" });
  lenis.start();
});

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);
  gsap.to("#explore-btn", {
    y: "20px",
    duration: 0.8,
    repeat: "-1",
    yoyo: true,
    ease: "power1.inOut",
  });

  if (window.innerWidth > 1280) {
    const tlNav = gsap
      .timeline({
        defaults: { ease: "power3.inOut", duration: 0.3 },
        scrollTrigger: {
          trigger: "body",
          start: "top+=50 top",
          toggleActions: "",
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

    let isHidden = false;
    window.addEventListener("scroll", (e) => {
      if (window.scrollY > 50) {
        if (!isHidden) {
          tlNav.play();
          isHidden = true;
        }
      } else {
        if (isHidden) {
          tlNav.reverse();
          isHidden = false;
        }
      }
    });

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    const allCtr = document.querySelector("#all-ctr");
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
            id: "pacujalur",
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
            y: () => `-${jalur.offsetHeight}px`,
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
        const jalurCtr = section.querySelector("#jalur-ctr");
        const kepala = section.querySelector("#kepala");
        const badan = section.querySelector("#badan");
        const buritan = section.querySelector("#buritan");

        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: `+=${jalurCtr.clientHeight + window.innerHeight}px`,
            scrub: true,
            pin: true,
            id: "bagianjalur",
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
              duration: 3,
            },
            "+=0.5"
          )
          .to(badan, {
            marginTop: () => `-${badan.offsetHeight}px`,
            duration: 3,
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
              duration: 3,
            },
            "+=0.5"
          )
          .to(buritan, {
            marginTop: () => `-${buritan.offsetHeight}px`,
            duration: 3,
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
              duration: 3,
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

      if (section.id === "references") {
        const refCtr = section.querySelector("#ref-ctr");
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=200%",
            scrub: true,
            pin: true,
            id: "references",
          },
          defaults: {
            duration: 4,
          },
        });

        tl.from(title, { autoAlpha: 0, rotate: 180 }).to(refCtr, {
          x: `-${refCtr.offsetWidth - allCtr.offsetWidth}px`,
          duration: 3,
        });
      }
    });
  }
});
