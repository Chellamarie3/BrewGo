function getNearestBrew() {
  const resultList = document.getElementById("result");
  resultList.innerHTML = "";
  const getBreweriesNearCoordinates = (position) => {
    fetch(
      `https://api.openbrewerydb.org/v1/breweries?by_dist=${position.coords.latitude},${position.coords.longitude}&per_page=5`
    )
      .then((response) => response.json())
      .then((res) => {
        console.log(res);

        for (let i = 0; i < res.length; i++) {
          
          const result = res[i];

          const title = document.createElement("h5");
          title.textContent = result.name;

          //Add a new property to the json object called currentRating to keep track of the brewery current rating
          result.currentRating = (Math.random() *5).toFixed(2);
          
          //Add a new property to the json object called numbOfRaters to keep track of the number of people that have rated the brewery
          //Generate a random number stored between 1 and 10 for the number of raters
          result.numberOfRaters = Math.floor(Math.random()*10) + 1

          console.log(result);

          const resultItem = document.createElement("div");
          //resultItem.textContent = result.name;
          resultItem.classList.add("card");
          resultItem.style.width = "300px";

          const img = document.createElement("img");
          img.classList.add("card-img-top");
          img.src = "img/Beer-Logo.jpg";
          img.alt = "Brewery picture";

          //Create element to show current rating
          const rate = document.createElement("h5");
          
          // Assign an id to the rate node created using setAttribute()
          let rateID = 'rateID' + i;
          console.log(rateID);
          rate.setAttribute("id", rateID);
          rate.style.color = "red";
          rate.textContent = "Rating: " + result.currentRating + "/5";
          // Assign the onclick event to the rate
          //rate.onclick = function handleClick(result){alert("Hello");};
          rate.addEventListener("click", function() {
              //var parameter = "Hello, Monique!";
              calculateRating(result, rateID );
          });


          const cardBodyDiv = document.createElement("div");
          cardBodyDiv.classList.add("card-body");

          const cardTitle = document.createElement("p");
          cardTitle.classList.add("card-title");
          cardTitle.classList.add("text-primary");
          cardTitle.classList.add("fw-semibold");
          cardTitle.textContent = result.street;

          const cardTitle2 = document.createElement("p");
          cardTitle2.classList.add("card-title");
          cardTitle2.classList.add("text-primary");
          cardTitle2.classList.add("fw-semibold");
          cardTitle2.textContent = result.city + ", " + result.state;

          const cardText = document.createElement("a");
          cardText.classList.add("card-text");
          cardText.textContent = result.phone;
          cardText.href = `tel:${result.phone}`;
          cardText.classList.add("btn", "btn-warning", "me-4");

          const link = document.createElement("a");
          link.classList.add("btn", "btn-warning");
          link.href = result.website_url;
          link.target = "_blank";
          link.textContent = "Visit Website";

          cardBodyDiv.appendChild(cardTitle);
          cardBodyDiv.appendChild(cardTitle2);
          cardBodyDiv.appendChild(cardText);
          cardBodyDiv.appendChild(link);

          resultItem.appendChild(title);
          resultItem.appendChild(rate);
          resultItem.appendChild(img);
          resultItem.appendChild(cardBodyDiv);

          resultList.appendChild(resultItem);
        }
      });
  };
  navigator.geolocation.getCurrentPosition(getBreweriesNearCoordinates);
}


//Function triggered when user clicks rating
//function handleClick (brewery) {
  
//  alert(brewery.currentRating);
//}

function calculateRating(parameter,elementID) {
  let breweryName = parameter.name;
  let currentUserRating = parameter.currentRating;
  let numOfRaters = parameter.numberOfRaters;
  let userRating = 0;
  let newRating = 0;
  userRating = prompt("Please enter in a number from 0 to 5 to rate " + breweryName);
  console.log("Current user rating is :" + currentUserRating);
  console.log("Current number of users :" + numOfRaters);

  if(userRating >= 0 && userRating <= 5){
    newRating = ((parseFloat(userRating) + parseFloat(currentUserRating))/parseInt(numOfRaters + 1)).toFixed(2);
    alert("The new user rating is: " + newRating);
    //Update the number of people that have rated the brewery
    parameter.numberOfRaters++;
    console.log(parameter.numberOfRaters);
    console.log('The element ID is' + elementID)
    let updatedRating = document.getElementById(elementID);
    updatedRating.innerHTML = "Rating: " + newRating + "/5";
  }
  else{
    alert("Please enter a rating between 0 and 5");
  }
}