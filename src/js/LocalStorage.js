import Card from "./Card";

export default class LocalStorage {
	constructor(token) {
		this.token = ''
		this.cards = []
		this.init()
	}

	init() {
		if (localStorage.getItem('medicalToken') !== null) {

			console.log('storage init')
			this.token = localStorage.getItem('medicalToken')

		}
	}

	// Get token from localStorage or server
	async getToken(email, password) {
		let token
		if (localStorage.getItem('medicalToken') !== null) {

			token = localStorage.getItem('medicalToken')

		} else {

			token = this.fetchToken(email, password).then(token => {
				localStorage.setItem('medicalToken', token)
				this.token = token
				console.log('this.token after fetch', this.token)
				this.getCards(token)
			})

		}
	}

	async fetchToken(email, password) {
		const response = await fetch('https://ajax.test-danit.com/api/v2/cards/login', {
			method: 'POST',
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({email: email, password: password}),
			format: 'json'
		})
		const data = await response.text()
		return data;
	}

	// Get cards from localStorage or server
	async getCards(token = '') {
		let data = [];
		if (localStorage.getItem('medicalCards') !== null) {
			data = JSON.parse(localStorage.getItem('medicalCards'))
			this.cards = data
		} else if (token.length) {
			data = this.fetchCards(token)
			this.cards = data
		}
		return data
	}

	async fetchCards(token) {
		let response = await fetch("https://ajax.test-danit.com/api/v2/cards", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});

		const data = await response.json()

		if (data !== "") {
			localStorage.setItem('medicalCards', JSON.stringify(data))
		}

		return data
	}

	async renderCards() {
		if (this.cards.length) {
			console.log('cards: ', this.cards);
		} else {
			let token
			if (this.token.length) {
				console.log('this.token', this.token)
				const response = this.getCards(this.token)
				response.then(json => {
					console.log('json', json)
					if (json !== null) {
						document.querySelector('.cards__nothing').remove()
						json.forEach(el => {
							const cardsValues = Object.values(el);
							const [doctor, ...rest] = cardsValues;
							console.log(doctor);

							const card = new Card(...cardsValues)
							card.renderContent()
						})
					} else {
						document.querySelector('#cards').insertAdjacentHTML('beforeend', '<h3 class="cards__nothing">No visits have been added.</h3>')
					}
				})

			} else {
				console.log('NO this.token')
			}
		}

	}
}
