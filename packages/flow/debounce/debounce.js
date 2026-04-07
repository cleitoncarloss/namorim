const debounce = (wait = 250) => {
  return (_target, _propertyKey, descriptor) => {
    let timeoutID

    const apply = (original, context, args) => (
      (timeoutID = clearTimeout(timeoutID)),
      (timeoutID = setTimeout(() => original.apply(context, args), wait)),
      context
    )

    if (descriptor.set) {
      descriptor.set = new Proxy(descriptor.set, { apply })
    }

    if (descriptor.value) {
      descriptor.value = new Proxy(descriptor.value, { apply })
    }

    return descriptor
  }
}

export default debounce
