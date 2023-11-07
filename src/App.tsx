import { useEffect, useState } from "react";
import Header from "./Components/Header";
import Main from "./Components/Main";
import toast from "react-hot-toast";
import { getCoordsFromGeolocation, fetchData } from "./Utils/functions";

function App() {
	const [currentCity, setCurrentCity] = useState({
		name: "Paris",
		coords: {
			latitude: 48.866667,
			longitude: 2.333333,
		},
	});

	const [currentWeather, setCurrentWeather] = useState(null);

	function handleArrival() {
		let newCity = { ...currentCity };

		getCoordsFromGeolocation()
			.then((coordinates) => {
				newCity.coords = {
					latitude: coordinates.latitude,
					longitude: coordinates.longitude,
				};
				return fetchData(`http://api.openweathermap.org/geo/1.0/reverse?lat=${coordinates.latitude}&lon=${coordinates.longitude}&limit=1&appid=97e7e5fa800dc78285eb9b4de0225ca5`)
				// calls reverse geocoding API to get the name of the place corresponding to the user's coordinates
			})
			.then((cityArr) => {
				if (cityArr.length === 1) {
					newCity.name = cityArr[0].name;
					return newCity;
				} else {
					throw new Error();
				}
			})
			.then((newCity) => setCurrentCity(newCity))
			.catch((err) =>
				toast.error(
					`Une erreur s'est produite avec la géolocalisation. ${
						err.code ? `(Code: ${err.code})` : ""
					} Par défaut, votre ville a été définie comme Paris.`
				)
			);
	}

	function handleWeather(latitude: number, longitude:number) {
		fetchData(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=97e7e5fa800dc78285eb9b4de0225ca5&units=metric&lang=fr`)
			.then((res) => {
				setCurrentWeather(res)
			})
			.catch((err) => {
				toast.error(`Une erreur s'est produite durant la recherche de données météo. Merci de réessayer plus tard.`);
			})
	}

	useEffect(() => {
		handleArrival();
		handleWeather(currentCity.coords.latitude, currentCity.coords.longitude);
	}, []);

	return (
		<div className="wrapper">
			<Header />
			<Main currentCity={currentCity} />
		</div>
	);
}

export default App;