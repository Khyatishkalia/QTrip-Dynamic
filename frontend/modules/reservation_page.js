import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them

  try{
    let res = await fetch(
  
      "http://15.206.226.139:8082/reservations/"
  
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

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
 if(reservations=="")
 {
  document.getElementById("no-reservation-banner").style.display="block";
  document.getElementById("reservation-table-parent").style.display="none";
 }
 else{
  document.getElementById("no-reservation-banner").style.display="none";
  document.getElementById("reservation-table-parent").style.display="block";
  console.log(reservations[0])
  let table = document.getElementById("reservation-table"); 
  for(let i=0;i<reservations.length;i++){
  let tr= document.createElement("tr");
  
   
    let td= document.createElement("td");
    let td1= document.createElement("td");
    let td2= document.createElement("td");
    let td3= document.createElement("td");
    let td4= document.createElement("td");
    let td5= document.createElement("td");
    let td6= document.createElement("td");
    td.innerHTML = reservations[i].id;
    td1.innerHTML = reservations[i].name;
    td2.innerHTML = reservations[i].adventureName;
    td3.innerHTML = reservations[i].person;
    const date = new Date(reservations[i].date);
    td4.innerHTML = date.toLocaleDateString('en-IN');
    td5.innerHTML = reservations[i].price;
    const time = new Date(reservations[i].time);
    const options = {
      dateStyle:"long",
      timeStyle:"medium"
      
    };
    td6.innerHTML = time.toLocaleString('en-IN',options).replace(" at",",");

    let td7= document.createElement("td");
    let a = document.createElement("a");
    let button = document.createElement("button");
    button.setAttribute("class","reservation-visit-button");
    button.setAttribute("id",reservations[i].id);
    //button.innerHTML = "Visit Adventure";
    a.setAttribute("href",`http://15.206.226.139:8082/frontend/pages/adventures/detail/?adventure=${reservations[i].adventure}`)
    a.innerText="Visit Adventure";
    button.append(a);
    td7.append(button);

    tr.append(td);
    tr.append(td1);
    tr.append(td2);
    tr.append(td3);
    tr.append(td4);
    tr.append(td5);
    tr.append(td6);
    tr.append(td7);
     table.append(tr);
  };
 
 }

}

export { fetchReservations, addReservationToTable };
