function MainModule(listingsID = "#listings") {
  const me = {};


  const listingsElement = document.querySelector(listingsID);

  function getListingCode(listing) {
    return `<div>
  <div class="listing card">
    <img
      src=${listing.picture_url}
      class="card-img-top"
      alt="AirBNB Listing"
    />
    <div class="card-body">
      <h2 class="card-title">${listing.name}</h2>
      <div>${listing.price}</div>
      
      <p class="card-text">
        <b>Description:</b><br>
        ${listing.description}
      </p>
      <div>
        <div><b>Host:&nbsp</b>${listing.host_name}</div>
        <img src="${listing.host_picture_url}"
        alt="Host Picture">
      </div>
      <div><b>Amenites:</b><br>${listing.amenities}</div>
      <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
  </div>
  <!-- /card -->
  </div>

  `;
  }

  function redraw(listings) {
    listingsElement.innerHTML = "";
    listingsElement.innerHTML = listings.map(getListingCode).join("\n");
  }

  function modifyAmenites(listing) {
    const amenityArray = JSON.parse(listing.amenities);
    listing.amenities = amenityArray.map(item => `• ${item}<br>`).join("");
    return listing;
  }

  async function loadData() {
    const res = await fetch("./airbnb_sf_listings_500.json");
    let listings = await res.json();
    listings = listings.slice(0, 50);
    listings.map(modifyAmenites);
    me.redraw(listings);
  }

  me.redraw = redraw;
  me.loadData = loadData;
  return me;
}

const main = MainModule();


main.loadData();