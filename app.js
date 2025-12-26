const API_URL = "https://script.google.com/macros/s/AKfycbyfW_TpkpBrRvJLeKeZfBuCJXjKKDXiORng98GpRHMZG24kkbmJbZTr6FNS46V0Wxuv/exec";

const albumsContainer = document.getElementById("albums");
const photosContainer = document.getElementById("photos");
const subtitle = document.getElementById("subtitle");
const backBtn = document.getElementById("backBtn");
const viewer = document.getElementById("viewer");
const viewerImg = document.getElementById("viewerImg");

let albums = {};
let currentPhotos = [];
let currentIndex = 0;

/* ===== CARGAR DATOS ===== */
fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    buildAlbums(data.items);
  });

/* ===== AGRUPAR POR ÁLBUM ===== */
function buildAlbums(items) {
  albums = {};

  items.forEach(item => {
    const album = item.album || "Catálogo";

    if (!albums[album]) {
      albums[album] = [];
    }

    albums[album].push(item);
  });

  renderAlbums();
}

/* ===== MOSTRAR ÁLBUMES ===== */
function renderAlbums() {
  albumsContainer.innerHTML = "";
  albumsContainer.classList.remove("hidden");
  photosContainer.classList.add("hidden");
  backBtn.style.display = "none";

  subtitle.textContent = "Selecciona un álbum";

  Object.keys(albums).forEach(name => {
    const card = document.createElement("div");
    card.className = "card";

    const img = document.createElement("img");
    img.src = albums[name][0].img;
    img.alt = name;

    img.onclick = () => openAlbum(name);

    card.appendChild(img);
    albumsContainer.appendChild(card);
  });
}

/* ===== ABRIR ÁLBUM ===== */
function openAlbum(name) {
  currentPhotos = albums[name];
  photosContainer.innerHTML = "";

  albumsContainer.classList.add("hidden");
  photosContainer.classList.remove("hidden");
  backBtn.style.display = "inline-block";

  subtitle.textContent = name;

  let i = 0;

  function loadNext() {
    if (i >= currentPhotos.length) return;

    const card = document.createElement("div");
    card.className = "card";

    const img = document.createElement("img");
    img.loading = "lazy";
    img.src = currentPhotos[i].img;
    img.alt = currentPhotos[i].nombre;

    const index = i;
    img.onclick = () => openViewer(index);

    card.appendChild(img);
    photosContainer.appendChild(card);

    i++;
    setTimeout(loadNext, 120);
  }

  loadNext();
}

/* ===== BOTÓN ATRÁS ===== */
function goBack() {
  renderAlbums();
}

/* ===== VISOR ===== */
function openViewer(index) {
  currentIndex = index;
  viewerImg.src = currentPhotos[index].img;
  viewer.classList.remove("hidden");
}

function closeViewer() {
  viewer.classList.add("hidden");
}

function nextImage() {
  currentIndex = (currentIndex + 1) % currentPhotos.length;
  viewerImg.src = currentPhotos[currentIndex].img;
}

function prevImage() {
  currentIndex =
    (currentIndex - 1 + currentPhotos.length) % currentPhotos.length;
  viewerImg.src = currentPhotos[currentIndex].img;
}
