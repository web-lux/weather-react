import style from "./Main.module.scss";
import { City, Weather } from "../Utils/interfaces";
import { useState } from "react";

interface MainProps {
	currentCity: City,
	currentWeather: Weather
}

export default function Main({ currentCity, currentWeather }: MainProps) {

	const [isUnitCelsius, setIsUnitCelsius] = useState(true)

	function changeUnit() {
		console.log(isUnitCelsius);
		setIsUnitCelsius((prev) => !prev);
		console.log(isUnitCelsius)
	}

	return (
		<main>
			<div className={style.mainInfos}>
				<img src={currentWeather.weather.icon !== "" ? `https://openweathermap.org/img/wn/${currentWeather.weather.icon}@2x.png` : "/weather-img/clear.png"} alt="" />
				<div>
					<div className={style.dataTemp}>
						<span>{isUnitCelsius ? currentWeather.main.temp.toFixed(1) : (currentWeather.main.temp * 9/5 + 32).toFixed(1)}</span>
						<button className="c-button" onClick={changeUnit}>{isUnitCelsius ? "C°" : "F°" }</button>
					</div>
					<span className={style.dataWeather}>{currentWeather.weather.description}</span>
				</div>
			</div>

			<div className={style.city}>{currentCity.name}</div>

			<ul className={style.details}>
				<li>
					<div className={style.detailsHeader}>
						<img src="/icons/thermometer.svg" alt="" />
						<h3>Se ressent comme</h3>
					</div>
					<span className={style.detailsData}>{isUnitCelsius ? currentWeather.main.feels_like.toFixed(1) : (currentWeather.main.feels_like * 9/5 + 32).toFixed(1)}°</span>
				</li>

				<li>
					<div className={style.detailsHeader}>
						<img src="/icons/droplet.svg" alt="" />
						<h3>Humidité</h3>
					</div>
					<span className={style.detailsData}>{currentWeather.main.humidity}%</span>
				</li>

				<li>
					<div className={style.detailsHeader}>
						<img src="/icons/wind.svg" alt="" />
						<h3>Vitesse du vent</h3>
					</div>
					<span className={style.detailsData}>{currentWeather.wind.speed}m/s</span>
				</li>
			</ul>
		</main>
	);
}
