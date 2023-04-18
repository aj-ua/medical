import {token} from './functions'

export default class Card {
	constructor(fullName, visitType, visitDescription, visitUrgency, id) {
		this.cardsEl = document.querySelector('#cards')
		this.status = 'Open'
		this.visitType = visitType
		this.fullName = fullName
		this.visitDescription = visitDescription
		this.visitUrgency = visitUrgency
		this.id = id
	}

	render() {
		const html = `
		<div class="card" data-id="${this.id}">
			<div class="card-header">
				<h4 class="card-title">${this.fullName}</h4>
				<span class="card-subtitle"><span class="text-muted">status: </span><strong>${this.status}</strong></span>
			</div>
			<div class="card-body">
				<div class="card-text">
					<p>Visit type: <strong>${this.visitType}</strong></p>
					<p>Urgency: <strong>${this.visitUrgency}</strong></p>
					<p>Description: <strong>${this.visitDescription}</strong></p>
				</div>
				<div class="d-flex align-items-center justify-content-between gap-2 mt-4">
					<a href="#" class="card-link js-card-toggle mr-auto">Show details <i class="fa-solid fa-chevron-down"></i></a>
					<div>
						<button type="button" class="btn btn-outline-danger js-delete"><i class="fa-solid fa-trash"></i></button>
						<button type="button" class="btn btn-outline-dark js-edit"><i class="fa-solid fa-edit"></i></button>
					</div>
				</div>
			</div>
		</div>`

		this.cardsEl.insertAdjacentHTML('beforeend', html)
		this.card = document.querySelector(`.card[data-id="${this.id}"]`)
		this.handleDelete()
		this.toggleHiddenText()
	}

	renderText(html, append = false) {
		const cardText = this.card.querySelector('.card-text')
		if (append) {
			cardText.insertAdjacentHTML('beforeend', html)
		} else {
			cardText.innerHTML = html
		}
	}

	handleDelete() {
		this.card.querySelector('.js-delete').addEventListener("click", e => {
			e.preventDefault()
			console.log('delete')
			const card = e.target.closest('.card'),
				cardId = card.dataset.id

			if (confirm("Remove this item?")) {
				fetch(`https://ajax.test-danit.com/api/v2/cards/${cardId}`, {
					method: 'DELETE',
					headers: {
						'Authorization': `Bearer ${token}`
					},
				})
					.then(response => {
						if (response.status == 200) {
							card.remove()
						}
					})
			}
		})
	}

	toggleHiddenText() {
		this.card.querySelector('.js-card-toggle').addEventListener('click', e => {
			e.preventDefault()
			console.log('click')
			const cardTextHidden = this.card.querySelector('.card-text__hidden')
			if (cardTextHidden) {
				cardTextHidden.classList.toggle('d-none')
			}
		})
	}
}


export class CardiologistCard extends Card {
	constructor(doctor, fullName, visitType, visitDescription, visitUrgency, bloodPressure, bodyMassIndex, cardiovascularDisease, age, id) {
		super(fullName, visitType, visitDescription, visitUrgency, id)
		this.doctor = doctor
		this.bloodPressure = bloodPressure
		this.bodyMassIndex = bodyMassIndex
		this.cardiovascularDisease = cardiovascularDisease
		this.age = age
	}

	render() {
		super.render()
		const cardContent = `
		<div class="card-text__hidden d-none">
			<p>Doctor: <strong>${this.doctor}</strong></p>
			<p>Age: <strong>${this.age}</strong></p>
			<p>Pressure: <strong>${this.bloodPressure}</strong></p>
			<p>Body index: <strong>${this.bodyMassIndex}</strong></p>
			<p>Heart deceases: <strong>${this.cardiovascularDisease}</strong></p>
		</div>
  		`
		super.renderText(cardContent, true)
	}
}


export class DentistCard extends Card {
	constructor(doctor, fullName, visitType, visitDescription, visitUrgency, visitDate, id) {
		super(fullName, visitType, visitDescription, visitUrgency, id)
		this.doctor = doctor
		this.visitDate = visitDate
	}

	render() {
		super.render()
		let cardContent = `
		<div class="card-text__hidden d-none">
			<p>Doctor: <strong>${this.doctor}</strong></p>
			<p>Last date: <strong>${this.visitDate}</strong></p>
		</div>
    `
		super.renderText(cardContent, true)
	}
}


export class TherapistCard extends Card {
	constructor(doctor, fullName, visitType, visitDescription, visitUrgency, age, id) {
		super(fullName, visitType, visitDescription, visitUrgency, id)
		this.doctor = doctor
		this.age = age
	}

	renderingCard() {
		super.render()
		let cardContent = `
		<div class="card-text__hidden d-none">
			<p>Doctor: <strong>${this.doctor}</strong></p>
			<p>Age: <strong>${this.age}</strong></p>
		</div>
      `
		super.renderText(cardContent, true)
	}
}
