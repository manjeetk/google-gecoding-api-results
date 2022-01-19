//Get address form
var addressForm = document.getElementById("address-form");

// Call getGeocode() when the button is clicked
addressForm.addEventListener('submit', getGeocode);

// Create a function to get the geocode
function getGeocode(e) {
    // Prevent the form from submitting
    e.preventDefault();

    let location = document.getElementById("address").value;
    axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
        params: {
            address: location,
            key: 'YOUR_API_KEY'
        }
    })
    .then(function(response) {
        //Get formatted address from response
        var formattedAddress = response.data.results[0].formatted_address;
        var formattedAddressOutput = `
            <ul class="list-group">
            <li class="list-group-item">${formattedAddress}</li>
            </ul>
        `;
        //Set inner HTML of the geocode div with formatted address
        document.getElementById('formatted-address').innerHTML = formattedAddressOutput;

        //Get address components from response
        var addressComponents = response.data.results[0].address_components;
        
        //Create addressComponentsOutput variable to hold the output
        var addressComponentsOutput = `<ul class="list-group">`;
        //Loop through address components
        for(var i = 0; i < addressComponents.length; i++) {
            addressComponentsOutput += `<li class="list-group-item"><strong>${addressComponents[i].types[0]}</strong>: ${addressComponents[i].long_name}</li>`;
        }
        addressComponentsOutput += `</ul>`;
        
        //Set inner HTML of the geocode div with formatted address
        document.getElementById('address-components').innerHTML = addressComponentsOutput;

          //Get latitude and longitude from response
          var lat = response.data.results[0].geometry.location.lat;
          var lng = response.data.results[0].geometry.location.lng;

          var geometryOutput = `
            <ul class="list-group">
            <li class="list-group-item"><strong>Latitude</strong>: ${lat}</li>
            <li class="list-group-item"><strong>Longitude</strong>: ${lng}</li>
            </ul>
        `;
        //Set inner HTML for the latitude and longitude
        document.getElementById('geometry').innerHTML = geometryOutput;
    })
    .catch(function(error){
        console.log(error);
    });
}