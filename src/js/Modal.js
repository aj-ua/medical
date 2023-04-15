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
			const token = this.fetchToken(this.form.email.value, this.form.password.value).then(data => console.log(data))
		})
	}

	async fetchToken(email, password) {
		const response = await fetch('https://ajax.test-danit.com/api/v2/cards/login', {
			method: 'POST',
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({email: email, password: password}),
			format: 'json'
		})
		const data = await response.text();
		return data;
	}

}

export {Modal, ModalLogin}
