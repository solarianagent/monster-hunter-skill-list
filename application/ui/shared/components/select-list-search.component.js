import './select-list.component.js';

class SelectListSearchComponent extends HTMLElement {
  searchFunction;

  constructor() {
    super();
    this.attachShadow({mode: 'open'});

    this.shadowRoot.innerHTML = `
      <input type="text">
      <app-select-list></app-select-list>
    `;

    const input = this.shadowRoot.querySelector('input');
    const appSelectList = this.shadowRoot.querySelector('app-select-list');

    input.addEventListener('input', event => this.onSearchUpdate(event, appSelectList));
  }

  /**
   * 
   * @param {Event} event input event that has the text
   * @param {SelectListComponent} appSelectList 
   */
  async onSearchUpdate(event, appSelectList) {
    appSelectList.items = await this.searchFunction(event.target.value);
  }
}

customElements.define('app-select-list-search', SelectListSearchComponent);