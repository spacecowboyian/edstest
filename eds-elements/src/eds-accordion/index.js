import { EDSElement, define, html, unsafeCSS } from "eds-core";
import edsDetails from "@experian/eds-styles/dist/components/eds-details.css";
import "./panel.js";

export default class EDSAccordionElement extends EDSElement {
  static get styles() {
    return EDSElement.styles.concat([
      edsDetails,
    ].map(unsafeCSS));
  }

  static get properties() {
    return {
      multiple: {
        type: Boolean,
        reflect: true,
      },
    };
  }

  render() {
    return html`
      <div class="eds-accordion">
        <slot></slot>
      </div>
    `;
  }
}

define("eds-accordion", EDSAccordionElement);
