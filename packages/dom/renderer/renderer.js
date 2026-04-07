const renderer = (textContent) => {
  document.startViewTransition(() => {
    renderer.parentElement.innerHTML = textContent
  })
}

Object.assign(renderer, {
  bind: (parentElement) => {
    renderer.parentElement = parentElement
    return renderer
  },
})

export default renderer
