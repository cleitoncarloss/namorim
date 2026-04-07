import { drainable } from '@siphon/interfaces'

const drain = (target, method) => {
  Reflect.defineProperty(target, drainable, {
    value() {
      return this[method](...arguments)
    },
  })
}

export default drain
