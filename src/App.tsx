import { useEffect } from "react";
import Header from "./Components/Header";
import Main from "./Components/Main";
import toast from "react-hot-toast";

function App() {

	function getCoords() {
		navigator.geolocation.getCurrentPosition((pos) => {
			console.warn(pos.coords)
		}, () => {
			toast.error(`Une erreur s'est produite avec la géolocalisation. Par défaut, votre ville a été définie comme Paris.`);
		})
	};

	useEffect(() => {
		getCoords();
	}, []);

	return (
		<div className="wrapper">
			<Header />
			<Main />
		</div>
	);
}

export default App;
