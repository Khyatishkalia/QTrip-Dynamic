import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
     const advID = new URLSearchParams(search);
     //console.log(advID.get("adventure"));

  // Place holder for functionality to work in the Stubs
  return advID.get("adventure");
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
    let res = await fetch(
  
      "https://qtrip-dynamic-jybk.onrender.com/adventures/detail?adventure="+adventureId
  
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

  // Place holder for functionality to work in the Stubs
 
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  
    let h = document.getElementById("adventure-name");
    h.innerHTML = adventure.name;
    let p = document.getElementById("adventure-subtitle");
    p.innerHTML = adventure.subtitle;
    let photodiv = document.getElementById("photo-gallery");
    let div = document.createElement("div");
    div.setAttribute("class","advphoto");
    adventure.images.forEach(element => {
      let img = document.createElement("img");
      img.setAttribute("src",element);
      img.setAttribute("class","activity-card-image")
      div.append(img);
    });
    photodiv.append(div);
    let divContent = document.getElementById("adventure-content");
    let pCont  = document.createElement("p");
    pCont.innerHTML = adventure.content;
    divContent.appendChild(pCont);
  

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure imdocument.getElementById("advphoto").style.display="none";
  let photodiv = document.getElementById("photo-gallery");
  photodiv.innerHTML="";
let div = document.createElement("div");
div.setAttribute("id","carouselExampleIndicators"); 
div.setAttribute("class","carousel slide");
div.setAttribute("data-bs-ride","carousel");

let divbtn = document.createElement("div");
divbtn.setAttribute("class","carousel-indicators");

let button  = document.createElement('button');
button.setAttribute("type","button");
button.setAttribute("data-bs-target","#carouselExampleIndicators");
button.setAttribute("data-bs-slide-to",0);
button.setAttribute("class","active");
button.setAttribute("aria-current","true" );

divbtn.appendChild(button);
for(let i=1;i<images.length;i++)
  {
    let button  = document.createElement('button');
    button.setAttribute("type","button");
    button.setAttribute("data-bs-target","#carouselExampleIndicators");
    button.setAttribute("data-bs-slide-to",i);
    divbtn.appendChild(button);
  }
  
  let divin = document.createElement("div");
  divin.setAttribute("class","carousel-inner");
  let d = document.createElement("div");
    d.setAttribute("class","carousel-item active")
    let img = document.createElement("img");
    img.setAttribute("src",images[0]);
    img.setAttribute("class","activity-card-image d-block w-100")
    d.appendChild(img); divin.appendChild(d);
  for(let i=1;i<images.length;i++) {
    let div1 = document.createElement("div");
    div1.setAttribute("class","carousel-item")
    let img = document.createElement("img");
    img.setAttribute("src",images[i]);
    img.setAttribute("class","activity-card-image d-block w-100")
    div1.appendChild(img); divin.appendChild(div1);
  };

  let btnPrev= document.createElement("button");
  btnPrev.setAttribute("class","carousel-control-prev");
  btnPrev.setAttribute("type","button");
  btnPrev.setAttribute("data-bs-target","#carouselExampleIndicators");
  btnPrev.setAttribute("data-bs-slide","prev");
  let sp1 = document.createElement("span");
  sp1.setAttribute("class","carousel-control-prev-icon");
  sp1.setAttribute("aria-hidden","true");
  let sp2 = document.createElement("span");
  sp2.setAttribute("class","visually-hidden");
  sp2.innerText="Previous";
  btnPrev.appendChild(sp1);
  btnPrev.appendChild(sp2);

  let btnNxt= document.createElement("button");
  btnNxt.setAttribute("class","carousel-control-next");
  btnNxt.setAttribute("type","button");
  btnNxt.setAttribute("data-bs-target","#carouselExampleIndicators");
  btnNxt.setAttribute("data-bs-slide","next");
  let spN1 = document.createElement("span");
  spN1.setAttribute("class","carousel-control-next-icon");
  spN1.setAttribute("aria-hidden","true");
  let spN2 = document.createElement("span");
  spN2.setAttribute("class","visually-hidden");
  spN2.innerText="Next";
  btnNxt.appendChild(spN1);
  btnNxt.appendChild(spN2);

  
  div.append(divbtn);
  div.appendChild(divin);
  div.appendChild(btnPrev);
  div.appendChild(btnNxt);
  photodiv.append(div);

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  console.log(adventure!==null)
  if(adventure.available==true)
  {
    document.getElementById("reservation-panel-sold-out").style.display = "none";
    document.getElementById("reservation-panel-available").style.display = "block";
    document.getElementById("reservation-person-cost").innerHTML = adventure.costPerHead;    
  }
  else{
    document.getElementById("reservation-panel-available").style.display = "none";
    document.getElementById("reservation-panel-sold-out").style.display = "block";
    
  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  document.getElementById("reservation-cost").innerHTML= adventure.costPerHead * persons;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  
  const formData = new FormData(document.getElementById('myForm'));
    const formProps = Object.fromEntries(formData);
  const update = {
    name:formProps.name,
    date:formProps.date,
    person:formProps.person,
    adventure:adventure.id,
  }
  
    
    const options = {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify(update),
    };
  console.log(update);
  let url = "https://qtrip-dynamic-jybk.onrender.com/reservations/new";
  fetch(url, {
     
    // Adding method type
    method: "POST",
     
    // Adding body or contents to send
    body: JSON.stringify({
      name:formProps.name,
      date:formProps.date,
      person:formProps.person,
      adventure:adventure.id,
    }),
     
    // Adding headers to the request
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
})
 
// Converting to JSON
.then(response => response.json()
)
 
// Displaying results to console
.then(data=> 
  {if(data.ok)
    {alert("success");
    location.reload();
  }
  });
  
  //fetch(url, options)
  
  
}


//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved){
    document.getElementById("reserved-banner").style.display="block";
  }
  else{
    document.getElementById("reserved-banner").style.display="none";
  }

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
