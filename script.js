gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", function(){
     const cards = [
          {
               id: "#card-1",
               endTranslateX: 1100,
               rotate:-15
          },
          {
               id: "#card-2",
               endTranslateX: -800,
               rotate:-10
          },
          {
               id: "#card-3",
               endTranslateX: -100,
               rotate:-15
          },
          {
               id: "#card-4",
               endTranslateX: -500,
               rotate:-10
          },
     ];

     ScrollTrigger.create({
          trigger: ".wrapper-404",
          start: "top top",
          end: "+=900vh",
          scrub: 1,
          pin: true,
          onUpdate: (self) => {
               gsap.to(".wrapper-404",{
                    x: `${-350 * self.progress}vw`,
                    duration: 0.5,
                    ease: "power3.out",
               });
          },
     });

     cards.forEach((card) => {
          ScrollTrigger.create({
               trigger: "card.id",
               start: "top top",
               end: "+=1200vh",
               scrub: 1,
               onUpdate: (self) => {
                    gsap.to(card.id, {
                         x: `${card.endTranslateX * self.progress}px`,
                         rotate: `${card.rotate * self.progress * 2}`,
                         duration: 0.5,
                         ease: "power3.out",
                    });
               },
          });
     });
})