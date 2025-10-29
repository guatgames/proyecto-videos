const cards = document.querySelectorAll(".video__card");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");
const playButtons = document.querySelectorAll(".play__btn");
const videoFrames = document.querySelectorAll("iframe");

const players = [];

function onYouTubeIframeAPIReady() {
  document.querySelectorAll(".youtube-video").forEach((iframe) => {
    players.push(new YT.Player(iframe.id));
  });
}

function pauseAll() {
  players.forEach((p) => console.log(p.getVideoUrl()));
  players.forEach((p) => p.pauseVideo());
  players.forEach((p) => p.stopVideo());
}

let current = 1; // card centrada

function updateCarousel() {
  cards.forEach((card, index) => {
    const offset = index - current;
    if (offset === 0) {
      card.style.transform = "translateX(0) scale(1.1)";
      card.style.zIndex = 3;
      card.style.opacity = "1";
      card.style.boxShadow = "0 0 25px rgba(100,255,218,0.6)";
    } else if (offset === -1) {
      card.style.transform = "translateX(-250px) rotateY(25deg) scale(0.9)";
      card.style.zIndex = 2;
      card.style.opacity = "0.7";
      card.style.boxShadow = "0 0 15px rgba(0,0,0,0.4)";
    } else if (offset === 1) {
      card.style.transform = "translateX(250px) rotateY(-25deg) scale(0.9)";
      card.style.zIndex = 2;
      card.style.opacity = "0.7";
      card.style.boxShadow = "0 0 15px rgba(0,0,0,0.4)";
    } else {
      card.style.transform = "translateX(800px) scale(0.7)";
      card.style.opacity = "0";
      card.style.zIndex = 1;
    }
  });
}

next.addEventListener("click", () => {
  current = (current + 1) % cards.length;
  updateCarousel();
  pauseAll();
});

prev.addEventListener("click", () => {
  current = (current - 1 + cards.length) % cards.length;
  updateCarousel();
  pauseAll();
});

updateCarousel();
