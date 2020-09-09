class AppComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    const mainElement = document.createElement('main');
    this.shadowRoot.appendChild(mainElement);

    this.switchComponent(mainElement, './skills/skill-search.component.js', 'app-skill-search')
      .then(appSkillSearch => {
        appSkillSearch.addEventListener(
          'listItemSelected', 
          ({detail}) => this.switchToSkillInfoComponent(detail, mainElement)
        );
      });
  }

  /**
   * Switchs to the Skill Info Component
   * @param {string} skillName - the skill name to load
   * @param {string} mainElement - the element to add the skill info to
   */
  async switchToSkillInfoComponent(skillName, mainElement) {
    await this.switchComponent(
      mainElement,
      './skills/skill-info.component.js', 
      'app-skill-info', 
      {skillName}
    );
  }

  /**
   * 
   * @param {Element} mainElement the main element of the page
   * @param {string} filepath filepath of the component you want to load
   * @param {string} tag the tag name of the tag
   * @param {object} attributes a map of strings with the attribute name as the key and the value as the value
   */
  async switchComponent(mainElement, filepath, tag, attributes={}) {
    await import(filepath);
    
    if (mainElement.firstChild) {
      mainElement.removeChild(mainElement.firstChild);
    }

    const attributesText = Object.entries(attributes)
      .map(([key, value]) => `${key}="${value}"`)
      .join(' ');

    mainElement.innerHTML = `<${tag} ${attributesText}></${tag}>`;

    return mainElement.firstChild;
  }
}

customElements.define('app-main', AppComponent);