class StepsComponent extends HTMLElement {
  form;

  constructor() {
    super();
    this.attachShadow({mode: 'open'});

    this.shadowRoot.innerHTML = `
      <link href="./node_modules/nes.css/css/nes.min.css" rel="stylesheet">
      <style>
        label {
          padding-bottom: 20px;
          display: flex;
        }

        span {
          word-break: break-word;
        }

      </style>
      <section class="nes-container with-title">
        <p class="title">Steps to Complete</p>
        <form></form>
      </section>
    `;

    this.form = this.shadowRoot.querySelector('form');
  }

  /**
   * @param {string[]} list
   */
  set steps(list) {
    let saveFile = localStorage.getItem(this.getAttribute('saveKey')) || '[]';

    saveFile = JSON.parse(saveFile); 

    this.form.innerHTML = list.map((step, index) => {
      const checkText = saveFile.length > 0 && saveFile[index] ? 'checked' : '';

      return `<label>
        <input type="checkbox" class="nes-checkbox" ${checkText}>
        <span>${step.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</span>
      </label>`
    }
    ).join('\n');
  }

  disconnectedCallback() {
    const saveKey = this.getAttribute('saveKey');

    const saveFile = Array.from(this.form.querySelectorAll('input.nes-checkbox'))
      .map(element => element.checked);

    localStorage.setItem(saveKey, JSON.stringify(saveFile));
  }

  attributeChangeCallback(attrName, oldValue, newValue) {
    console.log(`${attrName} changed from ${oldValue} to ${newValue}`);
  }
}

customElements.define('app-steps', StepsComponent);