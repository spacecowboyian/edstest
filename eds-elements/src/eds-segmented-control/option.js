import { EDSElement, define, html, unsafeCSS } from "eds-core";
import styles from "./option-styles.scss";

export default class EDSSegmentedControlOptionElement extends EDSElement {
  static get styles() {
    return EDSElement.styles.concat([
      ":host{display:inline-block;}",
      styles,
    ].map(unsafeCSS));
  }

  static get properties() {
    return {
      ariaLabel: {
        type: String,
        reflect: true,
      },
      selected: {
        type: Boolean,
        reflect: true,
      },
    };
  }

  focus() {
    this.$id("control").focus();
  }

  render() {
    const { ariaLabel = "", selected } = this;

    return html`
      <button
        id="control"
        role="radio"
        aria-label="${ariaLabel}"
        aria-selected="${selected ? "true" : "false"}"
        tabindex="${!selected ? "-1" : ""}"
        class="
          eds-segmented-control_.option
          ${selected ? "eds-segmented-control_.option.selected" : ""}
        "
        @click=${() => {
          for (let prev = this.previousElementSibling; prev && prev.tagName === this.tagName; prev = prev.previousElementSibling) {
            prev.selected = false;
          }

          for (let next = this.nextElementSibling; next && next.tagName === this.tagName; next = next.nextElementSibling) {
            next.selected = false;
          }

          this.selected = true;
        }}>
        <slot></slot>
      </button>
    `;
  }
}

define("eds-segmented-control-option", EDSSegmentedControlOptionElement);
