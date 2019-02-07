window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let temperatureSection = document.querySelector(".temperature");
  const temperatureSpan = document.querySelector(".temperature span");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = "http://cors-anywhere.herokuapp.com/";
      const weatherAPI = `${proxy}https://api.darksky.net/forecast/45d5839b323a7afb10b9eb9b5381f351/${lat},${long}`;
      const locationAPI = `http://api.ipstack.com/check?access_key=b6457e50b526c36a375164fd033fb95f`;

      fetch(weatherAPI)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
          const { temperature, summary, icon } = data.currently;
          //Set DOM elements from the API
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;
          //Formula for Celsius
          let celsius = (temperature - 32) * (5 / 9);
          //Set icons
          setIcons(icon, document.querySelector(".icon"));

          //Change temperature to Celsius/Fahrenheit
          temperatureSection.addEventListener("click", () => {
            if (temperatureSpan.textContent === "F") {
              temperatureSpan.textContent = "C";
              temperatureDegree.textContent = Math.floor(celsius);
            } else {
              temperatureSpan.textContent = "F";
              temperatureDegree.textContent = temperature;
            }
          });
        });

      fetch(locationAPI)
        .then(locationResponse => {
          return locationResponse.json();
        })
        .then(locationData => {
          console.log(locationData);
        });
    });
  } else {
    h1.textContent = "Am no sure where ye are pal. Gies yer location first.";
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
