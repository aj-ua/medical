class Modal {
	constructor() {
		this.renderContent()
		this.modal = document.querySelector('.modal')
		this.closeButton = this.modal.querySelector('.btn-close')
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
								<label for="email" class="form-label">Email</label>
								<input type="email" class="form-control" id="email">
							</div>
							<div class="mb-3">
								<label for="password" class="form-label">Password</label>
								<input type="password" class="form-control" id="password">
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

	closeModal() {
		this.modal.remove()
	}

	handleCloseModal() {
		this.closeButton.addEventListener('click', e => {
			this.closeModal()
		})
	}
}


export default Modal
