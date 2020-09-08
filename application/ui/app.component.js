class AppComponent extends HTMLElement {
  /** @type Element */
  mainElement;

  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.mainElement = document.createElement('main');
    this.shadowRoot.appendChild(this.mainElement);
    this.switchComponent('skill-selector');
  }

  async switchComponent(componentName) {
    await import(`./${componentName}/${componentName}.component.js`);
    
    if (this.mainElement.firstChild) {
      this.mainElement.removeChild(this.mainElement.firstChild);
    }

    const currentElement = document.createElement(`app-${componentName}`);
    this.mainElement.appendChild(currentElement);
    currentElement.addEventListener('switchComponent', ({detail}) => this.switchComponent(detail));
  }
}

customElements.define('app-main', AppComponent);