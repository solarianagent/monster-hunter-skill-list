class InfoComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    
    const header = this.getAttribute('header');
    const info = this.getAttribute('info');

    this.shadowRoot.innerHTML = `
      <h1>${header}</h1>
      <p>${info}</p>
    `;
  }
}

customElements.define('app-info', InfoComponent);