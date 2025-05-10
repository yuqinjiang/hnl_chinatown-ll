// Initialize the map
var map = L.map('map').setView([21.3108, -157.8583], 15); // Centered at Honolulu Chinatown

// Add grayscale basemap (Carto Light)
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 25,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
}).addTo(map);

// Load CSV data
// Load CSV data
Papa.parse('all_photos.csv', {
  download: true,
  header: true,
  complete: function(results) {
    results.data.forEach(row => {
      if (row.lat && row.lon && row.title) {
        const lat = parseFloat(row.lat);
        const lon = parseFloat(row.lon);
        const photoPath = `photos/${row.title}`;

        // Add a red circle marker
        const marker = L.circleMarker([lat, lon], {
          radius: 3,
          color: 'red',
          fillColor: 'red',
          fillOpacity: 1
        }).addTo(map);

        marker.bindPopup(`<img src="${photoPath}" alt="photo" width="200px"><br>${row.title}`);
      }
    });
  }
});
