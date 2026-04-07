import execute from '@directive/execute'

const connected = (target, method) =>
  execute(method).on(target).after('connectedCallback')

export default connected
