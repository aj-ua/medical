export default class Message {
	constructor(text, className = 'primary') {
		this.message = document.querySelector('#message')
		this.text = text
		this.className = className
		this.render()
	}

	render() {
		this.message.innerHTML = `<div class="alert alert-${this.className}">${this.text}</div>`
		setTimeout(() => {
			this.message.innerHTML = ''
		}, 3000)
	}
}
