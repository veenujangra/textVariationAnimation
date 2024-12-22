import './style.css'
import gsap from 'gsap'

class HoverOverMe {
  constructor() {
    this.element = document.querySelector('h1')
    this.elementChildren = {
      multiplier: 1,
    }

    this.elementChildren = [...this.element.children].map((child) => {
      return { element: child, multiplier: 1 }
    })
    this.log(this.elementChildren)
    this.radius = 300

    this.addEvents()
    this.update()
  }

  handleMouseMove(event) {
    const { clientX, clientY } = event
    this.mouse = { x: clientX, y: clientY }
    this.delta = { x: 0, y: 0 }

    // handle for all children
    for (let i = 0; i < this.elementChildren.length; i++) {
      this.getDelta(clientX, clientY, i)
    }
  }

  getDelta(clientX, clientY, index) {
    const rect = this.elementChildren[index].element.getBoundingClientRect()
    const rectX = rect.x + rect.width / 2
    const rectY = rect.y + rect.height / 2

    this.delta = {
      x: rectX - clientX,
      y: rectY - clientY,
    }
    this.getMultiplier(index)
  }

  getMultiplier(index) {
    // normalize delta values to -1 to 1 according to the radius
    const distance = Math.sqrt(this.delta.x ** 2 + this.delta.y ** 2)
    const normalizedDistance = Math.min(distance / this.radius, 1)

    this.elementChildren[index].multiplier = Math.min(1.3 - normalizedDistance, 1)

    // this.log(this.multiplier)
  }

  update() {
    // update font weight for all children
    for (let i = 0; i < this.elementChildren.length; i++) {
      const newWeight = this.elementChildren[i].multiplier * 800
      let currWeight = this.elementChildren[i].element.style.getPropertyValue('font-variation-settings').split(' ')[1]

      // interpolate font weight
      gsap.utils.interpolate(currWeight, newWeight, 0.001)

      this.elementChildren[i].element.style.setProperty('font-variation-settings', `'wght' ${newWeight}`)
    }
    // const newWeight = this.multiplier * 800
    // let currWeight = this.elementChildren[0].style.getPropertyValue('font-variation-settings').split(' ')[1]

    // // interpolate font weight
    // gsap.utils.interpolate(currWeight, newWeight, 0.001)

    // this.elementChildren[0].element.style.setProperty('font-variation-settings', `'wght' ${newWeight}`)

    requestAnimationFrame(this.update.bind(this))
  }

  log(e) {
    console.log(e)
  }

  addEvents() {
    window.addEventListener('mousemove', this.handleMouseMove.bind(this))
  }
}

new HoverOverMe()
