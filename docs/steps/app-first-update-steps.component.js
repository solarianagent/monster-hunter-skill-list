import './steps.component.js';

class AppFirstUpdateStepsComponent extends HTMLElement {
  steps = [
    'Update the App Component to include <app-skill-list-select-search> tag in the shadowRoot',
    'Test out the Search!'
  ];

  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    const stepsComponent = document.createElement('app-steps');
    stepsComponent.setAttribute('saveKey', 'app-first-update');
    this.shadowRoot.appendChild(stepsComponent);
    stepsComponent.steps = this.steps;
  }
}

customElements.define('app-first-update-steps', AppFirstUpdateStepsComponent);