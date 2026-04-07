function stop(event, next) {
  event.stopPropagation()
  next(event)
}

export default stop
