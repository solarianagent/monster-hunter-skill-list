import './steps.component.js';

class AppSecondUpdateStepsComponent extends HTMLElement {
  steps = [
    'Add an event listener on <app-skill-select-search> for the "listItemSelected" event and when it fires dyanmically load <app-skill-info> with the "skillName" attribute set to the selected skill'  
  ];

  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    const stepsComponent = document.createElement('app-steps');
    stepsComponent.setAttribute('saveKey', 'app-second-update');
    this.shadowRoot.appendChild(stepsComponent);
    stepsComponent.steps = this.steps;
  }
}

customElements.define('app-second-update-steps', AppSecondUpdateStepsComponent);