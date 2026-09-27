let isOpen = $state(false);

export function isResumeOpen() {
	return isOpen;
}

export function openResume() {
	isOpen = true;
}

export function closeResume() {
	isOpen = false;
}

export function downloadResume() {
	if (typeof window === 'undefined') return;
	const link = document.createElement('a');
	link.href = '/resume.pdf';
	link.download = 'Deepak_Resume.pdf';
	link.click();
}
