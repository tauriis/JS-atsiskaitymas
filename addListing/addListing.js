const form = document.getElementById("listingForm");
const cities = [
  "Vilnius",
  "Kaunas",
  "Klaipėda",
  "Šiauliai",
  "Tauragė",
  "Jurbarkas",
];

cities.forEach((city) => {
  const addCity = document.getElementById("listingCity");
  const option = document.createElement("option");
  option.setAttribute("value", city);
  option.innerText = city;
  addCity.append(option);
});

function displayStatus(isOk, text) {
  const statusDiv = document.getElementById("statusMessages");
  const statusText = document.createElement("h1");
  statusDiv.style.color = isOk ? "03d3b2" : "red";
  statusText.innerHTML = text;
  statusDiv.append(statusText);
}

function handleFormSubmit(event) {
  event.preventDefault();
  const addFormData = new FormData(form);
  document.getElementById("statusMessages").innerHTML = "";

  fetch("https://65ca2b833b05d29307dfdc5f.mockapi.io/listings/items", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(Object.fromEntries(addFormData)),
  })
    .then((res) => {
      if (res.ok) {
        alert("Skelbimas sėkmingai patalpintas.");
      } else {
        throw new Error(res.statusText);
      }
    })
    .catch((error) => {
      alert(`Įvyko klaida, skelbimas nebuvo patalpintas: ${error}.`);
    });
}

form.addEventListener("submit", handleFormSubmit);
