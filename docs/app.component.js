class AppComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: flex;
        }
        aside {
          background-color: #555555;
          flex: 1;
        }

        main {
          flex: 3;
        }
      </style>
      <aside>
        <nav></nav>
      </aside>
      <main></main>
    `;
  }
}

customElements.define('app-main', AppComponent);