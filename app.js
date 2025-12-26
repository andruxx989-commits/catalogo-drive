// 🔗 URL de tu Google Apps Script
const API_URL = "https://script.google.com/macros/s/AKfycbyfW_TpkpBrRvJLeKeZfBuCJXjKKDXiORng98GpRHMZG24kkbmJbZTr6FNS46V0Wxuv/exec";

// 🎯 Referencias del DOM
const albumsDiv = document.getElementById("albums");
const photosDiv = document.getElementById("photos");
const subtitle = document.getElementById("subtitle");
const backBtn = document.getElementById("backBtn");

let dataGlobal = [];

// 🚀 Cargar datos del catálogo
fetch(API_URL)
  .then(response => response.json())
  .then(data => {
    dataGlobal = data;
    renderAlbums();
  })
  .catch(err => {
    albumsDiv.innerHTML = "<p>Error cargando el catálogo</p>";
    console.error(err);
  });

// 📁 Mostrar álbumes
function renderAlbums() {
  albumsDiv.innerHTML = "";
  photosDiv.classList.add("hidden");
  albumsDiv.classList.remove("hidden");

  subtitle.textContent = "Selecciona un álbum";
  backBtn.style.display = "none";

  dataGlobal.forEach(album => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${album.portada}" alt="${album.album}">
      <div class="info">${album.album}</div>
    `;
    card.onclick = () => openAlbum(album);
    albumsDiv.appendChild(card);
  });
}

// 🖼️ Abrir álbum
function openAlbum(album) {
  albumsDiv.classList.add("hidden");
  photosDiv.classList.remove("hidden");
  photosDiv.innerHTML = "";

  subtitle.textContent = album.album;
  backBtn.style.display = "inline-block";

  album.items.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${item.img}" alt="${item.nombre}">
      <div class="info">${item.nombre}</div>
    `;
    photosDiv.appendChild(card);
  });
}

// ⬅ Volver a álbumes
function goBack() {
  renderAlbums();
}
