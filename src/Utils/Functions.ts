export function getCoordsFromGeolocation() {
	return new Promise<GeolocationCoordinates>((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(
			(pos) => {
				resolve(pos.coords);
			},
			(error) => {
				reject(error);
			}
		);
	});
}

export function getCityFromCoords(latitude: number, longitude: number) {
	return new Promise<
		| []
		| [
				{
					name: string;
					lat: number;
					lon: number;
					country: string;
					state: string;
				}
		  ]
	>((resolve, reject) => {
		fetch(
			`http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=97e7e5fa800dc78285eb9b4de0225ca5`
		)
			.then((res) => {
				if (res.ok) {
					return res.json();
				} else {
					throw new Error();
				}
			})
			.then((res) => resolve(res))
			.catch((err) => reject(err));
	});
}
