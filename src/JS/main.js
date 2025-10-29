const cards = document.querySelectorAll(".video__card");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");
const playButtons = document.querySelectorAll(".play__btn");
const videoFrames = document.querySelectorAll("iframe");

// 2. This code loads the IFrame Player API code asynchronously.
let tag = document.createElement("script");

tag.src = "https://www.youtube.com/iframe_api";
tag.async = true;
let firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let players = [];
let ids = ["Hur6-RNIsQ4","SXxp4QDxh4c"];
let player;

function onYouTubeIframeAPIReady() {
  
  ids.forEach((id, index) => {
    player = new YT.Player("video" + (index+1), {
      height: "270",
      width: "480",
      videoId: id,
      playerlets: {
        'playsinline': 1,
        'origin': 'https://guatgames.github.io',
        'enablejaspi': 1,
      },
      events: {
        'onReady': onPlayerReady,
        //onStateChange: onPlayerStateChange,
      },
    });

    players.push(player);
});

}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  //event.target.playVideo();
  console.log("Player ready");
}

const pauseAll = () => {
  players.forEach((player) => {
    player.pauseVideo();
  });
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
