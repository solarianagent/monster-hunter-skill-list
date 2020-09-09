import '../shared/components/select-list-search.component.js';
import {skillSearchService} from './skill-search.service.js';

/**
 * @event addSkill - Event that fires when a skill is added with the added skill name
 */
class SkillSearchComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});

    const appSelectListSearch = document.createElement('app-select-list-search');
    appSelectListSearch.searchFunction = searchText => this.getSkillsByText(searchText);
    this.shadowRoot.appendChild(appSelectListSearch);
  }

  getSkillsByText(searchText) {
    return skillSearchService.getSkillSuggestions(searchText);
  }
}

customElements.define('app-skill-search', SkillSearchComponent);