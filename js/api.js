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

          const resultItem = document.createElement("li");
          resultItem.textContent = result.name;

          resultList.appendChild(resultItem);
        }
      });
  };
  navigator.geolocation.getCurrentPosition(getBreweriesNearCoordinates);
}
