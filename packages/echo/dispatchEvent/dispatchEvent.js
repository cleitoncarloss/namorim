const dispatchEvent = (eventName) => (_target, _propertyKey, descriptor) => {
  if (descriptor.set) {
    descriptor.set = new Proxy(descriptor.set, {
      async apply(target, context, args) {
        await Reflect.apply(target, context, args)

        if (context.isConnected) {
          context.dispatchEvent(
            new CustomEvent(eventName, {
              bubbles: true,
              composed: true,
              cancelable: true,
              detail: args[0],
            }),
          )
        }
      },
    })
  }

  if (descriptor.value) {
    descriptor.value = new Proxy(descriptor.value, {
      async apply(target, context, args) {
        const output = await Reflect.apply(target, context, args)

        context.dispatchEvent(
          new CustomEvent(eventName, {
            bubbles: true,
            composed: true,
            cancelable: true,
            detail: output,
          }),
        )

        return output
      },
    })
  }
}

export default dispatchEvent
