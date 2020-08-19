import { EDSElement, define, html, unsafeCSS } from "eds-core";
import componentStyles from "./styles.scss";

export default class EDSBreadcrumbsElement extends EDSElement {
  static get styles() {
    return EDSElement.styles.concat([
      componentStyles,
    ].map(unsafeCSS));
  }

  static get properties() {
    return {
      background: {
        type: String,
        reflect: true,
      },
      separator: {
        type: String,
        reflect: true,
      },
    };
  }

  render() {
    const {
      background,
      separator,
    } = this;

    return html`
      <style>::slotted(a)::before { content: "${this.separator || "/"}"; }</style>
      <div class="${this.background || "white"}">
        <nav class="eds-breadcrumbs">
          <slot name="icon"></slot>
          <slot></slot>
        </nav>
      </div>
    `;
  }
}

define("eds-breadcrumbs", EDSBreadcrumbsElement);
