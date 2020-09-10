import './steps.component.js';

class SkillInfoStepsComponent extends HTMLElement {
  steps = [
    'Get information on the "skill" by calling skillSearchService.getSkill() with the value from this.getAttribute("skillName")',
    'Add the <app-info> tag with the header attribute equal "skill.name" and info attribute equal to "skill.description"'
  ];

  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    const stepsComponent = document.createElement('app-steps');
    stepsComponent.setAttribute('saveKey', 'skill-info');
    this.shadowRoot.appendChild(stepsComponent);
    stepsComponent.steps = this.steps;
  }
}

customElements.define('app-skill-info-steps', SkillInfoStepsComponent);