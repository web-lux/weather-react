import { Dispatch, useState } from "react";
import style from "./Header.module.scss";
import { fetchData } from "../Utils/functions";
import toast from "react-hot-toast";
import City from "../Interfaces/city";

interface HeaderProps {
	setCurrentCity: Dispatch<City>;
	currentCity: City;
}

function CityRow({ city, handleWatch, setCurrentCity }) {
	function handleClick() {
		setCurrentCity(city)
	}

	return (
		<li tabIndex={0} onClick={handleClick}>
			{city.name}
			<button
				className="c-button"
				aria-label="Retirer la ville sélectionnée des villes suivies"
				onClick={(e) => {
					e.stopPropagation();
					handleWatch("remove", city);
				}}
			>
				<img src="/icons/eye-minus.svg" alt="" />
			</button>
		</li>
	);
}

export default function Header({ setCurrentCity, currentCity }: HeaderProps) {
	const [cityInput, setCityInput] = useState("");
	const [citiesArr, setCitiesArr] = useState<any>([]);

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		fetchData(
			`http://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&limit=1&appid=97e7e5fa800dc78285eb9b4de0225ca5`
		)
			.then((res) => {
				if (res.length === 1) {
					console.log(res);
					setCurrentCity({
						name: res[0].name,
						coords: {
							latitude: res[0].lat,
							longitude: res[0].lon,
						},
					});
				} else {
					toast.error(
						"Aucune ville trouvée à ce nom. Êtes-vous sûr de l'avoir bien ortographié ?"
					);
				}
			})
			.catch(() => {
				toast.error(
					`Une erreur s'est produite durant la recherche de données géographiques. Merci de réessayer plus tard.`
				);
			});
	}

	function handleWatch(action: string, city?: any) {
		if (action === "add") {
			if (
				!citiesArr.some((element: City) => element.name === currentCity.name)
			) {
				setCitiesArr([...citiesArr, currentCity]);
			} else {
				toast.error(`${currentCity.name} figure déjà dans les villes suivies.`);
			}
		} else if (action === "remove") {
			const filteredArr = citiesArr.filter(
				(element: City) => element.name !== city.name
			);
			setCitiesArr(filteredArr);
		}
	}

	const citiesList = citiesArr.map((city: City) => {
		return <CityRow city={city} handleWatch={handleWatch} key={city.name} setCurrentCity={setCurrentCity}/>;
	});

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
						onClick={() => {
							handleWatch("add");
						}}
					>
						<img src="/icons/eye-plus.svg" alt="" />
					</button>
				</div>
				<nav aria-labelledby="watched-cities-title">
					<ul>{citiesList}</ul>
				</nav>
			</div>
		</header>
	);
}
