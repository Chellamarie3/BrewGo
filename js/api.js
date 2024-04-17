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

          const resultItem = document.createElement("div");
          resultItem.textContent = result.name;
          resultItem.classList.add("card");
          resultItem.style.width = "300px";

          const img = document.createElement("img");
          img.classList.add("card-img-top");
          img.src = "img/Beer-Logo.jpg";
          img.alt = "Brewery picture";

          const cardBodyDiv = document.createElement("div");
          cardBodyDiv.classList.add("card-body");

          const cardTitle = document.createElement("h5");
          cardTitle.classList.add("card-title");
          cardTitle.textContent = result.address_1;

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
          cardBodyDiv.appendChild(cardText);
          cardBodyDiv.appendChild(link);

          resultItem.appendChild(img);
          resultItem.appendChild(cardBodyDiv);

          resultList.appendChild(resultItem);
        }
      });
  };
  navigator.geolocation.getCurrentPosition(getBreweriesNearCoordinates);
}
