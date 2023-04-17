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
				<option value="cardiologist">Cardiologist</option>
				<option value="dentist">Dentist</option>
				<option value="therapist">Therapist</option>
			</select>
		</div>
		`
		this.modal.renderFormInputs(html)
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
				<label for="fullName" class="form-label">ПІБ</label>
				<input class="form-control" type="text" id="fullName" name="fullName" value="${this.fullName}">
			</div>
			
			<div class="mb-3">
				<label for="visitType" class="form-label">Мета візиту</label>
				<input class="form-control" type="text" id="visitType" name="visitType" value="${this.visitType}">
			</div>
			
			<div class="mb-3">
				<label for="visitDescription" class="form-label">Короткий опис візиту</label>
				<textarea class="form-control" id="visitDescription" name="visitDescription">${this.visitDescription}</textarea>
			</div>
			
			<div class="mb-3">
				<label for="visitUrgency" class="form-label">Терміновість</label>
				<select class="form-select" id="visitUrgency" name="visitUrgency">
					<option value="normal" ${this.visitUrgency === 'normal' ? 'selected' : ''}>Звичайна</option>
					<option value="priority" ${this.visitUrgency === 'priority' ? 'selected' : ''}>Пріоритетна</option>
					<option value="urgent" ${this.visitUrgency === 'urgent' ? 'selected' : ''}>Невідкладна</option>
				</select>
			</div>
        `
		this.modal.renderFormInputs(html)
	}

	removeInputs() {
		this.inputs = document.querySelectorAll('[data-input]')
		this.inputs.forEach(input => input.remove())
		this.inputs = []
	}

	handleFormSubmit() {
		const form = document.querySelector('.form-add-visit')
		console.log('add visit submit')
		this.form.addEventListener('submit', e => {
			e.preventDefault()

			fetch("https://ajax.test-danit.com/api/v2/cards", {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`
				},
				body: JSON.stringify({
					title: 'Визит к кардиологу',
					description: 'Плановый визит',
					doctor: 'Cardiologist',
					bp: '24',
					age: 23,
					weight: 70
				})
			})
				.then(response => response.json())
				.then(response => console.log(response))
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
				<label for="bloodPressure" class="form-label">Тиск</label>
				<input class="form-control" type="text" id="bloodPressure" name="bloodPressure" value="${this.bloodPressure}">
			</div>
			
			<div class="mb-3">
				<label for="bodyMassIndex" class="form-label">Індекс маси тіла</label>
				<input class="form-control" type="text" id="bodyMassIndex" name="bodyMassIndex" value="${this.bodyMassIndex}">
			</div>
			
			
			<div class="mb-3">
				<label for="cardiovascularDisease" class="form-label">Перенесені захворювання серцево-судинної системи</label>
				<input class="form-control" type="text" id="cardiovascularDisease" name="cardiovascularDisease" value="${this.cardiovascularDisease}">
			</div>
			
			<div class="mb-3">
				<label for="age" class="form-label">Вік</label>
				<input class="form-control" type="text" id="age" name="age" value="${this.age}">
			</div>
    	`
		this.modal.renderFormInputs(html, true)
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
				<label for="visitDate" class="form-label">Остання дата прийому</label>
				<input class="form-control" type="date" id="visitDate" name="visitDate" value="${this.visitDate}">
			</div>
        `
		this.modal.renderFormInputs(html, true)
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
				<label for="age" class="form-label">Вік</label>
				<input class="form-control" type="text" id="age" name="age" value="${this.age}">
			</div>
        `
		this.modal.renderFormInputs(html, true)
	}
}

export {Visit, VisitCardiologist, VisitDentist, VisitTherapist}
