const urlParams = new URLSearchParams(window.location.search);
const itemId = urlParams.get("id");
  
fetch(`https://65ca2b833b05d29307dfdc5f.mockapi.io/listings/items/${itemId}`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  }
})
.then(response => {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
})
.then(data => {
    listingDetails(data)
})
.catch(error => {
  console.error(error);
});

function listingDetails(data) {
    const detailsContainer = document.getElementById("listingDetails");

    const detailImage = document.getElementById("detailImg");
    detailImage.src = data.image;
    detailImage.setAttribute("alt", "Listing image");

    const detailPrice = document.getElementById("detailPrice");
    detailPrice.innerText = `Kaina: ` + `${data.price} €`;

    const detailTitle = document.getElementById("detailTitle");
    detailTitle.innerText = data.title;

    const detailCity = document.getElementById("detailCity");
    detailCity.innerText = `Miestas: ` + data.city;

    const detailMotherboard = document.getElementById("detailMotherboard");
    detailMotherboard.innerText = `Pagrindinė plokštė: ` + data.motherboard;

    const detailCPU = document.getElementById("detailCPU");
    detailCPU.innerText = `Procesorius: ` + data.cpu;

    const detailGPU = document.getElementById("detailGPU");
    detailGPU.innerText = `Vaizdo plokštė: ` + data.gpu;

    const detailRAM = document.getElementById("detailRAM");
    detailRAM.innerText = `Operatyvinė atmintis (RAM): ` + data.ram;

    const detailSSD = document.getElementById("detailSSD");
    detailSSD.innerText = `Standusis diskas (SSD/HDD): ` + data.ssd;

    const detailPSU = document.getElementById("detailPSU");
    detailPSU.innerText = `Maitinimo blokas (PSU): ` + data.psu;

    const detailCase = document.getElementById("detailCase");
    detailCase.innerText = `Kompiuterio korpusas: ` + data.case;
}

function deleteListing(listingId) {
    fetch(`https://65ca2b833b05d29307dfdc5f.mockapi.io/listings/items/${itemId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        alert('Skelbimas sėkmingai ištrintas.');
    })
    .catch(error => {
        alert('Įvyko klaida, jūsų skelbimas nebuvo ištrintas.', error);
    });
}

const deleteButton = document.getElementById('removeListing');
deleteButton.addEventListener('click', function() {
    const itemIdToDelete = `https://65ca2b833b05d29307dfdc5f.mockapi.io/listings/items/${itemId}`;
    deleteListing(itemIdToDelete);
});