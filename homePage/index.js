const state = {};

function listingItems(listings) {
  const listingContainer = document.getElementById("properties-container");
  listingContainer.innerHTML = "";

  listings.forEach((listing) => {
    const listingImage = document.createElement("img");
    listingImage.src = listing.image;
    listingImage.setAttribute("alt", "Listing image");

    const listingPrice = document.createElement("h2");
    listingPrice.innerText = `${listing.price} €`;

    const listingTitle = document.createElement("h1");
    listingTitle.innerText = listing.title;

    const listingCity = document.createElement("h3");
    listingCity.innerText = listing.city;

    const listingDescription = document.createElement("p");
    listingDescription.innerText = listing.description;

    const listingItems = document.createElement("div");
    listingItems.setAttribute("class", "listing-items");
    listingItems.append(listingImage, listingTitle, listingPrice, listingCity);

    listingContainer.append(listingItems);

    listingItems.addEventListener("click", () => {
      window.location.href = `/listingDetails/listingDetails.html?id=${listing.id}`;
    });
  });
}

fetchListings();

function fetchListings() {
  fetch("https://65ca2b833b05d29307dfdc5f.mockapi.io/listings/items")
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(res.statusText);
      }
    })
    .then((data) => {
      state["listings"] = data;
      listingItems(data);
    })
    .catch((error) => {
      console.error(error);
    });
}

document.getElementById("sortSelect").addEventListener("change", function () {
  const priceOption = this.value;
  const listings = state.listings.slice();

  if (priceOption === "low-to-high") {
    listings.sort((a, b) => a.price - b.price);
  } else if (priceOption === "high-to-low") {
    listings.sort((a, b) => b.price - a.price);
  }

  listingItems(listings);
});

document.getElementById("citySelect").addEventListener("change", function () {
  const selectedCity = this.value;
  const listings = state.listings.slice();

  const filteredListings =
    selectedCity === "all"
      ? listings
      : listings.filter(
          (listing) => listing.city.toLowerCase() === selectedCity
        );

  listingItems(filteredListings);
});

document.getElementById("clearFilters").addEventListener("click", function () {
  document.getElementById("citySelect").value = "all";
  document.getElementById("sortSelect").value = "all";

  const listings = state.listings.slice();
  listingItems(listings);
});
