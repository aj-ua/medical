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


export {Modal, ModalVisit}
