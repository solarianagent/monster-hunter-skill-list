class SelectListSearchComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
  }
}

customElements.define('app-select-list-search', SelectListSearchComponent);