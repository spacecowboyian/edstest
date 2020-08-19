import { LitElement, html, css, unsafeCSS } from 'lit-element';
import styles from "./base.css";

export * from 'lit-element';
export class EDSElement extends LitElement {
  static get styles() {
    return [styles].map(unsafeCSS);
  };

  constructor() {
    super();
    this.init();
  }

  init() {

  }

  get html() {
    return html;
  }

  static get css() {
    return css;
  }

  static get unsafeCSS() {
    return unsafeCSS;
  }

  addStyle(id, stylesheet) {
    return addStyle(id, stylesheet);
  }

  render() {
    throw Error('You must provide a render method');
  }

  // Convenience (Chrome's shortcut)
  $(selector) {
    return this.shadowRoot.querySelector(selector);
  }

  // Convenience (Chrome's shortcut)
  $$(selector) {
    return this.shadowRoot.querySelectorAll(selector);
  }

  $id(id) {
    return this.shadowRoot.getElementById(id);
  }
}

customElements.define('eds-element', EDSElement);
window.EDSElement = EDSElement;
