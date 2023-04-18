export function userLogIn() {
	document.querySelector('.js-login').classList.add('is-logged-in')
	document.querySelector('.js-login span').textContent = 'Log out'
	document.querySelector('.js-add-visit').classList.remove('d-none')
}

export function userLogOut() {
	document.querySelector('.js-login').classList.remove('is-logged-in')
	document.querySelector('.js-login span').textContent = 'Login'
	document.querySelector('.js-add-visit').classList.add('d-none')
}
export const token = localStorage.getItem('medicalToken')

export const cards = JSON.parse(localStorage.getItem('medicalCards'))
