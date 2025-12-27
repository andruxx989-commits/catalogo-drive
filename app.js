const API_URL = "https://script.google.com/macros/s/AKfycbyfW_TpkpBrRvJLeKeZfBuCJXjKKDXiORng98GpRHMZG24kkbmJbZTr6FNS46V0Wxuv/exec";

const albumsDiv = document.getElementById("albums");
const photosDiv = document.getElementById("photos");
const subtitle = document.getElementById("subtitle");
const backBtn = document.getElementById("backBtn");

const viewer = document.getElementById("viewer");
const viewerImg = document.getElementById("viewerImg");

let dataGlobal = [];
let currentImages = [];
let currentIndex = 0;

fetch(API_URL)
  .then(r => r.json())
  .then(data => {
    dataGlobal = data;
    renderAlbums();
  });

function renderAlbums() {
  albumsDiv.innerHTML = "";
  photosDiv.classList.add("hidden");
  albumsDiv.classList.remove("hidden");

  subtitle.textContent = "Selecciona un álbum";
  backBtn.classList.add("hidden");
  
  // Ajustar alineación del título cuando no hay botón
  subtitle.style.textAlign = "center";
  subtitle.style.paddingLeft = "0";

  dataGlobal.forEach(album => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${album.portada}">
      <div class="info">${album.album}</div>
    `;
    card.onclick = () => openAlbum(album);
    albumsDiv.appendChild(card);
  });
}

function openAlbum(album) {
  albumsDiv.classList.add("hidden");
  photosDiv.classList.remove("hidden");
  photosDiv.innerHTML = "";

  subtitle.textContent = album.album;
  backBtn.classList.remove("hidden");
  
  // Ajustar alineación del título cuando hay botón
  subtitle.style.textAlign = "left";
  subtitle.style.paddingLeft = "40px";

  currentImages = album.items;

  album.items.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${item.img}">
      <div class="info">${item.nombre}</div>
    `;
    card.onclick = () => openViewer(index);
    photosDiv.appendChild(card);
  });
}

function goBack() {
  renderAlbums();
}

/* ===== VISOR ===== */

function openViewer(index) {
  currentIndex = index;
  viewerImg.src = currentImages[currentIndex].img;
  viewer.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeViewer() {
  viewer.classList.add("hidden");
  document.body.style.overflow = "auto";
}

function nextImage() {
  currentIndex = (currentIndex + 1) % currentImages.length;
  viewerImg.src = currentImages[currentIndex].img;
}

function prevImage() {
  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
  viewerImg.src = currentImages[currentIndex].img;
}

// Manejar teclas en el visor
document.addEventListener('keydown', (e) => {
  if (!viewer.classList.contains('hidden')) {
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'Escape') closeViewer();
  }
});
