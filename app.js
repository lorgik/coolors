const cols = document.querySelectorAll('.col')

document.addEventListener('keydown', event => {
	event.preventDefault()
	if (event.code.toLowerCase() === 'space') {
		setRandomColors()
	}
})

document.addEventListener('click', event => {
	const type = event.target.dataset.type
	
	if (type === 'lock') {
		const target = event.target.children[0]
		target.classList.toggle('fa-lock-open')
		target.classList.toggle('fa-lock')
	} else if (type === 'copy') {
		copyToClickBoard(event.target.textContent)
		showHint(event.target)
	}
})

function generateRandomColor() {
	const hexCodes = '0123456789ABCDEF'
	let color = ''

	for (let i = 0; i < 6; i++) {
		color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
	}
	return '#' + color
}

function copyToClickBoard(text) {
	return navigator.clipboard.writeText(text)
}

function setRandomColors(isInitial) {
	const colors = isInitial ? getColorsFromHash() : []
	
	cols.forEach((col, index) => {
		const isLocked = col.querySelector('i').classList.contains('fa-lock')
		const text = col.querySelector('h2')
		const button = col.querySelector('button')
		
		if (isLocked) {
			colors.push(text.textContent)
			return
		}
		
		const color = isInitial
			? colors[index]
				? colors[index]
				: generateRandomColor()
			: generateRandomColor()
		
		if (!isInitial) {
			colors.push(color)
		}
		
		text.textContent = color
		col.style.backgroundColor = color
		
		setTextColor(text, color)
		setTextColor(button, color)
	})
	
	updateColorsHash(colors)
}

function setTextColor(text, color) {
	const luminance = chroma(color).luminance()
	text.style.backgroundColor = luminance > 0.5 ? '#282828' : '#fff'
	text.style.boxShadow = luminance > 0.5 ? '0 10px 25px rgba(255, 255, 255, 0.1)' : '0 10px 25px rgba(0, 0, 0, 0.1)'
	text.style.color = color
}

function updateColorsHash(colors = []) {
	document.location.hash = colors.map(col => {
		return col.substring(1)
	}).join('-')
}

function getColorsFromHash() {
	if (document.location.hash.length > 1) {
		return document.location.hash.substring(1).split('-').map(color => '#' + color)
	}
	return []
}

function showHint(target) {
	if (!target.classList.contains('hint')) {
		target.classList.toggle('hint')
		setTimeout(() => {
			target.classList.toggle('hint')
		}, 1500)
	}
}


setRandomColors(true)