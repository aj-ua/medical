import {Modal, ModalLogin} from './Modal.js'
import LocalStorage from "./LocalStorage";
import Card from './Card.js'
import {userLogIn, userLogOut} from './functions'

async function app() {
	console.log('app init')
	const storage = new LocalStorage()
	storage.renderCards()
}

app();


document.querySelector('.js-login').addEventListener('click', function(e)  {
	if (this.classList.contains('is-logged-in')) {
		e.preventDefault()
		userLogOut()
	} else {
		const modalLogin = new ModalLogin()
	}
})
