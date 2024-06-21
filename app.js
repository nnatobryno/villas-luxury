const list = document.querySelector(".gallery-carousel__img-container--list");
const imgs = Array.from(list.children);
const nextButton = document.querySelector(".gallery-carousel__btn--right");
const prevButton = document.querySelector(".gallery-carousel__btn--left");
const carouselNav = document.querySelector(".gallery-carousel__nav");
const dots = Array.from(carouselNav.children);

// Getting the width of our images
const imgWidth = imgs[0].getBoundingClientRect().width;
console.log(imgWidth);
// arranging our images next to one another

// imgs[0].style.left = 0;
// imgs[1].style.left = 100 + "px";

imgs.forEach((img, index) => {
  img.style.left = imgWidth * index + "px";
});

const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove("current--img");
  targetDot.classList.add("current--img");
};

const hideShowArrows = (imgs, prevButton, nextButton, targetIndex) => {
  if (targetIndex === 0) {
    prevButton.classList.add("hidden");
    nextButton.classList.remove("hidden");
  } else if (targetIndex === imgs.length - 1) {
    prevButton.classList.remove("hidden");
    nextButton.classList.add("hidden");
  } else {
    prevButton.classList.remove("hidden");
    nextButton.classList.remove("hidden");
  }
};

nextButton.addEventListener("click", (e) => {
  const currentImg = list.querySelector(".current--img");
  const nextImg = currentImg.nextElementSibling;
  const distToMove = nextImg.style.left;
  const currentDot = carouselNav.querySelector(".current--img");
  const nextDot = currentDot.nextElementSibling;
  const nextIndex = imgs.findIndex((img) => img === nextImg);

  list.style.transform = "translateX(-" + distToMove + ")";
  currentImg.classList.remove("current--img");
  nextImg.classList.add("current--img");
  updateDots(currentDot, nextDot);
  hideShowArrows(imgs, prevButton, nextButton, nextIndex);
});

prevButton.addEventListener("click", (e) => {
  const currentImg = list.querySelector(".current--img");
  const prevImg = currentImg.previousElementSibling;
  const distToMove = prevImg.style.left;
  const currentDot = carouselNav.querySelector(".current--img");
  const prevDot = currentDot.previousElementSibling;
  const prevIndex = imgs.findIndex((img) => img === prevImg);

  list.style.transform = "translateX(-" + distToMove + ")";
  currentImg.classList.remove("current--img");
  prevImg.classList.add("current--img");
  updateDots(currentDot, prevDot);
  hideShowArrows(imgs, prevButton, nextButton, prevIndex);
});

carouselNav.addEventListener("click", (e) => {
  const targetDot = e.target.closest("button");
  if (!targetDot) return;
  const currentImg = list.querySelector(".current--img");
  const currentDot = carouselNav.querySelector(".current--img");
  const targetIndex = dots.findIndex((dot) => dot === targetDot);
  const targetImg = imgs[targetIndex];
  const distToMove = targetImg.style.left;
  list.style.transform = "translateX(-" + distToMove + ")";
  updateDots(currentDot, targetDot);
  hideShowArrows(imgs, prevButton, nextButton, targetIndex);
});
