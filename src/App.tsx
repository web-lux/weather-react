function App() {
	return (
		<div className="wrapper">
			<header>
				<form action="/" method="get">
					<label htmlFor="searched-city" id="search-label" hidden>
						Rechercher une ville :
					</label>
					<input
						type="text"
						name="searched-city"
						id="searched-city"
						placeholder="Rechercher une ville..."
						required
						aria-labelledby="search-label"
					/>
					<button type="submit" aria-label="Rechercher ville"></button>
				</form>

				<div className="watched-cities">
					<div className="label">
						<h2 id="watched-cities-title">Villes suivies</h2>
						<button aria-label="Ajouter la ville actuelle aux villes suivies"></button>
					</div>
					<nav aria-labelledby="watched-cities-title">
						<ul>
							<li>Nantes</li>
							<li>Londres</li>
							<li>Paris</li>
						</ul>
					</nav>
				</div>
			</header>

			<main>
				<div className="main-infos">
					<img src="/weather-img/clear.png" alt="" />
					<div className="data">
						<div className="data-temp">
							<span>23°</span>
							<button>C°</button>
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
