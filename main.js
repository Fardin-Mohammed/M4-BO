let slideIndex = 0;
showSlides();

let timer = setInterval(() => {
  plusSlides(1);
}, 3000);

function plusSlides(n) {
  slideIndex += n;
  showSlides();
  resetTimer();
}

function showSlides() {
  let slides = document.getElementsByClassName("mySlides");

  if (slideIndex >= slides.length) {
    slideIndex = 0;
  }
  if (slideIndex < 0) {
    slideIndex = slides.length - 1;
  }

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slides[slideIndex].style.display = "block";
}

function resetTimer() {
  clearInterval(timer);
  timer = setInterval(() => {
    plusSlides(1);
  }, 4500);
}

