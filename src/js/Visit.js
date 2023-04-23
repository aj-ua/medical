import {token} from './functions'
import {CardiologistCard, DentistCard, TherapistCard} from "./Card"
import Message from "./Message"

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
		this.form = document.querySelector('.modal form')
	}

	render(obj) {
		const html = `
		<div class="mb-3">
			<select class="form-select" id="doctor" name="doctor">
				<option value="" disabled selected>Select a doctor</option>          
				<option value="cardiologist" ${obj.hasOwnProperty('doctor') && obj.doctor === 'cardiologist' ? 'selected' : ''}>Cardiologist</option>
				<option value="dentist" ${obj.hasOwnProperty('doctor') && obj.doctor === 'dentist' ? 'selected' : ''}>Dentist</option>
				<option value="therapist" ${obj.hasOwnProperty('doctor') && obj.doctor === 'therapist' ? 'selected' : ''}>Therapist</option>
			</select>
		</div>
		<div class="visit-inputs"></div>
		`
		this.modal.renderFormInputs(html)
		this.handleDoctorSelect(obj)
	}

	renderInputs(html, append = false) {
		const visitInputs = document.querySelector('.visit-inputs')
		if (append) {
			visitInputs.insertAdjacentHTML('beforeend', html)
		} else {
			visitInputs.innerHTML = html
		}
	}

	handleDoctorSelect(obj) {
		const doctorValue = obj.hasOwnProperty('doctor') ? obj.doctor : ''
		console.log('doctorValue', doctorValue)
		console.log('obj', obj)
		if (doctorValue !== '') {
			const VisitConstructor = this.doctors[doctorValue]
			const visitCardInputs = new VisitConstructor(this.modal)
			this.renderDefaultInputs(obj)
			visitCardInputs.render(obj)
		}

		this.form.querySelector('#doctor').addEventListener('change', (e) => {
			const selectedDoctor = e.target.value
			console.log('selectedDoctor', doctor)

			const VisitConstructor = this.doctors[selectedDoctor]
			const visitCardInputs = new VisitConstructor(this.modal)
			this.renderDefaultInputs(obj)
			visitCardInputs.render(obj)
		})

		if (obj.hasOwnProperty('id')) {
			console.log('obj.hasOwnProperty(id)')
			const cardId = obj.id
			this.handleFormEditSubmit(cardId)
		} else {
			this.handleFormSubmit()
		}

	}

	renderDefaultInputs(obj) {
		const html = `
            <div class="mb-3">
				<label for="fullName" class="form-label">Name</label>
				<input class="form-control" type="text" id="fullName" name="fullName" value="${obj.hasOwnProperty('fullName') ? obj.fullName : ''}">
			</div>
			
			<div class="mb-3">
				<label for="visitType" class="form-label">Purpose</label>
				<input class="form-control" type="text" id="visitType" name="visitType" value="${obj.hasOwnProperty('visitType') ? obj.visitType : ''}">
			</div>
			
			<div class="mb-3">
				<label for="visitDescription" class="form-label">Description</label>
				<input class="form-control" type="text" id="visitDescription" name="visitDescription" value="${obj.hasOwnProperty('visitDescription') ? obj.visitDescription : ''}"></input>
			</div>
			
			<div class="mb-3">
				<label for="visitUrgency" class="form-label">Urgency</label>
				<select class="form-select" id="visitUrgency" name="visitUrgency">
					<option value="normal" ${obj.hasOwnProperty('visitUrgency') && obj.visitUrgency === 'normal' ? 'selected' : ''}>Звичайна</option>
					<option value="priority" ${obj.hasOwnProperty('visitUrgency') && obj.visitUrgency === 'priority' ? 'selected' : ''}>Пріоритетна</option>
					<option value="urgent" ${obj.hasOwnProperty('visitUrgency') && obj.visitUrgency === 'urgent' ? 'selected' : ''}>Невідкладна</option>
				</select>
			</div>
        `
		this.renderInputs(html)
	}

	handleFormSubmit() {
		const form = document.querySelector('.modal form'),
			submitBtn = form.querySelector('button[type="submit"]')
		console.log('add visit submit')
		this.form.addEventListener('submit', e => {
			e.preventDefault()
			submitBtn.classList.add('disabled')

			const formData = new FormData(form)
			console.log(Object.fromEntries(formData))

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

					new Message('Added visit', 'success')

					const cardsValues = Object.values(response)
					const [doctor, ...rest] = cardsValues

					let objDoctor
					switch (doctor) {
						case "cardiologist":
							objDoctor = new CardiologistCard(...cardsValues);
							break;
						case "dentist":
							objDoctor = new DentistCard(...cardsValues);
							break;
						case "therapist":
							objDoctor = new TherapistCard(...cardsValues);
							break;
						default:
							console.log("wrong doctor type");
							break;
					}
					objDoctor.render()
				})
		})
	}

	renderEdit(modal, obj) {
		this.render(obj)
	}

	handleFormEditSubmit(cardId) {
		const form = document.querySelector('.modal form'),
			submitBtn = form.querySelector('button[type="submit"]')
		console.log('edit visit submit')
		this.form.addEventListener('submit', e => {
			e.preventDefault()
			submitBtn.classList.add('disabled')

			const formData = new FormData(form)
			console.log(Object.fromEntries(formData))

			fetch(`https://ajax.test-danit.com/api/v2/cards/${cardId}`, {
				method: 'PUT',
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

					new Message('Updated visit', 'primary')

					const cardsValues = Object.values(response)
					const [doctor, ...rest] = cardsValues

					let objDoctor
					switch (doctor) {
						case "cardiologist":
							objDoctor = new CardiologistCard(...cardsValues);
							break;
						case "dentist":
							objDoctor = new DentistCard(...cardsValues);
							break;
						case "therapist":
							objDoctor = new TherapistCard(...cardsValues);
							break;
						default:
							console.log("wrong doctor type");
							break;
					}
					document.querySelector(`.card[data-id="${cardId}"]`).remove()
					objDoctor.render()
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

	render(obj) {
		const html = `
            <div class="mb-3">
				<label for="bloodPressure" class="form-label">Pressure</label>
				<input class="form-control" type="text" id="bloodPressure" name="bloodPressure" value="${obj.hasOwnProperty('bloodPressure') ? obj.bloodPressure : ''}">
			</div>
			
			<div class="mb-3">
				<label for="bodyMassIndex" class="form-label">Body index</label>
				<input class="form-control" type="text" id="bodyMassIndex" name="bodyMassIndex" value="${obj.hasOwnProperty('bodyMassIndex') ? obj.bodyMassIndex : ''}">
			</div>
			
			
			<div class="mb-3">
				<label for="cardiovascularDisease" class="form-label">Past heart deceases</label>
				<input class="form-control" type="text" id="cardiovascularDisease" name="cardiovascularDisease" value="${obj.hasOwnProperty('cardiovascularDisease') ? obj.cardiovascularDisease : ''}">
			</div>
			
			<div class="mb-3">
				<label for="age" class="form-label">Age</label>
				<input class="form-control" type="text" id="age" name="age" value="${obj.hasOwnProperty('age') ? obj.age : ''}">
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

	render(obj) {
		const html = `
            <div class="mb-3">
				<label for="visitDate" class="form-label">Last visit date</label>
				<input class="form-control" type="date" id="visitDate" name="visitDate" value="${obj.hasOwnProperty('visitDate') ? obj.visitDate : ''}">
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

	render(obj) {
		const html = `
            <div class="mb-3">
				<label for="age" class="form-label">Age</label>
				<input class="form-control" type="text" id="age" name="age" value="${obj.hasOwnProperty('age') ? obj.age : ''}">
			</div>
        `
		super.renderInputs(html, true)
	}
}

export {Visit, VisitCardiologist, VisitDentist, VisitTherapist}
