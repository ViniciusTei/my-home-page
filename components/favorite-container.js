const template = `
  <a data-link href="" class="min-w-[70px] text-center">
    <div class="border-1 border-black rounded shadow-md flex items-center justify-center p-4">
      <i data-icon class="fa-brands fa-2xl"></i>
    </div>
    <p data-label></p>
  </a>
`

class FavoriteContainer extends HTMLElement {
  constructor() {
    super()
    this.innerHTML = template
    this.link = this.querySelector("[data-link]")
    this.icon = this.querySelector("[data-icon]")
    this.label = this.querySelector("[data-label]")
  }

  static get observedAttributes() {
    return ["icon", "color", "label", "link"]
  }
 
  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "icon":
        this.updateIcon(newValue) 
        break;
      case "color":
        this.updateColor(newValue) 
        break;
      case "link":
        this.updateLink(newValue) 
        break;
      case "label":
        this.updateLabel(newValue) 
        break;
      default:
        console.log('No property with this name.')
        break;
    }
  }

  updateIcon(icon) {
    this.icon.classList.add(icon)
  }

  updateColor(color) {
    this.icon.style.color = color
  }

  updateLabel(label) {
    this.label.innerText = label
  }

  updateLink(link) {
    this.link.setAttribute("href", link)
  }

}

customElements.define("favorite-container", FavoriteContainer)

