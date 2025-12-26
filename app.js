const API_URL = "https://script.google.com/macros/s/AKfycbyfW_TpkpBrRvJLeKeZfBuCJXjKKDXiORng98GpRHMZG24kkbmJbZTr6FNS46V0Wxuv/exec";

const albumsContainer = document.getElementById("albums");
const photosContainer = document.getElementById("photos");
const subtitle = document.getElementById("subtitle");
const backBtn = document.getElementById("backBtn");
const viewer = document.getElementById("viewer");
const viewerImg = document.getElementById("viewerImg");

let photos = [];
let currentIndex = 0;

/* ===== CARGAR DATOS ===== */
fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    photos = data.items;
    renderAlbum();
  });

/* ===== MOSTRAR ÁLBUM ÚNICO ===== */
function renderAlbum() {
  albumsContainer.innerHTML = "";
  albumsContainer.classList.remove("hidden");
  photosContainer.classList.add("hidden");
  backBtn.style.display = "none";

  subtitle.textContent = "Selecciona un álbum";

  const card = document.createElement("div");
  card.className = "card";

  const img = document.createElement("img");
  img.src = photos[0].img;
  img.alt = "Catálogo";

  img.onclick = openAlbum;

  card.appendChild(img);
  albumsContainer.appendChild(card);
}

/* ===== ABRIR ÁLBUM ===== */
function openAlbum() {
  albumsContainer.classList.add("hidden");
  photosContainer.classList.remove("hidden");
  backBtn.style.display = "inline-block";

  subtitle.textContent = "Catálogo";

  photosContainer.innerHTML = "";

  let i = 0;
  function loadNext() {
    if (i >= photos.length) return;

    const card = document.createElement("div");
    card.className = "card";

    const img = document.createElement("img");
    img.loading = "lazy";
    img.src = photos[i].img;
    img.alt = photos[i].nombre;

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
  renderAlbum();
}

/* ===== VISOR ===== */
function openViewer(index) {
  currentIndex = index;
  viewerImg.src = photos[index].img;
  viewer.classList.remove("hidden");
}

function closeViewer() {
  viewer.classList.add("hidden");
}

function nextImage() {
  currentIndex = (currentIndex + 1) % photos.length;
  viewerImg.src = photos[currentIndex].img;
}

function prevImage() {
  currentIndex = (currentIndex - 1 + photos.length) % photos.length;
  viewerImg.src = photos[currentIndex].img;
}
