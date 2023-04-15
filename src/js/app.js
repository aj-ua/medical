import Modal from './Modal.js'

console.log('init')

document.querySelector('.js-login').addEventListener('click', function(){
	const modalLogin = new Modal
	modalLogin.handleCloseModal()
})
