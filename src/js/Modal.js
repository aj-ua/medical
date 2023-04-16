import LocalStorage from "./LocalStorage";
import {userLogIn} from "./functions";

const storage = new LocalStorage()

console.log('token from storage', storage.token)

export default class Modal {
	constructor() {
		this.renderContent()
		this.modal = document.querySelector('.modal')
		this.closeButton = this.modal.querySelector('.btn-close')
		this.handleCloseModal()
	}

	renderContent() {
		const html = `
        <div class="modal show" tabindex="-1">
			<div class="modal-dialog">
				<div class="modal-content"> 
					<div class="modal-header">
						<h5 class="modal-title">Modal</h5>
						<button type="button" class="btn-close"></button>
					</div>
					<div class="modal-body">
						...
					</div>
				</div>
			</div>
		</div>
        `
		document.body.insertAdjacentHTML('beforeend', html)
	}

	closeModal() {
		this.modal.remove()
	}

	handleCloseModal() {
		this.closeButton.addEventListener('click', e => {
			this.closeModal()
		})
	}
}

/**
 * Modal: User Login
 */
class ModalLogin extends Modal {
	constructor() {
		super();
		this.form = this.modal.querySelector('.modal form')
		this.handleFormSubmit()
	}

	renderContent() {
		const html = `
        <div class="modal show" tabindex="-1">
			<div class="modal-dialog">
				<div class="modal-content"> 
					<div class="modal-header">
						<h5 class="modal-title">User Login</h5>
						<button type="button" class="btn-close"></button>
					</div>
					<div class="modal-body">
						<form class="form-login">
							<div class="mb-3">
								<label for="email" class="form-label">Email*</label>
								<input type="email" class="form-control" id="email" required>
							</div>
							<div class="mb-3">
								<label for="password" class="form-label">Password*</label>
								<input type="password" class="form-control" id="password" required>
							</div>
							<button type="submit" class="btn btn-primary">Submit</button>
						</form>
					</div>
				</div>
			</div>
		</div>
        `
		document.body.insertAdjacentHTML('beforeend', html)
	}

	handleFormSubmit() {
		this.form.addEventListener('submit', e => {
			e.preventDefault()
			console.log('form submit')
			const email = this.form.email.value,
				password = this.form.password.value

			if (localStorage.getItem('medicalToken') !== null) {

				const token = localStorage.getItem('medicalToken')
				storage.renderCards()

			} else {

				storage.getToken(email, password).then(token => {
					localStorage.setItem('medicalToken', token)
					storage.renderCards()
				})

			}

			userLogIn()
			this.closeModal()
		})
	}

}

export {Modal, ModalLogin}
