const teamPhotos = [
  "./img/main/team/photo_1.jpg",
  "./img/main/team/photo_2.jpg",
  "./img/main/team/photo_3.jpg",
  "./img/main/team/photo_4.jpg",
  "./img/main/team/photo_5.jpg",
  "./img/main/team/photo_6.jpg",
  "./img/main/team/photo_7.jpg",
  "./img/main/team/photo_8.jpg",
  "./img/main/team/photo_9.jpg",
];

let currentSlide = 0;

function buildSlider() {
  const track = document.querySelector(".team__slider-track");
  const dotsContainer = document.querySelector(".team__dots");

  if (!track || !dotsContainer) return;

  track.innerHTML = "";
  dotsContainer.innerHTML = "";

  teamPhotos.forEach((photo, index) => {
    const slide = document.createElement("div");
    slide.className = "team__slide";
    slide.innerHTML = `
      <img src="${photo}" alt="Фото команды ${index + 1}" class="team__slide-img">
    `;
    track.appendChild(slide);

    const dot = document.createElement("div");
    dot.className = `team__dot${index === 0 ? " active" : ""}`;
    dot.addEventListener("click", () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  updateSliderPosition();
}

function updateSliderPosition() {
  const track = document.querySelector(".team__slider-track");
  if (!track) return;

  const slideWidth = track.parentElement.clientWidth;
  track.style.transform = `translateX(-${currentSlide * slideWidth}px)`;

  const dots = document.querySelectorAll(".team__dot");
  dots.forEach((dot, index) => {
    if (index === currentSlide) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}

function goToSlide(index) {
  const slides = document.querySelectorAll(".team__slide");
  if (!slides.length) return;

  if (index < 0) {
    currentSlide = slides.length - 1;
  } else if (index >= slides.length) {
    currentSlide = 0;
  } else {
    currentSlide = index;
  }

  updateSliderPosition();
}

function nextSlide() {
  goToSlide(currentSlide + 1);
}

function prevSlide() {
  goToSlide(currentSlide - 1);
}

function handleResize() {
  updateSliderPosition();
}

document.addEventListener("DOMContentLoaded", () => {
  buildSlider();

  const prevBtn = document.querySelector(".team__slider-btn--prev");
  const nextBtn = document.querySelector(".team__slider-btn--next");

  if (prevBtn) prevBtn.addEventListener("click", prevSlide);
  if (nextBtn) nextBtn.addEventListener("click", nextSlide);

  window.addEventListener("resize", handleResize);
});
