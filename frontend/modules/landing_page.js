import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
  console.log("From init()")
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try{
    const data = await fetch("http://13.234.150.85:8082/cities")
    let resp =await data.json();
    console.log(resp);
    return resp;
  }catch(error){
    console.log(error);
    return null;
  }

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
      let doc = document.createElement("div");
      doc.className="col-6"
       let innerhtml=`<p>${city}</p><img src=${image} class="img-response"/>`
      doc.innerHTML =innerhtml;

      document.getElementById("data").appendChild(doc);
}

export { init, fetchCities, addCityToDOM };
