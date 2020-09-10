class AppComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: flex;
          height:100%;
        }
        aside {
          flex: 1;
        }

        main {
          flex: 3;
        }
      </style>
      <aside class="nes-container is-dark with-title">
        <p class="title">Steps</p>
        <nav></nav>
      </aside>
      <main></main>
    `;
  }
}

customElements.define('app-main', AppComponent);