class InfoComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
  }
}

customElements.define('app-info', InfoComponent);