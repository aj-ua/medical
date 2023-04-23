document.querySelectorAll('#filters select').forEach(el => {
	el.addEventListener('change', filterCards)
})
document.querySelectorAll('#filters input').forEach(el => {
	el.addEventListener('keyup', filterCards)
})

function filterCards() {
	const form = document.querySelector('#filters'),
		status = form.status.value,
		urgency = form.urgency.value,
		search = form.search.value.toLowerCase()
	console.log(status, urgency, search)

	document.querySelectorAll('.card').forEach(card => {
		let matchStatus = false,
			matchUrgency = false,
			matchSearch = false

		if (status === '*' || card.dataset.status === status) {
			matchStatus = true
		}

		if (urgency === '*' || card.dataset.urgency === urgency) {
			matchUrgency = true
		}

		const title = card.querySelector('.card-title').textContent.toLowerCase(),
			description = card.querySelector('.card-description').textContent.toLowerCase()
		if (search === '' || title.includes(search) || description.includes(search)) {
			matchSearch = true
		}

		if (matchStatus && matchUrgency && matchSearch) {
			card.classList.remove('d-none')
		} else {
			card.classList.add('d-none')
		}

	})
}
