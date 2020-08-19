import { EDSElement, define, html, unsafeCSS } from "eds-core";
import styles from "./styles.scss";
import "./option.js";

export default class EDSSegmentedControlElement extends EDSElement {
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
      background: {
        type: String,
        reflect: true,
      },
    };
  }

  constructor() {
    super();
    this.background = "white";
  }

  connectedCallback() {
    super.connectedCallback();

    const handleKeydowns = this._keydownListener = e => {
      const moveTo = getSibling => {
        const selected = this.querySelector("[selected]") || this.querySelector("eds-segmented-control-option");
        const sibling = getSibling(selected);
        if (sibling && sibling.tagName === selected.tagName) {
          selected.selected = false;
          sibling.selected = true;
          sibling.focus();
        }
      };

      switch (e.key) {
        case "ArrowLeft":
        case "ArrowUp":
          moveTo(el => el.previousElementSibling);
          e.preventDefault();
          break;
        case "ArrowRight":
        case "ArrowDown":
          moveTo(el => el.nextElementSibling);
          e.preventDefault();
          break;
        default:
          break;
      }
    };

    this.addEventListener("keydown", handleKeydowns);

    const handleFocus = this._focusListener = () => {
      const target = this.querySelector("[selected]") || this.querySelector("eds-segmented-control-option");
      if (target) {
        target.focus();
      }
    };

    this.addEventListener("focus", handleFocus);

    this.addEventListener(
      "slotchange",
      this._slotchangeListener = () => this.requestUpdate(),
    );
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("keydown", this._keydownListener);
    this.removeEventListener("focus", this._focusListener);
    this.removeEventListener("slotchange", this._slotchangeListener);
  }

  _hasMessage() {
    return !!
      Array
        .from(this.querySelectorAll("[slot='message']"))
        .filter(x => x.textContent.trim() !== "")
        .length
    ;
  }

  render() {
    const {
      ariaLabel = "Segmented control",
      background,
    } = this;

    return html`
      <div
        class="eds-segmented-control${background === "gray" ? " eds-segmented-control.gray" : ""}"
        role="radiogroup"
        aria-label=${ariaLabel}>
        <slot></slot>
        <div class="${this._hasMessage() ? "eds-segmented-control_.message" : ""}">
          <slot name="message"></slot>
        </div>
      </div>
    `;
  }
}

define("eds-segmented-control", EDSSegmentedControlElement);
