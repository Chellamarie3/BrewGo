function getNearestBrew() {
  //Changed this so that elements are appended to the row with the id mainContainer
  const resultList = document.getElementById("mainContainer");
  resultList.innerHTML = "";
  const getBreweriesNearCoordinates = (position) => {
    fetch(
      `https://api.openbrewerydb.org/v1/breweries?by_dist=${position.coords.latitude},${position.coords.longitude}&per_page=6`
    )
      .then((response) => response.json())
      .then((res) => {
        console.log(res);

        for (let i = 0; i < res.length; i++) {
            const result = res[i];
            //Add a new property to each json object called currentRating to keep track of the brewery current rating
            //Generate a random number between 1 and 5 for a currentRating
            result.currentRating = (Math.random() *5).toFixed(2);
          
            //Add a new property to the json object called numbOfRaters to keep track of the number of people that have rated the brewery
            //Generate a random number between 1 and 10 (including 10) for the number of raters
            result.numberOfRaters = Math.floor(Math.random()*10) + 1

            //Create an h5 element to hold the name of each brewery
            const cardTitle = document.createElement("h5");
            cardTitle.textContent = result.name;

            //Create an outer div and assign it the card bootstrap class and col classes to make them responsive   
            const cardOuterDiv = document.createElement("div");
            cardOuterDiv.classList.add("card");          
            cardOuterDiv.classList.add("col-xs-12");
            cardOuterDiv.classList.add("col-md-6");
            cardOuterDiv.classList.add("col-lg-3");
            cardOuterDiv.style.width = "400px";

            //Create the image to hold the beer image and assign its source and alt properties
            const img = document.createElement("img");
            img.classList.add("card-img-top");
            img.src = "img/Beer-Logo.jpg";
            img.alt = "Brewery picture";

            //Create an h5 element to display the brewery's current rating, we added the property current rating in line 15
            const rate = document.createElement("h5");
            rate.textContent = "Rating: " + result.currentRating + "/5";
            // Assign an id to the element we just created, so that we can identify it when we update the rating.
            // The rateID is assigned the text rateID plus i, i.e. the first json object is assigned and ID of rateID0, the second is assigned an ID of rateID1,
            // This is done to create a unique ID for each element, so that we can identify it later 
            let rateID = 'rateID' + i;
            rate.setAttribute("id", rateID);
            rate.style.color = "red";

            //Assign mouseover and mouseout event listeners to the ratings to change the styling when the user mouses over and mouses out the rating
            rate.addEventListener('mouseover', function(){
              changeTextColor(rate);
            });
  
            rate.addEventListener('mouseout', function(){
              revert(rate);
            });
         
            // Assign an onclick event handler to the rating to that the calculateRating function is called when the user clicks on a rating.
            rate.addEventListener("click", function() {
              calculateRating(result, rateID );
            });

            //Create the div to hold the card body, the card body will hold the address, the phone number and the website link
            const cardBodyDiv = document.createElement("div");
            cardBodyDiv.classList.add("card-body");

            //Create paragraph element to hold the brewery street
            const addressOne = document.createElement("p");
            addressOne.classList.add("card-title");
            addressOne.classList.add("text-primary");
            addressOne.classList.add("fw-semibold");
            addressOne.textContent = result.street;

            //Create paragraph element to hold the brewery city and name
            const addressTwo = document.createElement("p");
            addressTwo.classList.add("card-title");
            addressTwo.classList.add("text-primary");
            addressTwo.classList.add("fw-semibold");
            addressTwo.textContent = result.city + ", " + result.state;

            //Create anchor tag to hold the brewery phone number, add boostrap classes to it to style it as a button
            const phoneNumber = document.createElement("a");
            phoneNumber.classList.add("btn", "btn-warning", "me-4");
            phoneNumber.classList.add("card-text");
            phoneNumber.textContent = result.phone;
            phoneNumber.href = `tel:${result.phone}`;
            
            //Create anchor tag to hold brewery website link, add boostrap classes to it to style it as a button
            const website = document.createElement("a");
            website.classList.add("btn", "btn-warning");
            website.href = result.website_url;
            website.target = "_blank";
            website.textContent = "Visit Website";

            //Append the addresses, phoneNumber, and website to cardBodyDiv
            cardBodyDiv.appendChild(addressOne);
            cardBodyDiv.appendChild(addressTwo);
            cardBodyDiv.appendChild(phoneNumber);
            cardBodyDiv.appendChild(website);

            //Append the cardTitle (name of Brewery), rating, and image to the cardOuterDiv, append the cardBodyDiv last so that it (the addresses, phone number,and website)
            //appears under the cardTitle, rating, and image.           
            cardOuterDiv.appendChild(cardTitle);
            cardOuterDiv.appendChild(rate);
            cardOuterDiv.appendChild(img);
            cardOuterDiv.appendChild(cardBodyDiv);
            
            //Append the cardOutDiv to the row with the id of mainContainer
            resultList.appendChild(cardOuterDiv);
        }
      });
  };
  navigator.geolocation.getCurrentPosition(getBreweriesNearCoordinates);
}

//This function opens a modal so that the user can enter in a new rating for a brewery, it passes in the object for the brewery and the elementID, which will be used to update
//the text that holds the rating.
function calculateRating(parameter,elementID) {
    const modal = new bootstrap.Modal(document.getElementById('ratingModal'));
    modal.show();

    //Create variables to hold the properties of the object being passed in
    let breweryName = parameter.name;
    let currentUserRating = parameter.currentRating;
    let numOfRaters = parameter.numberOfRaters;
    let userRating = 0;
    let newRating = 0;
    let rateID = elementID;

    //Change the title of the ratingModal so that it asked the user to enter in a new rating for the brewery selected.
    document.getElementById("ratingTitle").textContent = `Enter rating for ${breweryName}`;

    //Retrieve the save button in the modal and add an event listener to the save button
    const save = document.getElementById("save");
    save.addEventListener("click", function(){
        userRating = document.getElementById("rateBrewery").value; //Get the rating entered by the user
        if(userRating >= 0 && userRating <= 5){
            newRating =  (((parseInt(numOfRaters) * parseFloat(currentUserRating)) + (parseFloat(userRating))) / parseInt(numOfRaters + 1)).toFixed(2); //Calculate the new rating
            numOfRaters++;  //Increment the number of ratings now that a new user has entered a new one
            let updatedRating = document.getElementById(rateID);
            updatedRating.textContent = "Rating: " + newRating + "/5";
            modal.hide();
        }
        else{
          alert("Please enter a rating between 0 and 5");
        }
    });
}

//This function changes the color and background color of an element
function changeTextColor(element) {
  element.style.color = 'blue';
  element.style.backgroundColor ="yellow";
}

//This function changes the color and background color of an element, was written to revert ratings styling back once user mouses out
function revert(element) {
  element.style.color = 'red';
  element.style.backgroundColor ="white";
}