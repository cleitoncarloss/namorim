class SignIn extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <h1>Login</h1>
    `;
  }
}

customElements.define('nm-sign-in', SignIn);
