import config from "../conf/index.js";

console.log(config);
async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try{
  let res = await fetch(

    "http://15.206.226.139:8082/cities"

  ).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not OK");
    } 
    return response;
   
  })
   .catch((error) => {
    //console.error("There has been a problem with your fetch operation:", error);
    return null;
  });


  let data = await res.json();

  console.log(data);
  return data;}
  catch(err){
    return null;
  }

}
//console.log(fetchCities());

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let div1 = document.getElementById("data")
  let div2 = document.createElement("div");
  let div = document.createElement("div");
  let divTxt=document.createElement("div");
  let h5  = document.createElement("h5");
  let p1  = document.createElement("p");
  let img = document.createElement("img");
  let a  = document.createElement("a");
  
  //img.innerText("ok");
  div.setAttribute("class","col-lg-3 col-6")
  a.setAttribute("id",id);
  div2.setAttribute("class","tile");
  divTxt.setAttribute("class","tile-text text-center");
  a.setAttribute("href","/frontend/pages/adventures/?city="+id);
  img.setAttribute("src",image);
  // img.setAttribute("class","tile")
  //img.setAttribute("alt", "The Pulpit Rock");
  h5.innerText = city;
  
  p1.innerHTML = description;
  
  divTxt.appendChild(h5);
  divTxt.appendChild(p1);
  a.appendChild(div2);
  div2.appendChild(img);
  div2.appendChild(divTxt);
  div.appendChild(a);

  //div.appendChild();
  div1.appendChild(div);
  

}

export { init, fetchCities, addCityToDOM };
