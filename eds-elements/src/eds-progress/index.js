import { EDSElement, define, html, unsafeCSS } from "eds-core";
import edsProgressStyles from "@experian/eds-styles/dist/components/eds-progress.css";

export default class EDSProgressElement extends EDSElement {
  static get styles() {
    return EDSElement.styles.concat([
      ":host{display:inline-block;}",
      edsProgressStyles,
    ].map(unsafeCSS));
  }

  static get properties() {
    return {
      baselineValue: {
        type: Number,
        reflect: true,
      },
      max: {
        type: Number,
        reflect: true,
      },
      value: {
        type: Number,
        reflect: true,
      },
      motif: {
        type: String,
        reflect: true,
      },
      ariaLabelValue: {
        type: String,
        reflect: true,
      },
    };
  }

  render() {
    const {
      baselineValue,
      value,
      max = 1,
      motif = "magenta",
      ariaLabelValue = "Progress value",
    } = this;

    return html`
      <div class="eds-progress eds-progress.${motif}" style="width:100%;">
        ${
          isNaN(value)
          ? html`<progress class="eds-progress_.progress eds-progress_#primary"></progress>`
          : html`<progress class="eds-progress_.progress eds-progress_#primary" value="${value}" max="${max}" aria-label="${ariaLabelValue}"></progress>`
        }
        ${
          isNaN(value) || isNaN(baselineValue)
          ? ""
          : html`<progress class="eds-progress_.progress eds-progress_#baseline" value="${baselineValue}" max="${max}" aria-hidden="true"></progress>`
        }
      </div>
    `;
  }
}

define("eds-progress", EDSProgressElement);
