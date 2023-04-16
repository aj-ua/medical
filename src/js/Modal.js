import LocalStorage from "./LocalStorage";
import Visit from "./Visit";
import {userLogIn} from "./functions";

const storage = new LocalStorage()

console.log('token from storage', storage.token)

export default class Modal {
	constructor(title) {
		this.render(title)
		this.modal = document.querySelector('.modal')
		this.modalBody = this.modal.querySelector('.modal-body')
		this.closeButton = this.modal.querySelector('.btn-close')
		this.handleCloseModal()
	}

	render(title = 'Modal') {
		const html = `
        <div class="modal show" tabindex="-1">
			<div class="modal-dialog">
				<div class="modal-content"> 
					<div class="modal-header">
						<h5 class="modal-title">${title}</h5>
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

	renderTitle(html) {
		this.modalBody.innerHTML = html
	}

	renderBody(html) {
		this.modalBody.innerHTML = html
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
	constructor(title) {
		super(title);
		this.renderBody()
		this.form = this.modal.querySelector('.modal form')
		this.handleFormSubmit()
	}

	renderBody() {
		this.modalBody.innerHTML = `
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

/**
 * Modal: New Visit
 */
class ModalVisit extends Modal {
	constructor(title) {
		super(title);
		this.renderBody()
		this.doctorSelect = this.modal.querySelector('#doctor')
		this.form = this.modal.querySelector('.modal form')
		this.handleDoctorSelect()
		this.handleFormSubmit()
	}

	renderBody() {
		this.modalBody.innerHTML = `
		<form class="form-add-visit">
			<div class="mb-3">
				<select class="form-select" id="doctor" name="doctor">
					<option value="" disabled selected>Select a doctor</option>          
					<option value="cardiologist">Cardiologist</option>
					<option value="dentist">Dentist</option>
					<option value="therapist">Therapist</option>
				</select>
			</div>
			<button type="submit" class="btn btn-primary">Submit</button>
		</form>
		`
	}

	handleDoctorSelect() {
		this.form.addEventListener('submit', e => {
			e.preventDefault()
			console.log('form submit')
			const doctor = this.form.doctor.value

			if (doctor !== '') {

			}
		})
	}

	handleFormSubmit() {
		this.doctorSelect.addEventListener('change', e => {
			const doctor = e.target.value
			console.log('doctor', doctor)

		})
	}

}


export {Modal, ModalLogin, ModalVisit}
