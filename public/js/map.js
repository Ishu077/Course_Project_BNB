mapboxgl.accessToken = mapToken; // Mapbox access token
const map = new mapboxgl.Map({
    container: 'map', // container ID
    // center: [-74.5, 40], // starting position [lng, lat]. Note that lat must be set between -90 and 90
    center: list.geometry.coordinates, // coordinates from the listing, which is written in the top script of the show.ejs file
    zoom: 10 // starting zoom
});

const marker = new mapboxgl.Marker({ color: 'red'})
    // .setLngLat([12.65147, 55.608166])  //listing coordinates will be sent!: listing.geometry.coordinates
    .setLngLat(list.geometry.coordinates) // coordinates from the listin ,ehich is wriiten in the top script of the show.ejs file
    .setPopup(new mapboxgl.Popup({offset: 25})
    .setHTML(`<h4>${list.location}</h4><p>Exact location provided after booking</p>`)) // add popups
    .addTo(map);