const getLatLon = async (city) => {
  const API_KEY = "5f95eb9d5b53dc4d8e92a5cbc32e1ad5";
  const response = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
  );
  const data = await response.json();
  if (data.length === 0) {
    throw new Error("City not Found!");
  }
  return {
    lat: data[0].lat,
    lon: data[0].lon,
  };
};

export default getLatLon;
