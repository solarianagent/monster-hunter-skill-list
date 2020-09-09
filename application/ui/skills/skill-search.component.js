import {skillSearchService} from './skill-search.service.js';

class SkillSearchComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
  }
}

customElements.define('app-skill-search', SkillSearchComponent);