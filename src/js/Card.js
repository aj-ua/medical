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
				<button type="button" class="btn btn-outline-dark js-edit"><i class="fa-solid fa-edit"></i> Edit</button>
				<h4 class="card-title">${this.fullName}</h4>
				<span class="card-subtitle"><span class="text-muted">status: </span><strong>${this.status}</strong></span>
			</div>
			<div class="card-body">
				<div class="card-text">
					<p>Visit type: <strong>${this.visitType}</strong>
					<p>Urgency: <strong>${this.visitUrgency}</strong>
					<p>Description: <strong>${this.visitDescription}</strong>
				</div>
				<div class="d-flex gap-2">
					<a href="#" class="card-link js-toggle">Show details</a>
				</div>
			</div>
		</div>`

		this.cardsEl.insertAdjacentHTML('beforeend', html)
	}

}
