import {skillListService} from './skill-list.service.js';

/**
 * @property {string[]} skillList
 */
class SkillListComponent extends HTMLElement {
  skillListElement;

  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `<ul></ul>`;
    this.skillListElement = this.shadowRoot.querySelector('ul');
  }

  set skillList(skills) {
    this.skillListElement.innerHTML = skills.map(skill => `<li>${skill}</li>`).join('\n');
  }
}

customElements.define('app-skill-list', SkillListComponent);