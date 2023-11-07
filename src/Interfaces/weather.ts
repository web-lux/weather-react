export default interface Weather {
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
