import './steps.component.js';

class AppStartStepsComponent extends HTMLElement {
  steps = [
    'Update AppComponent to have the <main> tag in it\'s innerHTML',
    'Insert the <app-main></app-main> tag in the index.html',
    'Create a <script></script> with a type of module, async and a src pointing to the app.component.js file'
  ];

  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    const stepsComponent = document.createElement('app-steps');
    stepsComponent.setAttribute('saveKey', 'app-start');
    this.shadowRoot.appendChild(stepsComponent);
    stepsComponent.steps = this.steps;
  }
}

customElements.define('app-start-steps', AppStartStepsComponent);