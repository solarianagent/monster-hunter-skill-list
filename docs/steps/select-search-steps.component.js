import './steps.component.js';

class SelectSearchStepsComponent extends HTMLElement {
  steps = [
    'Update SelectListSearchComponent to have an <input> tag followed by an <app-select-list> tag',
    'Give the SelectListSearchComponent a searchFunction to show it\'s existense. The function will take a name and return a Promise<String[]>',
    'Add an "input" event listener to the input and have it call the searchFunction. It should then get the list from the promise that is returned from calling searchFunction and set it as the list property on the <app-select-list> element'
  ];

  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    const stepsComponent = document.createElement('app-steps');
    stepsComponent.setAttribute('saveKey', 'select-search');
    this.shadowRoot.appendChild(stepsComponent);
    stepsComponent.steps = this.steps;
  }
}

customElements.define('app-select-search-steps', SelectSearchStepsComponent);