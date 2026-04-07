import listeners from '@router/listeners'

const urlFor = (name, params = {}) => {
  const path = listeners.find(({ page }) => page?.name === name)?.path
  return path
    ? path.replace(/:(\w+)/g, (_, key) => params[key] ?? `:${key}`)
    : '#'
}

export default urlFor
