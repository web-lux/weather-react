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

export function fetchData(url: string): Promise<any> {
	return new Promise((resolve, reject) => {
		fetch(url)
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
