import execute from '@directive/execute'

const adopted = (target, method) =>
  execute(method).on(target).after('adoptedCallback')

export default adopted
