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
				this.renderCards(token)

			} else {

				this.fetchToken(email, password).then(token => {
					localStorage.setItem('medicalToken', token)
					this.renderCards(token)
				})

			}

			// document.querySelector(".header__btn-login").classList.add("header__btn--hidden")
			// document.querySelector(".header__btn-create-card").classList.remove("header__btn--hidden")
			this.closeModal()
		})
	}

	async getToken() {

	}

	async fetchToken(email, password) {
		const response = await fetch('https://ajax.test-danit.com/api/v2/cards/login', {
			method: 'POST',
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({email: email, password: password}),
			format: 'json'
		})
		const data = await response.text()
		return data;
	}

	// Get cards from localStorage or server
	async getCards(token) {
		let data;
		if (localStorage.getItem('medicalCards') !== null) {
			data = JSON.parse(localStorage.getItem('medicalCards'))
		} else {
			data = this.fetchCards(token)
		}
		return data
	}

	async fetchCards(token) {
		let response = await fetch("https://ajax.test-danit.com/api/v2/cards", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});

		const data = await response.json()

		if (data !== "") {
			localStorage.setItem('medicalCards', JSON.stringify(data))
		}

		return data
	}

	async renderCards(token) {
		const response = this.getCards(token)
		response.then(json => console.log('json', json))

		const cardsEl = document.querySelector('#cards')
	}

}

export {Modal, ModalLogin}
