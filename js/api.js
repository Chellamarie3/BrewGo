function getNearestBrew() {
  const getBreweriesNearCoordinates = (position) => {
    fetch(
      `https://api.openbrewerydb.org/v1/breweries?by_dist=${position.coords.latitude},${position.coords.longitude}&per_page=3`
    ).then((res) => {
      console.log(res);
    });
  };
  navigator.geolocation.getCurrentPosition(getBreweriesNearCoordinates);
}
