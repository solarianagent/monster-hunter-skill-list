class AppComponent extends HTMLElement {
  pages = {
    'App Start': {filename: 'app-start-steps.component.js', tag: 'app-start-steps'},
    'Select List': {filename: 'select-list-steps.component.js', tag: 'app-select-list-steps'},
    'Select Search': {filename: 'select-search-steps.component.js', tag: 'app-select-search-steps'},
    'Skill Search': {filename: 'skill-search-steps.component.js', tag: 'app-skill-search-steps'},
    'App First Update': {filename: 'app-first-update-steps.component.js', tag: 'app-first-update-steps'},
    'Info': {filename: 'info-steps.component.js', tag: 'app-info-steps'},
    'Skill Info': {filename: 'skill-info-steps.component.js', tag: 'app-skill-info-steps'},
    'App Second Update': {filename: 'app-second-update-steps.component.js', tag: 'app-second-update-steps'},
  };



  constructor() {
    super();
    this.attachShadow({mode: 'open'});

    this.shadowRoot.innerHTML = `
      <link href="./node_modules/nes.css/css/nes.min.css" rel="stylesheet">
      <style>
        :host {
          display: flex;
          height:100%;
        }
        aside {
          flex: 2;
        }

        form {
          display:flex;
          flex-direction: column;
        }

        main {
          flex: 3;
        }
      </style>
      <aside class="nes-container is-dark with-title">
        <p class="title">Steps</p>
        <form>
          ${Object.keys(this.pages).map((option, index) => {
            const checkedText = index == 0 ? 'checked' : '';
            return `
              <label>
                <input type="radio" class="nes-radio is-dark" value="${option}" name="step" ${checkedText}>
                <span>${option}</span>
              </label>`;
          }).join('\n')}
        </form>
      </aside>
      <main></main>
    `;

    const mainElement = this.shadowRoot.querySelector('main');
    const formElement = this.shadowRoot.querySelector('form');

    this.loadComponent(mainElement, formElement, this.pages);

    formElement.querySelectorAll('input.nes-radio')
          .forEach(menuItem => menuItem.addEventListener(
            'click', 
            () => this.loadComponent(mainElement, formElement, this.pages)
          ));
  }

  /**
   * 
   * @param {Element} mainElement 
   * @param {Element} formElement 
   */
  async loadComponent(mainElement, formElement, pages) {
    const formData = new FormData(formElement);
    const {filename, tag} = pages[formData.get('step')];
    
    await import(`./steps/${filename}`);
    mainElement.innerHTML = `<${tag}></${tag}>`;
  }
}

customElements.define('app-main', AppComponent);