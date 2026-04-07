const to = (promise) =>
  promise.then((data) => ({ data })).catch((error) => ({ error }))

export default to
