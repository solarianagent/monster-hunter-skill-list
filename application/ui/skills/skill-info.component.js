import {skillSearchService} from './skill-search.service.js';

class SkillInfoComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
  }
}

customElements.define('app-skill-info', SkillInfoComponent);