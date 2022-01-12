import { DATA } from './assets/data.js'
import JobCard from './components/job-card.js'

customElements.define('job-card', JobCard)
const cards = []
const app = document.querySelector('.container')

DATA.forEach((item) => {
	const template = document.createElement('template')
	const card = `<job-card
                  logo=${item.logo}
                  new=${item.new}
                  featured=${item.featured}
                  company="${item.company}"
                  position="${item.position}"
                  tags=${[...item.languages, ...item.tools]}
                  postedat="${item.postedAt}"
                  contract="${item.contract}"
                  location="${item.location}"
                  >
                  </job-card>`
	template.innerHTML = card
	cards.push(template.content.cloneNode(true))
})

app.append(...cards)
