const render = (renderFn, ...styles) => (target) => {
  const { connectedCallback } = target.prototype

  target.prototype.connectedCallback = function (...args) {
    connectedCallback?.apply(this, args)

    this.shadowRoot.innerHTML = renderFn.call(this)
    this.shadowRoot.adoptedStyleSheets = styles.map((style) => style.call(this))
  }

  return target
}

export default render
