
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it

  //cd console.log(search);
  const params = new URLSearchParams(search);
  console.log(params.get('city'));
  return params.get('city');

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
    let res = await fetch(
  
      `http://15.206.226.139:8082/adventures?city=${city}`
  
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

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
   
   adventures.forEach(element => {
    let div = document.getElementById("data");
   let advDiv = document.createElement("div");
   let colDiv = document.createElement("div");
   let img = document.createElement("img");
   let pname = document.createElement("div");
   let pcost = document.createElement("div");
   let pcategory = document.createElement("div");
   let pdur= document.createElement("div");
   let p = document.createElement("div");
   let divdetail = document.createElement("div");
   let divd = document.createElement("div");
   let a  = document.createElement("a");
   a.setAttribute("id",element.id);
   a.setAttribute("href","/frontend/pages/adventures/detail/?adventure="+element.id);
   advDiv.setAttribute("class","activity-card");
   colDiv.setAttribute("class","col-lg-3 col-6");
     img.setAttribute("src",element.image);
     pname.innerText=(element.name);
     pname.setAttribute("class","col-6 text-sm-start ")
     pcost.innerText="₹"+(element.costPerHead);
     pcost.setAttribute("class","col-sm-6 text-sm-end ");
     pcategory.innerText=(element.category);
     pcategory.setAttribute("class","category-banner");
     pdur.innerText=(element.duration) + " hours";
     pdur.setAttribute("class","col-sm-6 text-sm-end ")
     p.innerText = "Duration";
     p.setAttribute("class","col-6")
  divdetail.appendChild(pname);
  divdetail.appendChild(pcost);
  divdetail.appendChild(p);
  divdetail.appendChild(pdur);
  divd.setAttribute("class","row");
 divdetail.setAttribute("class","row");
  divd.appendChild(divdetail);
   advDiv.appendChild(img);
   advDiv.appendChild(pcategory);
   advDiv.appendChild(divd); colDiv.appendChild(a);
   a.appendChild(advDiv);
  
   div.appendChild(colDiv);
   });
  

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
    let filteredList = list.filter(function(e){
      return  e.duration>=low && e.duration<=high;
    });
    
    return filteredList;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
    let list1= list.filter(function(e){
      for(let i=0;i<categoryList.length;i++)
      {
        if(e.category===categoryList[i])
        return e;
      }
           // return e.category in categoryList;
       
      })
     console.log(list1);
      return list1;

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
   if(filters["duration"]!="" && filters["category"]!="")
  {
    console.log(filters);
    let list2 = filterByCategory(list,filters["category"]);
    let d = filters["duration"].split("-");
     let list1=(filterByDuration(list2,d[0],d[1]));
     return list1;
  }
else  if(filters["duration"]!="")
  {
    //console.log(filters["duration"].split("-"));
    let d = filters["duration"].split("-");
     let list2 =  filterByDuration(list,d[0],d[1]);
     return list2;
  }
  else if(filters["category"]!=""){
    let list2 = filterByCategory(list,filters["category"]);
    return list2;}
  
   // Place holder for functionality to work in the Stubs
  else
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  console.log(filters);
  window.localStorage.setItem("filters", JSON.stringify(filters));

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
 return JSON.parse(window.localStorage.getItem("filters"));
 //console.log(window.localStorage.getItem('filters'));
  // Place holder for functionality to work in the Stubs
  //return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  if(filters["category"]!=""){
  filters["category"].forEach( function(e)
  {let div = document.createElement("div");
   let parent = document.getElementById("category-list")
   div.setAttribute("class","category-filter");
   div.innerText=e;
   parent.appendChild(div);})
   
  } 
  if(filters["duration"]!=="")
  {
    let ele = document.getElementById("duration-select");
    //ele.setAttribute('value',filters["duration"]);
     ele.value=filters["duration"];
  }

  

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};