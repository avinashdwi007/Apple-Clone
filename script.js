function locoMotiveAnimation(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});



// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
locoMotiveAnimation();

// var swiper = new Swiper(".mySwiper", {
//   effect: "coverflow",
//   grabCursor: true,
//   centeredSlides: true,
//   slidesPerView: "auto",
//   coverflowEffect: {
//     rotate: 10,
//     stretch: 0,
//     depth: 100,
//     modifier: 1,
//     slideShadows: false,
//   },
//   pagination: {
//     el: ".swiper-pagination",
//   },
// });

// const _C = document.querySelector(".container");
// const N = _C.children.length;
// _C.style.setProperty("--n", N);

// let i = 0;
// let x0 = null,
//    started = false;

// // touch
// function unify(e) {
//    return e.changedTouches ? e.changedTouches[0] : e;
// }

// // start
// function start(e) {
//    x0 = unify(e).clientX;
//    _C.classList.toggle("smooth", !(started = true));
//    _C.addEventListener("mousemove", drag);
//    _C.addEventListener("touchmove", drag);
// }

// //
// function drag(e) {
//    if (started)
//       _C.style.setProperty("--tx", `${Math.round(unify(e).clientX - x0)}px`);
//    _C.addEventListener("mouseup", move);
//    _C.addEventListener("touchend", move);
// }

// //
// function move(e) {
//    if (started) {
//       let s = Math.sign(unify(e).clientX - x0);
//       if ((i > 0 || s < 0) && (i < N - 1 || s > 0)) {
//          _C.style.setProperty("--i", (i -= s));
//       }
//       _C.style.setProperty("--tx", "0px");
//       _C.classList.toggle("smooth", !(started = false));
//    }
// }

// //
// _C.addEventListener("mousedown", start);
// _C.addEventListener("touchstart", start);


var swiper = new Swiper(".mySwiper", {
   spaceBetween: 30,
   centeredSlides: true,
   autoplay: {
     delay: 2500,
     disableOnInteraction: false,
   },
   pagination: {
     el: ".swiper-pagination",
     clickable: true,
   },
   navigation: {
     nextEl: ".swiper-button-next",
     prevEl: ".swiper-button-prev",
   },
 });