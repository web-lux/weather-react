import { useEffect, useState } from "react";
import Header from "./Components/Header";
import Main from "./Components/Main";
import toast from "react-hot-toast";
import { getCoordsFromGeolocation, fetchData } from "./Utils/functions";
import { cityPlaceholder, weatherPlaceholder } from "./Utils/placeholder";
import { City, GeocodingAPI, WeatherAPI } from "./Utils/interfaces";

function App() {
	const [currentCity, setCurrentCity] = useState(cityPlaceholder);
	const [currentWeather, setCurrentWeather] = useState(weatherPlaceholder);
	const [arrivalHandled, setArrivalHandled] = useState(false);

	function handleArrival() {
		let newCity: City = { ...currentCity };

		getCoordsFromGeolocation()
			// change "coords" property of newCity to the latitude and longitude of the user position returned by the navigator geolocation API
			.then((coordinates: GeolocationCoordinates) => {
				newCity.coords = {
					latitude: coordinates.latitude,
					longitude: coordinates.longitude,
				};
				// calls reverse geocoding API to get the name of the place corresponding to the user's coordinates
				return fetchData(
					`http://api.openweathermap.org/geo/1.0/reverse?lat=${coordinates.latitude}&lon=${coordinates.longitude}&limit=1&appid=97e7e5fa800dc78285eb9b4de0225ca5`
				);
			})
			.then((cityArr: [GeocodingAPI]) => {
				// if the geocoding API returns something, change the name of the newCity object properties and return it
				if (cityArr.length === 1) {
					newCity.name = cityArr[0].name;
					return newCity;
				} else {
					// if somehow the geocoding API doesn't return anything, the placeholder city, Paris, stays
					throw new Error();
				}
			})
			.then((newCity: City) => {
				// if there's no error, change currentCity from a placeholder to the city of the user, obtained via geolocation
				setCurrentCity(newCity);
				setArrivalHandled(true);
			})
			.catch((err) => {
				toast.error(
					`Une erreur s'est produite avec la géolocalisation. ${
						err.code ? `(Code: ${err.code})` : ""
					} Par défaut, votre ville a été définie comme Paris.`
				);
				handleWeather(
					currentCity.coords.latitude,
					currentCity.coords.longitude
				);
				setArrivalHandled(true);
			});
	}

	function handleWeather(latitude: number, longitude: number) {
		fetchData(
			`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=97e7e5fa800dc78285eb9b4de0225ca5&units=metric&lang=fr`
		)
			.then((res: WeatherAPI) => {
				setCurrentWeather({
					main: {
						feels_like: res.main.feels_like,
						humidity: res.main.humidity,
						temp: res.main.temp,
					},
					weather: {
						description: res.weather[0].description,
						icon: res.weather[0].icon,
					},
					wind: {
						speed: res.wind.speed,
					},
				});
			})
			.catch(() => {
				toast.error(
					`Une erreur s'est produite durant la recherche de données météo. Merci de réessayer plus tard.`
				);
			});
	}

	useEffect(() => {
		// on page load, try to get the user's city via geolocation
		handleArrival();
	}, []);

	useEffect(() => {
		if (arrivalHandled) {
			// if currentCity changes, handleWeather() is called again with the right coordinates
			handleWeather(currentCity.coords.latitude, currentCity.coords.longitude);
		}
	}, [currentCity]);

	return (
		<div className="wrapper">
			<Header setCurrentCity={setCurrentCity} currentCity={currentCity} />
			<Main currentCity={currentCity} currentWeather={currentWeather} />
		</div>
	);
}

export default App;
