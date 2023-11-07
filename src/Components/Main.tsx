import style from "./Main.module.scss";

export default function Main({ currentCity, currentWeather }) {
	return (
		<main>
			<div className={style.mainInfos}>
				<img src={currentWeather ? `https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png` : "/weather-img/clear.png"} alt="" />
				<div>
					<div className={style.dataTemp}>
						<span>23°</span>
						<button className="c-button">C°</button>
					</div>
					<span className={style.dataWeather}>{currentWeather && currentWeather.weather[0].description}</span>
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
					<span className={style.detailsData}>{currentWeather && currentWeather.main.humidity}%</span>
				</li>

				<li>
					<div className={style.detailsHeader}>
						<img src="/icons/wind.svg" alt="" />
						<h3>Vitesse du vent</h3>
					</div>
					<span className={style.detailsData}>{currentWeather && currentWeather.wind.speed}m/s</span>
				</li>
			</ul>
		</main>
	);
}
