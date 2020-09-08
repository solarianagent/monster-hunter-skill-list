import {skillSearchService} from './skill-search.service.js';
import {selectedSkillsService} from '../shared/selected-skill.service.js';
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
      <button>Select Armor</button>
    `;

    const skillListElement = this.shadowRoot.querySelector('app-skill-list');

    const skillSearch = this.shadowRoot.querySelector('app-skill-search');
    skillSearch.addEventListener('addSkill', ({detail}) => this.addSkillToList(skillListElement, detail));

    const selectArmorButton = this.shadowRoot.querySelector('button');
    selectArmorButton.addEventListener('click', () => this.gotoSelectArmor())
  }

  /**
   * Updates skill list with new skill and then updates skill list element
   * @param {SkillListComponent} skillListElement - Skill list component to set skillList on
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

  /**
   * Changes the main component to the select armor
   */
  gotoSelectArmor() {
    selectedSkillsService.setSelectedSkills(this.skillList);

    this.dispatchEvent(new CustomEvent('switchComponent', {
      bubbles: true,
      composed: true,
      detail: 'armor-selector'
    }));
  }
}

customElements.define('app-skill-selector', SkillSelectorComponent);