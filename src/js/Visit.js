import {token} from './functions'

export default class Visit {
	constructor(modal) {
		this.modal = modal
		this.doctors = {
			cardiologist: VisitCardiologist,
			dentist: VisitDentist,
			therapist: VisitTherapist
		}

		this.fullName = ''
		this.doctor = ''
		this.visitType = ''
		this.visitDescription = ''
		this.visitUrgency = ''

		this.render()
		this.form = document.querySelector('.modal form')
		this.handleDoctorSelect()
	}

	render() {
		const html = `
		<div class="mb-3">
			<select class="form-select" id="doctor" name="doctor">
				<option value="" disabled selected>Select a doctor</option>          
				<option value="cardiologist" ${this.doctor === 'cardiologist' ? 'selected' : ''}>Cardiologist</option>
				<option value="dentist" ${this.doctor === 'dentist' ? 'selected' : ''}>Dentist</option>
				<option value="therapist" ${this.doctor === 'therapist' ? 'selected' : ''}>Therapist</option>
			</select>
		</div>
		<div class="visit-inputs"></div>
		`
		this.modal.renderFormInputs(html)
	}

	renderInputs(html, append = false) {
		const visitInputs = document.querySelector('.visit-inputs')
		if (append) {
			visitInputs.insertAdjacentHTML('beforeend', html)
		} else {
			visitInputs.innerHTML = html
		}
	}

	handleDoctorSelect() {
		console.log('this.form', this.form)
		this.form.querySelector('#doctor').addEventListener('change', (e) => {
			const selectedDoctor = e.target.value
			console.log('selectedDoctor', doctor)

			const VisitConstructor = this.doctors[selectedDoctor]
			const visitCardInputs = new VisitConstructor(this.modal)
			this.renderDefaultInputs()
			visitCardInputs.render()
		})

		this.handleFormSubmit()
	}


	renderDefaultInputs() {
		const html = `
            <div class="mb-3">
				<label for="fullName" class="form-label">Name</label>
				<input class="form-control" type="text" id="fullName" name="fullName" value="${this.fullName}">
			</div>
			
			<div class="mb-3">
				<label for="visitType" class="form-label">Purpose</label>
				<input class="form-control" type="text" id="visitType" name="visitType" value="${this.visitType}">
			</div>
			
			<div class="mb-3">
				<label for="visitDescription" class="form-label">Description</label>
				<input class="form-control" type="text" id="visitDescription" name="visitDescription">${this.visitDescription}</input>
			</div>
			
			<div class="mb-3">
				<label for="visitUrgency" class="form-label">Urgency</label>
				<select class="form-select" id="visitUrgency" name="visitUrgency">
					<option value="normal" ${this.visitUrgency === 'normal' ? 'selected' : ''}>Звичайна</option>
					<option value="priority" ${this.visitUrgency === 'priority' ? 'selected' : ''}>Пріоритетна</option>
					<option value="urgent" ${this.visitUrgency === 'urgent' ? 'selected' : ''}>Невідкладна</option>
				</select>
			</div>
        `
		this.renderInputs(html)
	}

	handleFormSubmit() {
		const form = document.querySelector('.form-add-visit'),
			submitBtn = form.querySelector('button[type="submit"]')
		console.log('add visit submit')
		this.form.addEventListener('submit', e => {
			e.preventDefault()
			submitBtn.classList.add('disabled')

			const formData = new FormData(form);
			console.log(Object.fromEntries(formData));

			fetch("https://ajax.test-danit.com/api/v2/cards", {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`
				},
				body: JSON.stringify(Object.fromEntries(formData))
			})
				.then(response => response.json())
				.then(response => {
					console.log(response)
					this.modal.closeModal()
					alert("Added visit")
				})
		})
	}
}

class VisitCardiologist extends Visit {
	constructor(modal) {
		super(modal)
		this.bloodPressure = ''
		this.bodyMassIndex = ''
		this.cardiovascularDisease = ''
		this.age = ''
	}

	render() {
		const html = `
            <div class="mb-3">
				<label for="bloodPressure" class="form-label">Pressure</label>
				<input class="form-control" type="text" id="bloodPressure" name="bloodPressure" value="${this.bloodPressure}">
			</div>
			
			<div class="mb-3">
				<label for="bodyMassIndex" class="form-label">Body index</label>
				<input class="form-control" type="text" id="bodyMassIndex" name="bodyMassIndex" value="${this.bodyMassIndex}">
			</div>
			
			
			<div class="mb-3">
				<label for="cardiovascularDisease" class="form-label">Past heart deceases</label>
				<input class="form-control" type="text" id="cardiovascularDisease" name="cardiovascularDisease" value="${this.cardiovascularDisease}">
			</div>
			
			<div class="mb-3">
				<label for="age" class="form-label">Age</label>
				<input class="form-control" type="text" id="age" name="age" value="${this.age}">
			</div>
    	`

		super.renderInputs(html, true)
	}
}


class VisitDentist extends Visit {
	constructor(modal) {
		super(modal)
		this.visitDate = ''
	}

	render() {
		const html = `
            <div class="mb-3">
				<label for="visitDate" class="form-label">Last visit date</label>
				<input class="form-control" type="date" id="visitDate" name="visitDate" value="${this.visitDate}">
			</div>
        `
		super.renderInputs(html, true)
	}

}

class VisitTherapist extends Visit {
	constructor(modal) {
		super(modal)
		this.age = ''
	}

	render() {
		const html = `
            <div class="mb-3">
				<label for="age" class="form-label">Age</label>
				<input class="form-control" type="text" id="age" name="age" value="${this.age}">
			</div>
        `
		super.renderInputs(html, true)
	}
}

export {Visit, VisitCardiologist, VisitDentist, VisitTherapist}
