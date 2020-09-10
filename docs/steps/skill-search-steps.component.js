import './steps.component.js';

class SkillSearchStepsComponent extends HTMLElement {
  steps = [
    'Update SkillSearchComponent\'s shadowRoot to have an <app-select-list-search> tag',
    'Set the SelectListSearchComponent\'s  searchFunction to a function that takes in a "skillName" and then returns skillSearchService.getSkillSuggestions("skillName")'
  ];

  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    const stepsComponent = document.createElement('app-steps');
    stepsComponent.setAttribute('saveKey', 'skill-search');
    this.shadowRoot.appendChild(stepsComponent);
    stepsComponent.steps = this.steps;
  }
}

customElements.define('app-skill-search-steps', SkillSearchStepsComponent);