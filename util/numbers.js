export function __round(value, method = 'round') {
	if (isNaN(value)) {
		return value;
	}
	switch (method) {
		case 'up':
			return Math.ceil(value);
		case 'down':
			return Math.floor(value);
		case 'trunc':
			return Math.trunc(value);
		default:
			return Math.round(value);
	}
}