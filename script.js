function show() {
  gsap.registerPlugin(ScrollTrigger);


  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
    getDirection: true
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);
  locoScroll.on('scroll', function (dets) {

    if (dets.direction === "up" || dets.direction === null) {
      document.querySelector('nav').style.top = "0%";
    }

    else {
      document.querySelector('nav').style.top = "-100%";

    }

  })

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
  });



  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();

}




function ani() {
  gsap.from(".animate-up", {
    y: '100%',
    duration: 1,
    autoAlpha: 0,



  })
}


function pg2() {
  gsap.to('.hero-text-wrapper', {
    scrollTrigger: {
      trigger: ".hero-text-wrapper",
      scroller: "#main",
      start: "top 10%",
      // markers: true,
      scrub: true,

    },

    marginTop: '-20vh',
    marginBottom: '20vh'
  })
}

function horizontalScrollProducts() {

  let sections = gsap.utils.toArray(".slide");

  gsap.to(sections, {
    xPercent: 100 * (sections.length - 4.5),
    ease: "none",
    scrollTrigger: {
      trigger: "#page2",
      scroller: '#main',
      start: 'top top',
      pin: true,
      scrub: 1,
      // markers:true,
      snap: 1 / (sections.length - 1),
      end: () => "+=" + document.querySelector(".slides-container").offsetWidth,
    }
  });
}

function scrollTextUp() {
  gsap.from('.animate-up-scroll', {
    scrollTrigger: {
      trigger: ".animate-up-scroll",
      scroller: "#main",
      start: "top 70%",
      end: "50% 50%",
      // markers: true,
      scrub: true,

    },
    y: '100%',
    autoAlpha: 0,
    stagger: .4


  })
}

function videoScale() {
  gsap.to('.video-container', {
    scrollTrigger: {
      trigger: ".video-container",
      scroller: "#main",
      start: "top 70%",
      end: "50% 50%",
      // markers: true,
      scrub: true,

    },


    width: '100vw',
    height: '100vh',
    top: '95vh'

  })
}

function scrollTextAnimation() {
  var RightJayega = document.querySelectorAll(".right-jayega");
  var LeftJayega = document.querySelectorAll(".left-jayega");


  for (let i = 0; i < RightJayega.length; i++) {

    gsap.from(RightJayega[i], {

      scrollTrigger: {
        trigger: RightJayega[i],
        scroller: "#main",
        scrub: true,
      },
      x: '20vw',

    })
  }

  for (let i = 0; i < LeftJayega.length; i++) {

    gsap.from(LeftJayega[i], {

      scrollTrigger: {
        trigger: LeftJayega[i],
        scroller: "#main",
        scrub: true,
      },
      x: '-30vw',

    })

  }



}

function imageMovementCursor() {
  let mainElem = document.querySelectorAll('.hoveredImage ')
  let images = document.querySelectorAll('.hoveredImage div img')




  for (let i = 0; i < mainElem.length; i++) {
    mainElem[i].addEventListener('mousemove', function (e) {

      let rowHovered = mainElem[i].closest('.row')

      let dimensions = rowHovered.getBoundingClientRect()

      let targetRowvalue = rowHovered.dataset.value

      images[i].style.display = 'initial'


      let top = `${(200 + targetRowvalue * dimensions.height) - e.clientY}px`

      images[i].style.top = top

      images[i].style.left = `${650 - e.clientX}px`


    })

    mainElem[i].addEventListener('mouseleave', function () {
      images[i].style.display = 'none'



    })
  }
}

function imagesAnimation() {


  gsap.to('.big-img-cont img', {

    scrollTrigger: {
      trigger: '.big-img-cont img',
      scroller: "#main",
      scrub: true,
      // markers: true,
    },

    width: '100%'

  })

  let imageCard = document.querySelectorAll('.image-card')

  for (let i = 0; i < imageCard.length; i++) {
    gsap.to(imageCard[i], {

      scrollTrigger: {
        trigger: imageCard[i],
        scroller: "#main",
        scrub: true,
        // markers: true,
      },
  
      marginTop:'-20vh',

  
    })
  }




}






if (window.innerWidth <= 500) {
  //load mobile script
  show()

}
else {
  show()
ani()
pg2() 
horizontalScrollProducts()
scrollTextUp()
videoScale()
scrollTextAnimation()
imageMovementCursor()
imagesAnimation()
}