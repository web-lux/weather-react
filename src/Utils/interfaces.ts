export interface City {
	name: string;
	coords: {
		latitude: number;
		longitude: number;
	};
}

export interface GeocodingAPI {
	name: string;
	local_names: { [key: string]: string };
	lat: number;
	lon: number;
	country: string;
	state?: string;
}

export interface Weather {
	main: {
		feels_like: number;
		humidity: number;
		temp: number;
	};
	weather: {
		description: string;
		icon: string;
	};
	wind: {
		speed: number;
	};
}

export interface WeatherAPI {
	coord: Coord;
	weather: WeatherElement[];
	base: string;
	main: Main;
	visibility: number;
	wind: Wind;
	clouds: Clouds;
	dt: number;
	sys: Sys;
	timezone: number;
	id: number;
	name: string;
	cod: number;
}

interface Clouds {
	all: number;
}

interface Coord {
	lon: number;
	lat: number;
}

interface Main {
	temp: number;
	feels_like: number;
	temp_min: number;
	temp_max: number;
	pressure: number;
	humidity: number;
}

interface Sys {
	type: number;
	id: number;
	country: string;
	sunrise: number;
	sunset: number;
}

interface WeatherElement {
	id: number;
	main: string;
	description: string;
	icon: string;
}

interface Wind {
	speed: number;
	deg: number;
	gust: number;
}
