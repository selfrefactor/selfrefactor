import {Internals} from 'remotion';

export const waitForNoInput = (signal, ms) => {
	// Don't wait during rendering
	if (Internals.getRemotionEnvironment() === 'rendering') {
		return Promise.resolve();
	}

	if (signal.aborted) {
		return Promise.reject(new Error('stale'));
	}

	return Promise.race([
		new Promise((_, reject) => {
			signal.addEventListener('abort', () => {
				reject(new Error('stale'));
			});
		}),
		new Promise((resolve) => {
			setTimeout(() => {
				resolve();
			}, ms);
		}),
	]);
};
