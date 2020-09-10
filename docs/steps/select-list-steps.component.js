import './steps.component.js';

class SelectListStepsComponent extends HTMLElement {
  steps = [
    'Update SelectListComponent to have the <ul> tag in it\'s innerHTML',
    'When the items, string[], property is set on the SelectListComponent, fill the <ul> tag from above with <li> tags that contain the name of each item.',
    'When an <li> is clicked, dispatch an event of "itemListSelected" with the text inside the <li> as the "detail"'
  ];

  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    const stepsComponent = document.createElement('app-steps');
    stepsComponent.setAttribute('saveKey', 'select-list');
    this.shadowRoot.appendChild(stepsComponent);
    stepsComponent.steps = this.steps;
  }
}

customElements.define('app-select-list-steps', SelectListStepsComponent);