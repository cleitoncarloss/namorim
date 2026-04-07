import { drainable, pumpable } from './interfaces'

const Siphon = (Klass) => {
  class Host extends Klass {
    async connectedCallback() {
      super.connectedCallback?.()
      this.parentNode[drainable]?.(await this[pumpable]())
    }
  }

  return Host
}

export default Siphon
