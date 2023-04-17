import {userLogIn} from "./functions";
import LocalStorage from "./LocalStorage";

const storage = new LocalStorage()
console.log('token from storage', storage.token)

export default class Login {
	constructor(modal) {
		this.modal = modal
		this.render()
		this.handleFormSubmit()
	}

	render() {
		const html = `
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
		`
		this.modal.renderBody(html)
	}

	handleFormSubmit() {
		const form = document.querySelector('.form-login')
		form.addEventListener('submit', e => {
			e.preventDefault()
			const email = form.email.value,
				password = form.password.value

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
			this.modal.closeModal()
		})
	}
}