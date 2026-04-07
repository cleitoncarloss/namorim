import execute from '@directive/execute'

const formStateRestore = (target, method) =>
  execute(method).on(target).after('formStateRestoreCallback')

export default formStateRestore
