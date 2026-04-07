import { isPainted } from '@dom/interfaces'

const element = {
  from(select) {
    function get(target, key) {
      if (!select[isPainted]) return target[key]

      if (/^(style|value|validationMessage|validity)$/i.test(key)) {
        return select.shadowRoot.querySelector('select')[key]
      }

      if (/^(append)$/i.test(key)) {
        const element = select.shadowRoot.querySelector('select')
        return element[key].bind(select)
      }

      return select.shadowRoot.querySelector('select').getAttribute(key)
    }

    function set(target, key, value) {
      if (!select[isPainted]) {
        target[key] = value
        return true
      }

      if (/^(value|innerHTML)$/i.test(key)) {
        select.shadowRoot.querySelector('select')[key] = value || ''
        return true
      }

      return value
        ? select.shadowRoot.querySelector('select').setAttribute(key, value)
        : select.shadowRoot.querySelector('select').removeAttribute(key)
    }

    return new Proxy({}, { get, set })
  },
}

export default element
