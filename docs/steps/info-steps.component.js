import './steps.component.js';

class InfoStepsComponent extends HTMLElement {
  steps = [
    'Update InfoComponent to include an <h1> followed by a <p> in the shadowRoot',
    'Fill the <h1> tag with the value from this.getAttribute("header")',
    'Fill the <p> tag with the value from this.getAttribute("info")'
  ];

  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    const stepsComponent = document.createElement('app-steps');
    stepsComponent.setAttribute('saveKey', 'info');
    this.shadowRoot.appendChild(stepsComponent);
    stepsComponent.steps = this.steps;
  }
}

customElements.define('app-info-steps', InfoStepsComponent);