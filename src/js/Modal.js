export default class Modal {
	constructor(title) {
		this.render(title)
		this.modal = document.querySelector('.modal')
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
						<form class="form-add-visit">
							<div class="form-inputs">
								...
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

	renderBody(html) {
		const modalBody = this.modal.querySelector('.modal-body')
		modalBody.innerHTML = html
	}

	renderFormInputs(html, append = false) {
		const formInputs = this.modal.querySelector('.form-inputs')
		if (append) {
			formInputs.insertAdjacentHTML('beforeend', html)
		} else {
			formInputs.innerHTML = html
		}
	}

	closeModal() {
		this.modal.remove()
	}

	handleCloseModal() {
		this.closeButton.addEventListener('click', e => {
			this.closeModal()
		})
		this.modal.addEventListener('click', e => {
			e.stopPropagation()
			if (e.target.classList.contains('modal')) {
				this.closeModal()
			}
		})
	}
}

