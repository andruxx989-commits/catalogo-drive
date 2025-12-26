const API_URL = "https://script.google.com/macros/s/AKfycbyfW_TpkpBrRvJLeKeZfBuCJXjKKDXiORng98GpRHMZG24kkbmJbZTr6FNS46V0Wxuv/exec";

const photos = document.getElementById("photos");
const albumModal = document.getElementById("albumModal");
const albumList = document.getElementById("albumList");
const openAlbums = document.getElementById("openAlbums");
const closeModal = document.getElementById("closeModal");

const viewer = document.getElementById("viewer");
const viewerImg = document.getElementById("viewerImg");

let allPhotos = [];
let current = [];
let index = 0;

/* 🚫 ASEGURAR VISOR OCULTO */
document.addEventListener("DOMContentLoaded", () => {
  viewer.classList.add("hidden");
});

/* MODAL */
openAlbums.onclick = () => albumModal.classList.remove("hidden");
closeModal.onclick = () => albumModal.classList.add("hidden");

/* CARGAR DATA */
fetch(API_URL)
  .then(r => r.json())
  .then(data => {
    allPhotos = data.items;

    const albums = [...new Set(
      allPhotos.map(f => f.nombre.split("_")[0])
    )];

    albumList.innerHTML = "";
    albums.forEach(a => {
      const div = document.createElement("div");
      div.className = "album-item";
      div.textContent = a;
      div.onclick = () => openAlbum(a);
      albumList.appendChild(div);
    });
  });

/* ABRIR ÁLBUM */
function openAlbum(name) {
  albumModal.classList.add("hidden");
  photos.innerHTML = "";

  current = allPhotos.filter(f =>
    f.nombre.startsWith(name + "_")
  );

  current.forEach((f, i) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<img src="${f.img}" onclick="openViewer(${i})">`;
    photos.appendChild(card);
  });
}

/* VISOR */
function openViewer(i) {
  index = i;
  viewerImg.src = current[index].img;
  viewer.classList.remove("hidden");
}

function closeViewer() {
  viewer.classList.add("hidden");
}

function next() {
  index = (index + 1) % current.length;
  viewerImg.src = current[index].img;
}

function prev() {
  index = (index - 1 + current.length) % current.length;
  viewerImg.src = current[index].img;
}
