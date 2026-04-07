import { pumpable } from '@siphon/interfaces'

const pump = (target, method) => {
  Reflect.defineProperty(target, pumpable, {
    value() {
      return this[method](...arguments)
    },
  })
}

export default pump
