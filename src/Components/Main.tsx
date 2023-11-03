import style from "./Main.module.scss";

export default function Main({ currentCity }) {
	return (
		<main>
			<div className={style.mainInfos}>
				<img src="/weather-img/clear.png" alt="" />
				<div>
					<div className={style.dataTemp}>
						<span>23°</span>
						<button className="c-button">C°</button>
					</div>
					<span className={style.dataWeather}>Nuageux</span>
				</div>
			</div>

			<div className={style.city}>{currentCity.name}</div>

			<ul className={style.details}>
				<li>
					<div className={style.detailsHeader}>
						<img src="/icons/thermometer.svg" alt="" />
						<h3>Se ressent comme</h3>
					</div>
					<span className={style.detailsData}>21°</span>
				</li>

				<li>
					<div className={style.detailsHeader}>
						<img src="/icons/thermometer.svg" alt="" />
						<h3>Se ressent comme</h3>
					</div>
					<span className={style.detailsData}>21°</span>
				</li>

				<li>
					<div className={style.detailsHeader}>
						<img src="/icons/thermometer.svg" alt="" />
						<h3>Se ressent comme</h3>
					</div>
					<span className={style.detailsData}>21°</span>
				</li>
			</ul>
		</main>
	);
}
