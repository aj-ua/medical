export function userLogIn() {
	document.querySelector('.js-login').classList.add('is-logged-in')
	document.querySelector('.js-login span').textContent = 'Log out'
	document.querySelector('.js-add-visit').classList.remove('d-none')
	document.querySelector('#filters').classList.remove('d-none')
}

export function userLogOut() {
	document.querySelector('.js-login').classList.remove('is-logged-in')
	document.querySelector('.js-login span').textContent = 'Login'
	document.querySelector('.js-add-visit').classList.add('d-none')
	localStorage.removeItem('medicalToken')
	localStorage.removeItem('medicalCards')
	document.querySelector('#filters').classList.add('d-none')
	document.querySelector('#cards').innerHTML = '<h3 class="cards__nothing">No visits have been added.</h3>'
}
export const token = localStorage.getItem('medicalToken')

export const cards = JSON.parse(localStorage.getItem('medicalCards'))
