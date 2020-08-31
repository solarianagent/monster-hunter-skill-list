import {skillSearchService} from './skill-search.service.js';
import {skillListService} from './skill-list.service.js';

/**
 * @event addSkill - Event that fires when a skill is added with the added skill name
 */
class SkillSearchComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});

    this.shadowRoot.innerHTML = `
      <form autocomplete="off">
        <label>
          Find a Skill: 
          <input name="skillSearchInput" id="skillSearchInput" placeholder="Find a Skill" type="search" list="skillsToAddList">
        </label> 
        <button type="submit">Add Skill</button>
        <datalist id="skillsToAddList"></datalist>
      </form>
    `;

    const datalist = this.shadowRoot.getElementById('skillsToAddList');

    const label = this.shadowRoot.getElementById('skillSearchInput');
    label.addEventListener('input', event => this.updateSuggestionList(datalist, event))

    const form = this.shadowRoot.querySelector('form');
    form.addEventListener('submit', this.addSkill);
  }

  async updateSuggestionList(datalist, inputEvent) {
    const searchText = inputEvent.target.value;
    const results = await skillSearchService.getSkillSuggestions(searchText);

    datalist.innerHTML = results
      .filter(result => result !== searchText)
      .map(result => `<option value="${result}">`).join('\n');
  }

  /**
   * 
   * @param {Event} event - submit form event
   */
  addSkill(event) {
    const formData = new FormData(event.target);

    this.dispatchEvent(new CustomEvent('addSkill', {
      bubbles: true, 
      composed: true,
      detail: formData.get('skillSearchInput')
    }));

    event.preventDefault();
  }
}

customElements.define('app-skill-search', SkillSearchComponent);