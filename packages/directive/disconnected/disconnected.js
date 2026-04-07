import execute from '@directive/execute'

const disconnected = (target, method) =>
  execute(method).on(target).after('disconnectedCallback')

export default disconnected
