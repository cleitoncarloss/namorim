const getItem = (key) =>
  document.cookie.match(`(^|;)\\s*${key}\\s*=\\s*([^;]+)`)?.pop()

export default getItem
