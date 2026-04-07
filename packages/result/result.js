const result = new Proxy(
  {},
  {
    get:
      (_, variant) =>
      (...values) => ({
        match: (handlers = {}) => {
          const target = Object.hasOwn(handlers, variant)
            ? handlers[variant]
            : handlers._
          return target?.(...values)
        },
      }),
  },
)

export default result
