//select elements
const searchBtn = document.querySelector("#btn-search");
const searchInput = document.querySelector(".search-box");
const weatherDetails = document.querySelector(".weather-details");
const footer = document.querySelector("footer");
console.log(weatherDetails);
/* types of key events
keypress
keyup
*/
searchInput.addEventListener("keyup", async (e) => {
  if (e.key === "Enter") {
    submit();
  }
  const field = searchInput.value;
});

//search button
searchBtn.addEventListener("click", () => {
  submit();
});

async function submit() {
  let markup = "";
  weatherDetails.innerHTML = `
  <img src="https://i.pinimg.com/originals/49/8f/77/498f7727ecf2a588d6c3eebac92a7c4b.gif" alt="Loading..." style="width: 200px; height: 200px">
  `;
  const result = await fetchweather(searchInput.value.trim().toLowerCase());
  console.log(result);
  if (result.status === "success") {
    const name = result.data.location.name;
    const region = result.data.location.region;
    const image = result.data.current.condition.icon;
    const text = result.data.current.condition.text;
    const cloud = result.data.current.cloud;
    const Humidity = result.data.current.humidity;
    const windSpeed = result.data.current.wind_kph;
    markup = `
    <div class="image">
          <img
            src="${image}"
            class="img-fluid rounded-circle"
            style="width: 110px"
            alt="${name}"
          />
        </div>
        <small>${text}</small>

        <div class="deg text-center">
          <span class="fs-1">${cloud}</span>
          <sup class="fs-4">&deg;</sup>
          <span class="fs-2">c</span>
        </div>
        <h2 class="text-center">${name}</h2>
    `;
    footer.innerHTML = `
              <div class="row">
          <div class="col-5">
            <div class="wind">
              <div class="stat">
                <i class="bi bi-cloud-fog2-fill fs-3"></i>
                <span class="fs-5">${Humidity}%</span>
              </div>
              <p class="text-start">Humidity</p>
            </div>
          </div>
          <div class="col-2"></div>
          <div class="col-5">
            <div class="wind">
              <div class="stat text-center">
                <i class="bi bi-wind fs-3"></i>
                <span class="fs-5">${windSpeed} km/h</span>
              </div>
              <p class="text-end">Wind Speed</p>
            </div>
          </div>
        </div>
    `;
  } else {
    markup = `
    <h4>${result}</h4>
    `;
    // no result
  }
  searchInput.value = "";
  weatherDetails.innerHTML = markup;
}
//fetch weather
async function fetchweather(query) {
  try {
    const res = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=f5eb719f6b5147c69a1104150242008&q=${query}&aqi=no`
    );
    if (!res.ok) {
      //return{status: false, data;""};
      throw new Error("Error: result not available, try again later!");
    }

    const data = await res.json();
    return { status: "success", data };
  } catch (err) {
    return err.message;
  }
}
