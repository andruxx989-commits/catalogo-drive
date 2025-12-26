const API_URL = "https://script.google.com/macros/s/AKfycbyfW_TpkpBrRvJLeKeZfBuCJXjKKDXiORng98GpRHMZG24kkbmJbZTr6FNS46V0Wxuv/exec";

const albumsContainer = document.getElementById("albums");
const photosContainer = document.getElementById("photos");
const subtitle = document.getElementById("subtitle");
const backBtn = document.getElementById("backBtn");
const viewer = document.getElementById("viewer");
const viewerImg = document.getElementById("viewerImg");

let currentPhotos = [];
let currentIndex = 0;

/* ===== CARGAR CATÁLOGO ===== */
fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    renderAlbum("Catálogo", data.items);
  });

/* ===== RENDER ÁLBUM ===== */
function renderAlbum(name, items) {
  albumsContainer.innerHTML = "";

  const card = document.createElement("div");
  card.className = "card";

  const img = document.createElement("img");
  img.src = items[0].img;
  img.alt = name;

  img.onclick = () => openAlbum(items);

  card.appendChild(img);
  albumsContainer.appendChild(card);
}

/* ===== ABRIR ÁLBUM ===== */
function openAlbum(items) {
  currentPhotos = items;
  photosContainer.innerHTML = "";

  albumsContainer.classList.add("hidden");
  photosContainer.classList.remove("hidden");
  backBtn.classList.remove("hidden");

  subtitle.textContent = "Fotos del álbum";

  let i = 0;

  function loadNext() {
    if (i >= items.length) return;

    const card = document.createElement("div");
    card.className = "card";

    const img = document.createElement("img");
    img.loading = "lazy";
    img.src = items[i].img;
    img.alt = items[i].nombre;

    const index = i;
    img.onclick = () => openViewer(index);

    card.appendChild(img);
    photosContainer.appendChild(card);

    i++;
    setTimeout(loadNext, 120); // 🔑 carga progresiva
  }

  loadNext();
}

/* ===== BOTÓN ATRÁS ===== */
function goBack() {
  photosContainer.classList.add("hidden");
  albumsContainer.classList.remove("hidden");
  backBtn.classList.add("hidden");
  subtitle.textContent = "Selecciona un álbum";
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
