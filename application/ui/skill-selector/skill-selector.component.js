import {skillSearchService} from './skill-search.service.js';
import './skill-list.component.js';
import './skill-search.component.js';

class SkillSelectorComponent extends HTMLElement {
  skillList = new Set();

  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      <app-skill-search></app-skill-search>
      <app-skill-list></app-skill-list>
    `;

    const skillListElement = this.shadowRoot.querySelector('app-skill-list');

    const skillSearch = this.shadowRoot.querySelector('app-skill-search');
    skillSearch.addEventListener('addSkill', ({detail}) => this.addSkillToList(skillListElement, detail));
  }

  /**
   * Updates skill list with new skill and then updates skill list element
   * @param {Element} skillListElement - Skill list component to set skillList on
   * @param {string} skillName - name of the skill to add
   */
  async addSkillToList(skillListElement, skillName) {
    const foundSkill = await skillSearchService.getSkill(skillName);

    if (!foundSkill) {
      throw new Error('Unable to find specific skill');
    } else {
      this.skillList.add(foundSkill);
      skillListElement.skillList = Array.from(this.skillList.values());
    }
  }
}

customElements.define('app-skill-selector', SkillSelectorComponent);