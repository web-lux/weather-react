import style from "./Header.module.scss";

export default function Header() {
	return (
		<header className={`${style.header} glass`}>
			<form action="/" method="get">
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
