import {Modal, ModalLogin} from './Modal.js'
import LocalStorage from "./LocalStorage";
import Card from './Card.js'

async function app(){
	console.log('app init')
	const storage = new LocalStorage()
	storage.renderCards()
}
app();


document.querySelector('.js-login').addEventListener('click', function(){
	const modalLogin = new ModalLogin()
})
