function enter(event, next) {
  if (/enter/i.test(event.key)) next(event)
}

export default enter
