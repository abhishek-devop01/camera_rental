import Lenis from "https://unpkg.com/@studio-freight/lenis?module";
import { gsap } from "https://esm.sh/gsap";
import { ScrollTrigger } from "https://esm.sh/gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function landingPage(){
  document.addEventListener("DOMContentLoaded", () => {
    if (window.innerWidth < 900) return;
  
    const lenis = new Lenis();
    const videoContainer = document.querySelector(
      ".video-container-desktop"
    );
    const videoTitleElements = document.querySelectorAll(
      ".video-title p"
    );
  
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  
    // breakpoints with consistent prop names
    const breakpoints = [
      { maxWidth: 1000, translateY: -135, movementMultiplier: 450 },
      { maxWidth: 1100, translateY: -130, movementMultiplier: 500 },
      { maxWidth: 1200, translateY: -125, movementMultiplier: 550 },
      { maxWidth: 1300, translateY: -120, movementMultiplier: 600 },
    ];
  
    function getInitialValues() {
      const w = window.innerWidth;
      for (const bp of breakpoints) {
        if (w <= bp.maxWidth) {
          return {
            translateY: bp.translateY,
            movementMultiplier: bp.movementMultiplier,
          };
        }
      }
      return { translateY: -110, movementMultiplier: 650 };
    }
  
    const init = getInitialValues();
    const animationState = {
      scrollProgress: 0,
      initialTranslateY: init.translateY,
      currentTranslateY: init.translateY,
      movementMultiplier: init.movementMultiplier,
      scale: 0.25,
      fontSize: 80,
      gap: 2,
      targetMouseX: 0,
      currentMouseX: 0,
    };
  
    window.addEventListener("resize", () => {
      const vals = getInitialValues();
      animationState.initialTranslateY = vals.translateY;
      animationState.movementMultiplier = vals.movementMultiplier;
      if (animationState.scrollProgress === 0) {
        animationState.currentTranslateY = vals.translateY;
      }
    });
  
    // scroll-triggered timeline
    gsap.timeline({
      scrollTrigger: {
        trigger: ".intro",
        start: "top center",
        end: "top 10%",
        scrub: true,
        onUpdate(self) {
          const p = self.progress;
          animationState.scrollProgress = p;
          animationState.currentTranslateY = gsap.utils.interpolate(
            animationState.initialTranslateY,
            0,
            p
          );
          animationState.scale = gsap.utils.interpolate(0.25, 1, p);
          animationState.gap = gsap.utils.interpolate(2, 1, p);
  
          if (p <= 0.4) {
            animationState.fontSize = gsap.utils.interpolate(
              80,
              40,
              p / 0.4
            );
          } else {
            animationState.fontSize = gsap.utils.interpolate(
              40,
              20,
              (p - 0.4) / 0.6
            );
          }
        },
      },
    });
  
    document.addEventListener("mousemove", (e) => {
      animationState.targetMouseX =
        (e.clientX / window.innerWidth - 0.5) * 5;
    });
  
    const maxHorizontalMovement = 100; 
    function animate() {
      const {
        scale,
        targetMouseX,
        currentMouseX,
        currentTranslateY,
        fontSize,
        gap,
        movementMultiplier,
      } = animationState;
  
      animationState.currentMouseX = gsap.utils.interpolate(
        currentMouseX,
        targetMouseX * maxHorizontalMovement,
        0.05
      );
  
      videoContainer.style.transform =
        `translateY(${currentTranslateY}%) ` +
        `translateX(${animationState.currentMouseX}px) ` +
        `scale(${scale})`;
      videoContainer.style.gap = `${gap}em`;
  
      videoTitleElements.forEach((el) => {
        el.style.fontSize = `${fontSize}px`;
      });
  
      requestAnimationFrame(animate);
    }
    animate();
  });
  
}
landingPage();