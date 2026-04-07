function formData(event, next) {
  next(Object.fromEntries(new FormData(event.target, event.submitter)))
}

export default formData
