"use strict";

const slider = function () {
  // Selecting Elements
  const btnNext = document.querySelector(".brand__btn-right");
  const btnPrev = document.querySelector(".brand__btn-left");
  const brand = document.querySelectorAll(".brand");
  const imgBox = document.querySelectorAll(".brand__img-box");
  const brandTitle = document.querySelectorAll(".brand__title-box");
  let contSlide = 0;
  let indexTesti = brand.length - 1;

  const returnSlide = function (index) {
    brand[contSlide].style.opacity = 0;
    contSlide = index;
    brand[contSlide].style.opacity = 1;
  };

  const removeAnimationImg = function (img1, img2) {
    imgBox.forEach((img) => {
      img.classList.remove(img1);
      img.classList.remove(img2);
    });
  };

  const removeAnimationTitle = function (title, title2) {
    brandTitle.forEach((brand) => {
      brand.classList.remove(title);
      brand.classList.remove(title2);
    });
  };

  const init = function () {
    removeAnimationImg("animation-img", "animation-img2");
    removeAnimationTitle("animation-title", "animation-title2");
    removeAnimationImg("animation-img", "animation-img2");
    removeAnimationTitle("animation-title", "animation-title2");
  };

  // Logic for next
  const nextSlide = function () {
    if (contSlide !== indexTesti) {
      brand[contSlide + 1].previousElementSibling.style.opacity = 0;
      brand[contSlide + 1].style.opacity = 1;

      init();

      imgBox[contSlide + 1].classList.add("animation-img");
      brandTitle[contSlide + 1].classList.add("animation-title");

      contSlide += 1;
    } else {
      returnSlide(0);

      init();
      imgBox[0].classList.add("animation-img");
      brandTitle[0].classList.add("animation-title");
    }
  };

  // Logic to go previous
  const prevSlide = function () {
    if (contSlide <= indexTesti && contSlide !== 0) {
      brand[contSlide - 1].style.opacity = 1;
      brand[contSlide].style.opacity = 0;

      init();

      imgBox[contSlide - 1].classList.add("animation-img2");
      brandTitle[contSlide - 1].classList.add("animation-title2");

      contSlide -= 1;
    } else {
      returnSlide(indexTesti);

      init();

      imgBox[indexTesti].classList.add("animation-img2");
      brandTitle[indexTesti].classList.add("animation-title2");
    }
  };

  btnNext.addEventListener("click", nextSlide);
  btnPrev.addEventListener("click", prevSlide);

  // Slide with keydown
  document.addEventListener("keydown", function (e) {
    e.key === "ArrowRight" && nextSlide();
    e.key === "ArrowLeft" && prevSlide();
  });
};
slider();

const allSection = document.querySelectorAll(".section");

const obsSec = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  else entry.target.classList.remove("section--hidden");

  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(obsSec, {
  root: null,
  threshold: 0.15,
});

allSection.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

const nav = document.querySelector(".nav");

nav.addEventListener("mouseover", function (e) {
  const clicked = e.target.closest(".nav__link");

  if (!clicked) return;

  if (clicked.classList.contains("nav__link")) {
    const link = e.target;
    const sibling = document.querySelectorAll(".nav__link");
    const logo = nav.closest(".header-box").querySelector(".header__logo");

    sibling.forEach((el) => {
      if (el !== link) el.style.opacity = 0.5;
      // if (el !== link) el.style.transform = "translateY(-5px)";
    });
    logo.style.opacity = 0.5;
  }
});

nav.addEventListener("mouseout", function (e) {
  const clicked = e.target.closest(".nav__link");

  if (!clicked) return;

  if (clicked.classList.contains("nav__link")) {
    const link = e.target;
    const sibling = document.querySelectorAll(".nav__link");
    const logo = nav.closest(".header-box").querySelector(".header__logo");

    sibling.forEach((el) => {
      if (el !== link) el.style.opacity = 1;
      // if (el !== link) el.style.transform = "translateY(0px)";
    });
    logo.style.opacity = 1;
  }
});
