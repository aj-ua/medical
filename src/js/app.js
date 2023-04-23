import Modal from './Modal.js'
import Storage from "./Storage";
import {userLogIn, userLogOut} from './functions'
import Login from './Login';
import Visit from './Visit';
import './filters';

const storage = new Storage()
storage.renderCards()

// email: aj@ua.com | password: 121212

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
