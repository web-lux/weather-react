import { useEffect, useState } from "react";
import Header from "./Components/Header";
import Main from "./Components/Main";
import toast from "react-hot-toast";
import { getCoordsFromGeolocation, getCityFromCoords } from "./Utils/functions";

function App() {
	const [currentCity, setCurrentCity] = useState({
		name: "Paris",
		coords: {
			latitude: 48.866667,
			longitude: 2.333333,
		},
	});

	function handleArrival() {
		let newCity = { ...currentCity };

		getCoordsFromGeolocation()
			.then((coordinates) => {
				newCity.coords = {
					latitude: coordinates.latitude,
					longitude: coordinates.longitude,
				};
				return getCityFromCoords(
					coordinates.latitude,
					coordinates.longitude
				);
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

	useEffect(() => {
		handleArrival();
	}, []);

	return (
		<div className="wrapper">
			<Header />
			<Main currentCity={currentCity} />
		</div>
	);
}

export default App;
