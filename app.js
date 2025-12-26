const API_URL = "https://script.google.com/macros/s/AKfycbyfW_TpkpBrRvJLeKeZfBuCJXjKKDXiORng98GpRHMZG24kkbmJbZTr6FNS46V0Wxuv/exec";

const photos = document.getElementById("photos");
const viewer = document.getElementById("viewer");
const viewerImg = document.getElementById("viewerImg");

let items = [];
let index = 0;

/* BLOQUEO VISOR */
document.addEventListener("DOMContentLoaded", () => {
  viewer.classList.add("hidden");
});

/* CARGAR FOTOS */
fetch(API_URL)
  .then(r => r.json())
  .then(data => {
    items = data.items;

    items.forEach((f, i) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `<img src="${f.img}" onclick="openViewer(${i})">`;
      photos.appendChild(card);
    });
  });

/* VISOR */
function openViewer(i) {
  index = i;
  viewerImg.src = items[index].img;
  viewer.classList.remove("hidden");
}

function closeViewer() {
  viewer.classList.add("hidden");
}

function next() {
  index = (index + 1) % items.length;
  viewerImg.src = items[index].img;
}

function prev() {
  index = (index - 1 + items.length) % items.length;
  viewerImg.src = items[index].img;
}
