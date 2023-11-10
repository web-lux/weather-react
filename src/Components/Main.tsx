import style from "./Main.module.scss";
import City from "../Interfaces/city"
import Weather from "../Interfaces/weather";

interface MainProps {
	currentCity: City,
	currentWeather: Weather
}

export default function Main({ currentCity, currentWeather }: MainProps) {
	return (
		<main>
			<div className={style.mainInfos}>
				<img src={currentWeather.weather.icon !== "" ? `https://openweathermap.org/img/wn/${currentWeather.weather.icon}@2x.png` : "/weather-img/clear.png"} alt="" />
				<div>
					<div className={style.dataTemp}>
						<span>{currentWeather.main.temp}</span>
						<button className="c-button">C°</button>
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
					<span className={style.detailsData}>{currentWeather.main.feels_like}°</span>
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
