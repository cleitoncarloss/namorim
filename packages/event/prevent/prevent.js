function prevent(event, next) {
  event.preventDefault()
  next(event)
}

export default prevent
