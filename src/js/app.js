import Modal from './Modal.js'
import LocalStorage from "./LocalStorage";
import Card from './Card.js'
import {userLogIn, userLogOut} from './functions'
import Login from "./Login";
import Visit from "./Visit";

const storage = new LocalStorage()
storage.renderCards()


document.querySelector('.js-login').addEventListener('click', function(e)  {
	if (this.classList.contains('is-logged-in')) {
		e.preventDefault()
		userLogOut()
	} else {
		const modalLogin = new Modal('User Login')
		const login = new Login(modalLogin)
	}
})

document.querySelector('.js-add-visit').addEventListener('click', function(e)  {
	const modalVisit = new Modal('Add Visit')
	const addVisit = new Visit(modalVisit)
	addVisit.render({})
})
