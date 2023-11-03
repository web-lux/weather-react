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
		navigator.geolocation.getCurrentPosition(
			(pos) => {
				/* newCoords and prevState necessary to prevent getCoords() and getCityFromCoords() from overwriting each other, resulting in no change in currentCity */
				const newCoords = {
					latitude: pos.coords.latitude,
					longitude: pos.coords.longitude,
				};
				setCurrentCity((prevState) => ({
					...prevState,
					coords: newCoords,
				}));
				getCityFromCoords(newCoords.latitude, newCoords.longitude);
			},
			() => {
				toast.error(
					`Une erreur s'est produite avec la géolocalisation. Par défaut, votre ville a été définie comme Paris.`
				);
			}
		);
	}

	function getCityFromCoords(latitude: number, longitude: number) {
		fetch(
			`http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=c497f79e9c527796a8bdde79ad8a0557`
		)
			.then((res) => res.json())
			.then((res) => {
				setCurrentCity((prevState) => ({
					...prevState,
					name: res[0]["name"],
				}));
			});
	}

	useEffect(() => {
		getCoords();
	}, []);

	return (
		<div className="wrapper">
			<Header />
			<Main currentCity={currentCity} />
		</div>
	);
}

export default App;
