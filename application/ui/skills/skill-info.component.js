import {skillSearchService} from './skill-search.service.js';

class SkillInfoComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});

    const skillName = this.getAttribute('skillName');
    this.showSkillInfo(skillName);
  }

  async showSkillInfo(skillName) {
    const [skillInfo] = await Promise.all([
      skillSearchService.getSkill(skillName),
      import('../shared/components/info.component.js')
    ]);

    const {name, description} = skillInfo;
    this.shadowRoot.innerHTML = `<app-info header="${name}" info="${description}"></app-info>`;
  }
}

customElements.define('app-skill-info', SkillInfoComponent);