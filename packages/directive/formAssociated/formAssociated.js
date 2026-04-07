import execute from '@directive/execute'

const formAssociated = (target, method) =>
  execute(method).on(target).after('formAssociatedCallback')

export default formAssociated
