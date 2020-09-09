class AppComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    const mainElement = document.createElement('main');
    this.shadowRoot.appendChild(mainElement);
  }
}

customElements.define('app-main', AppComponent);