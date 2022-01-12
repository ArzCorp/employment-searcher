import { flex_between_center, VARIABLES, pill } from '../assets/styles.js'

class JobCard extends HTMLElement {
	constructor() {
		super()
		this.attachShadow({ mode: 'open' })
	}

	static get observedAttributes() {
		return [
			'logo',
			'new',
			'featured',
			'company',
			'position',
			'tags',
			'postedat',
			'contract',
			'location',
		]
	}

	attributeChangedCallback(value, oldValue, newValue) {
		if (value !== oldValue) {
			this[value] = newValue
		}
	}

	getStyles() {
		return `
      <style>
        * {
          margin: 0px;
          padding: 0px;
          box-sizing: border-box;
        }

        :host {
          ${VARIABLES}
        }

        .card {
          ${flex_between_center}
          padding: var(--spacing-x3);
          background-color: white;
          border-left: 5px solid var(--primary-color);
          border-radius: 5px;
        }

        .card-pill__new {
          ${pill}
          background-color: var(--primary-color);
          color: white;
        }

        .card-pill__featured {
          ${pill}
          background-color: black;
          color: white;
        }

        .card-details {
          ${flex_between_center}
          gap: var(--spacing-x2)
        }

        .card-description__job-type {
          ${flex_between_center}
          gap: var(--spacing-x1);
          color: var(--primary-color);
          font-weight: var(--font-bold)
        }

        .card-description__job-name {
          color: black;
          margin: var(--spacing-x1) 0px;
          font-size: var(--heading-principal);
          font-weight: var(--font-bold);
          will-change: auto;
          transition: .3s;
        }

        .card-description__job-name:hover {
          color: var(--primary-color)
        }

        .card-description__job-data {
          display: flex;
          align-items: center;
          gap: var(--spacing-x1);
          color: var(--light-black-color)
        }

        .card-description__dot {
          width: 5px;
          height: 5px;
          background-color: var(--black-color);
          border-radius: 100%
        }

        .card-tags {
          display: flex;
          align-items: center;
          gap: var(--spacing-x2)
        }

        .card-tag {
          background-color: var(--light-primary-color);
          padding: var(--spacing-min) var(--spacing-x1);
          border-radius: var(--spacing-min);
          color: var(--primary-color);
          font-weight: var(--font-bold);
          will-change: auto;
          transition: .3s;
        }

        .card-tag:hover {
          background-color: var(--primary-color);
          color: white;
        }
      </style>
    `
	}

	renderTags() {
		if (this.tags) {
			const array = this.tags.split(',')
			return array.map((tag) => `<p class="card-tag">${tag}</p>`)
		}
	}

	getTemplate() {
		const template = document.createElement('template')
		template.innerHTML = `
      ${this.getStyles()}
      <article class="card" >
        <div class="card-details">
          <div class="card-img__container">
            <img class="card-img" src=${this.logo} alt="logo" />
          </div>
          <div class="card-description">
            <div class="card-description__job-type">
              <p class="card-company">${this.company}</p>
              ${this.new === 'true' ? `<p class="card-pill__new">new</p>` : ''}
              ${
								this.featured === 'true'
									? `<p class="card-pill__featured">featured</p>`
									: ''
							}
            </div>
            <p class="card-description__job-name">${this.position}</p>
            <div class="card-description__job-data">
              <p>${this.postedat}</p>
              <p class="card-description__dot"></p>
              <p>${this.contract}</p>
              <p class="card-description__dot"></p>
              <p>${this.location}</p>
            </div>
          </div>
        </div>
        <div class="card-tags">
          ${this.renderTags()}
        </div>
      </article>
    `
		return template
	}

	render() {
		this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true))
	}

	connectedCallback() {
		this.render()
	}
}

export default JobCard
