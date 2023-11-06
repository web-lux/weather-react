import { useEffect, useState } from "react";
import Header from "./Components/Header";
import Main from "./Components/Main";
import toast from "react-hot-toast";

function App() {
	const [currentCity, setCurrentCity] = useState({
		name: "Paris",
		coords: {
			latitude: 48.866667,
			longitude: 2.333333,
		},
	});

	function getCoords() {
		return new Promise<GeolocationCoordinates>((resolve, reject) => {
			navigator.geolocation.getCurrentPosition(
				(pos) => {
					resolve(pos.coords);
				},
				(error) => {
					reject(error);
				}
			);
		});
	}

	function handleArrival() {
		let newCity = { ...currentCity };

		getCoords()
			.then((res) => {
				newCity.coords = {
					latitude: res.latitude,
					longitude: res.longitude,
				};
				return getCityFromCoords(
					newCity.coords.latitude,
					newCity.coords.longitude
				);
			})
			.then((res) => {
				if (res.length === 1) {
					newCity.name = res[0].name;
					return newCity;
				} else {
					throw new Error();
				}
			})
			.then((res) => setCurrentCity(res))
			.catch((err) =>
				toast.error(
					`Une erreur s'est produite avec la géolocalisation. ${
						err.code ? `(Code: ${err.code})` : ""
					} Par défaut, votre ville a été définie comme Paris.`
				)
			);
	}

	function getCityFromCoords(latitude: number, longitude: number) {
		return new Promise<
			| []
			| [
					{
						name: string;
						lat: number;
						lon: number;
						country: string;
						state: string;
					}
			  ]
		>((resolve, reject) => {
			fetch(
				`http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=97e7e5fa800dc78285eb9b4de0225ca5`
			)
				.then((res) => {
					if (res.ok) {
						return res.json();
					} else {
						throw new Error();
					}
				})
				.then((res) => resolve(res))
				.catch((err) => reject(err));
		});
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
