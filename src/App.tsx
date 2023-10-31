import Header from "./Components/Header";

function App() {
	return (
		<div className="wrapper">

			<Header />
			
			<main>
				<div className="main-infos">
					<img src="/weather-img/clear.png" alt="" />
					<div className="data">
						<div className="data-temp">
							<span>23°</span>
							<button className="c-button">C°</button>
						</div>
						<span className="data-weather">Nuageux</span>
					</div>
				</div>

				<div className="city">Saint-Amand-Les-Eaux</div>

				<ul className="details">
					<li>
						<div className="header">
							<img src="/icons/thermometer.svg" alt="" />
							<h3>Se ressent comme</h3>
						</div>
						<span className="data">21°</span>
					</li>
				</ul>
			</main>
		</div>
	);
}

export default App;
