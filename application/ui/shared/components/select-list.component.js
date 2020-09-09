class SelectListComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
  }


  set items(list) {
    // Remove the first child to get rid of event listeners
    if (this.shadowRoot.firstChild) {
      this.shadowRoot.removeChild(this.shadowRoot.firstChild);
    }

    // Set html of component
    this.shadowRoot.innerHTML = `
      <ul>
        ${list.map(item => `<li>${item}</li>`).join('\n')}
      </ul>
    `;

    // Add Event Lister to Parent and Let it bubble from the li
    this.shadowRoot.querySelector('ul')
      .addEventListener('click', event => this.selectItem(event));
  }

  /**
   * Dispatches an event with the selected item
   * @param {Event} event item in list
   */
  selectItem(event) {
    // Should be able to get the item from the innerHTML of the li tag
    const item = event.target.innerText;

    this.dispatchEvent(new CustomEvent(
      'listItemSelected', 
      {bubbles: true, composed: true, detail: item}
    ));
  }
}

customElements.define('app-select-list', SelectListComponent);