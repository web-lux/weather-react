import { City, Weather } from "./interfaces";

export const cityPlaceholder: City = {
	name: "Paris",
	coords: {
		latitude: 48.866667,
		longitude: 2.333333,
	},
};

export const weatherPlaceholder: Weather = {
	main: {
		feels_like: 0,
		humidity: 0,
		temp: 0,
	},
	weather: {
		description: "Inconnu",
		icon: "",
	},
	wind: {
		speed: 0,
	},
};
