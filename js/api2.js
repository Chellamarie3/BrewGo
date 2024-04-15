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
            
            // Create the outer div element with class "card" and style attribute
            const resultItem = document.createElement("div");
            resultItem.textContent = result.name;
            resultItem.classList.add("card");
            resultItem.style.width = "30rem";
  

            // Create the img element with class "card-img-top" and set src and alt attributes
            const img = document.createElement("img");
            img.classList.add("card-img-top");
            img.src = "img/Beer-Logo.jpg"; // Set the image source
            img.alt = "Brewery picture"; // Set the alt text

            // Create the inner div element with class "card-body"
            const cardBodyDiv = document.createElement("div");
            cardBodyDiv.classList.add("card-body");

            // Create the h5 element with class "card-title" and set its text content
            const cardTitle = document.createElement("h5");
            cardTitle.classList.add("card-title");
            cardTitle.textContent = result.address_1;

            // Create the p element with class "card-text" and set its text content
            const cardText = document.createElement("p");
            cardText.classList.add("card-text");
            cardText.textContent = result.phone;
            
            // Create the a element with class "btn btn-primary" and set its href and text content
            const link = document.createElement("a");
            link.classList.add("btn", "btn-warning");
            link.href = result.website_url; // Set the href attribute
            link.textContent = "Visit Website";

            // Append the h5, p, and a elements to the cardBodyDiv (the inner div element)
            cardBodyDiv.appendChild(cardTitle);
            cardBodyDiv.appendChild(cardText);
            cardBodyDiv.appendChild(link);

            // Append the img and cardBodyDiv to the resultItem (the outer div)
            resultItem.appendChild(img);
            resultItem.appendChild(cardBodyDiv);


            resultList.appendChild(resultItem);
          }

        });
    };
    navigator.geolocation.getCurrentPosition(getBreweriesNearCoordinates);
  }
  