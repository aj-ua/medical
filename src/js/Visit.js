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
	}

	doctorSelectListener() {
		this.select.addEventListener('change', () => {
			const selectedDoctor = this.select.value
			this.removeInputs()
			const VisitConstructor = this.doctors[selectedDoctor]
			const visitCardInputs = new VisitConstructor(this.modal)
			this.renderDefaultInputs()
			visitCardInputs.render()
		})
	}


	renderDefaultInputs() {
		const html = `
            <label for="fullName" data-input>ПІБ</label>
            <input class="modal__fullname" type="text" id="fullName" name="fullName" value="${this.fullName}" data-input>

            <label for="visitType" data-input>Мета візиту</label>
            <input class="modal__visitType" type="text" id="visitType" name="visitType" value="${this.visitType}" data-input>

            <label for="visitDescription" data-input>Короткий опис візиту</label>
            <textarea class="modal__visitDescription" id="visitDescription" name="visitDescription" data-input>${this.visitDescription}</textarea>

            <label for="visitUrgency" data-input>Терміновість</label>
            <select class="modal__visitUrgency" id="visitUrgency" name="visitUrgency" data-input>
                <option value="normal" ${this.visitUrgency === 'normal' ? 'selected' : ''}>Звичайна</option>
                <option value="priority" ${this.visitUrgency === 'priority' ? 'selected' : ''}>Пріоритетна</option>
                <option value="urgent" ${this.visitUrgency === 'urgent' ? 'selected' : ''}>Невідкладна</option>
             </select>
        `
		this.modal.setInputs(html)
	}

	removeInputs() {
		this.inputs = document.querySelectorAll('[data-input]')
		this.inputs.forEach(input => input.remove())
		this.inputs = []
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
            <label for="bloodPressure" data-input>Тиск</label>
            <input class="modal__class=bloodPressure" type="text" id="bloodPressure" name="bloodPressure" value="${this.bloodPressure}" data-input>
            <label for="bodyMassIndex" data-input>Індекс маси тіла</label>
            <input class="modal__bodyMassIndex" type="text" id="bodyMassIndex" name="bodyMassIndex" value="${this.bodyMassIndex}" data-input>
            <label for="cardiovascularDisease" data-input>Перенесені захворювання серцево-судинної системи</label>
            <input class="modal__cardiovascularDisease" type="text" id="cardiovascularDisease" name="cardiovascularDisease" value="${this.cardiovascularDisease}" data-input>
            <label for="age" data-input>Вік</label>
            <input class="modal__age" type="text" id="age" name="age" value="${this.age}" data-input>
    `
		this.modal.setInputs(html)
	}
}


class VisitDentist extends Visit {
	constructor(modal) {
		super(modal)
		this.visitDate = ''
	}

	render() {
		const html = `
            <label for="visitDate" data-input>Остання дата прийому</label>
            <input class="modal__visitDate" type="date" id="visitDate" name="visitDate" value="${this.visitDate}" data-input>
        `
		this.modal.setInputs(html)
	}

}

class VisitTherapist extends Visit {
	constructor(modal) {
		super(modal)
		this.age = ''
	}

	render() {
		const html = `
            <label for="age" data-input>Вік</label>
            <input class="modal__age" type="text" id="age" name="age" value="${this.age}" data-input>
        `
		this.modal.setInputs(html)
	}
}
export {Visit,VisitCardiologist,VisitDentist,VisitTherapist}
