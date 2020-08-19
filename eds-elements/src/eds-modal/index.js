import { EDSElement, define, html, unsafeCSS } from "eds-core";
import styles from "./styles.scss";
import lightDOMStyles from "./styles-lightdom.scss";

export default class EDSModalElement extends EDSElement {
  static get styles() {
    return EDSElement.styles.concat([
      styles,
    ].map(unsafeCSS));
  }

  static get properties() {
    return {
      visible: {
        type: Boolean,
        reflect: true,
      },
      closable: {
        type: Boolean,
        reflect: true,
        converter: {
          fromAttribute: value => value === "false" ? false : true,
          toAttribute: value => value === false ? "false" : null,
        },
      },
      ariaLabelClose: {
        type: String,
        reflect: true,
      },
    };
  }

  constructor() {
    super();
    this.closable = true;
  }

  connectedCallback() {
    super.connectedCallback();
    const style = this._style = document.createElement("style");
    style.textContent = lightDOMStyles;
    document.head.appendChild(style);

    const escapeListener = this._escapeListener = e => {
      switch (e.key) {
        case "Escape":
          if (this.closable) {
            this.hide();
            e.preventDefault();
          }
          break;
        default:
          break;
      }
    };

    document.addEventListener("keypress", escapeListener);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.head.removeChild(this._style);
    document.removeEventListener("keypress", this._escapeListener);
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has("visible")) {
      this.dispatchEvent(
        new CustomEvent(
          changedProperties.get("visible") ? "hide" : "show",
          { bubbles: false, cancelable: false },
        ),
      );
    }
  }

  show() {
    this.visible = true;
  }

  hide() {
    this.visible = false;
  }

  render() {
    const { closable, ariaLabelClose = "Close", visible } = this;
    return html`
      <div
        id="body"
        @click=${
          ({ target: el }) => {
            const body = this.shadowRoot.getElementById("body");
            const external = el === body;
            if (external && this.closable) {
              this.hide();
            }
          }
        }
        class="${visible ? "visible" : ""}">
        <div
          id="container"
          role="dialog"
          aria-modal="true">
          ${
            closable
            ? html`
              <button id="close" @click=${() => { this.visible = false; }} aria-label="${ariaLabelClose}">
                <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
              </button>
              `
            : ""
          }
          <slot></slot>
        </div>
      </div>
    `;
  }
}

define("eds-modal", EDSModalElement);
