if (document.querySelector("#mapa")) {
  const lat = 18.430833;
  const lng = -97.405327;
  const zoom = 18;

  const map = L.map("mapa").setView([lat, lng], zoom);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      `
          <h2 class="mapa__heading">Estetica Unisex Silvia</h2>
          <p class="mapa__texto">Calle Vicente guerrero poniente #112 Santa María, Santa María Coapan</p>
      `
    )
    .openPopup();
}
