/** @type {{ id: number; message: string; type: 'success' | 'error' }[]} */
let toasts = $state([]);
let nextId = 0;

export function getToasts() {
	return toasts;
}

/**
 * @param {string} message
 * @param {'success' | 'error'} type
 */
function addToast(message, type) {
	const id = nextId++;
	toasts = [...toasts, { id, message, type }];
	setTimeout(() => removeToast(id), 4000);
}

/** @param {number} id */
export function removeToast(id) {
	toasts = toasts.filter((t) => t.id !== id);
}

/** @param {string} message */
export function success(message) {
	addToast(message, 'success');
}

/** @param {string} message */
export function error(message) {
	addToast(message, 'error');
}
