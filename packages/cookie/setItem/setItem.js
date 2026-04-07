const setItem = (key, value = '') => {
  const domain = window.location.hostname
  const expires = ''
  const path = '/'

  document.cookie = `${key}=${value};domain=${domain};expires=${expires};path=${path}`
}

export default setItem
