import { Dispatch, useState } from "react";
import style from "./Header.module.scss";
import { fetchData } from "../Utils/functions";
import toast from "react-hot-toast";
import City from "../Interfaces/city";

interface HeaderProps {
	setCurrentCity: Dispatch<City>
}

export default function Header({setCurrentCity}:HeaderProps) {
	const [cityInput, setCityInput] = useState('');

	function handleSubmit(e:React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		fetchData(`http://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&limit=1&appid=97e7e5fa800dc78285eb9b4de0225ca5`)
			.then((res) => {
				if (res.length === 1) {
					setCurrentCity({
						name: res[0].name,
						coords: {
							latitude: res[0].lat,
							longitude: res[0].lon
						}
					})
				} else {
					toast.error("Aucune ville trouvée à ce nom. Êtes-vous sûr de l'avoir bien ortographié ?")
				}
			})
			.catch(() => {
				toast.error(`Une erreur s'est produite durant la recherche de données géographiques. Merci de réessayer plus tard.`)
		})
	}

	return (
		<header className={`${style.header} glass`}>
			<form action="/" method="get" onSubmit={(e) => handleSubmit(e)}>
				<label htmlFor="search-city" id="search-label" hidden>
					Rechercher une ville :
				</label>
				<input
					type="text"
					name="search-city"
					id="search-city"
					placeholder="Rechercher une ville..."
					aria-labelledby="search-label"
					required
					value={cityInput}
					onChange={(e) => setCityInput(e.target.value)}
				/>
				<button type="submit" aria-label="Rechercher ville">
					<img src="/icons/paper-plane.svg" alt="" />
				</button>
			</form>

			<div className={style.watchedCities}>
				<div className={style.label}>
					<h2 id="watched-cities-title">Villes suivies</h2>
					<button
						aria-label="Ajouter la ville actuelle aux villes suivies"
						className="c-button"
					>
						<img src="/icons/eye-plus.svg" alt="" />
					</button>
				</div>
				<nav aria-labelledby="watched-cities-title">
					<ul>
						<li tabIndex={0}>Nantes</li>
						<li tabIndex={0}>Londres</li>
						<li tabIndex={0}>Paris</li>
					</ul>
				</nav>
			</div>
		</header>
	);
}
