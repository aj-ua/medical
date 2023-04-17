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
					<a href="#" class="card-link js-toggle mr-auto">Show details <i class="fa-solid fa-chevron-down"></i></a>
					<div>
						<button type="button" class="btn btn-outline-danger js-delete"><i class="fa-solid fa-trash"></i></button>
						<button type="button" class="btn btn-outline-dark js-edit"><i class="fa-solid fa-edit"></i></button>
					</div>
				</div>
			</div>
		</div>`

		this.cardsEl.insertAdjacentHTML('beforeend', html)
		this.handleDelete()
	}

	renderText(html, append = false) {
		const cardText = document.querySelector(`.card[data-id="${this.id}"] .card-text`)
		if (append) {
			cardText.insertAdjacentHTML('beforeend', html)
		} else {
			cardText.innerHTML = html
		}
	}

	handleDelete() {
		this.cardsEl.querySelectorAll('.js-delete').forEach(el => {
			el.addEventListener("click", e => {
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
		<div class="card-text__hidden">
			<p>Доктор: <strong>${this.doctor}</strong></p>
			<p>Вік: <strong>${this.age}</strong></p>
			<p>Тиск: <strong>${this.bloodPressure}</strong></p>
			<p>Індекс тіла: <strong>${this.bodyMassIndex}</strong></p>
			<p>Серцеві захворювання: <strong>${this.cardiovascularDisease}</strong></p>
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
		<div class="card-text__hidden">
			<p>Доктор: <strong>${this.doctor}</strong></p>
			<p>Дата візиту: <strong>${this.visitDate}</strong></p>
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
		<div class="card-text__hidden">
			<p>Доктор: <strong>${this.doctor}</strong></p>
			<p>Вік: <strong>${this.age}</strong></p>
		</div>
          <p class="board-of-cards__patient-card__property-name">Доктор:</p>
          <p class="board-of-cards__patient-card__property-name">${this.doctor}</p>
          <p class="board-of-cards__patient-card__property-name">Вік:</p>
      `
		super.renderText(cardContent, true)
	}
}
