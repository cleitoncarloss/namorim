import execute from '@directive/execute'

const formReset = (target, method) =>
  execute(method).on(target).after('formResetCallback')

export default formReset
