const cards = document.querySelectorAll(".video__card");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");
const playButtons = document.querySelectorAll(".play__btn");
const videoFrames = document.querySelectorAll("iframe");

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement("script");

tag.src = "https://www.youtube.com/iframe_api";
tag.async = true;
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player("video", {
    height: "480",
    width: "270",
    videoId: "M7lc1UVf-VE",
    playerVars: {
      playsinline: 1,
      origin: "https://guatgames.github.io",
      enablejaspi: 1,
    },
    events: {
      onReady: onPlayerReady,
      //onStateChange: onPlayerStateChange,
    },
  });
}
onYouTubeIframeAPIReady();
// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
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
  //pauseAll();
});

prev.addEventListener("click", () => {
  current = (current - 1 + cards.length) % cards.length;
  updateCarousel();
  //pauseAll();
});

updateCarousel();
