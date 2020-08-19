import { EDSElement, define, html, unsafeCSS } from "eds-core";
import { createPopper } from "@popperjs/core";
import { theme } from "@experian/eds-styles/tailwind.config.js";
import edsPopoverStyles from "@experian/eds-styles/dist/components/eds-popover.css";
import componentStyles from "./styles.scss";

export default class EDSPopoverElement extends EDSElement {
  static get styles() {
    return EDSElement.styles.concat([
      edsPopoverStyles,
      componentStyles,
    ].map(unsafeCSS));
  }

  static get properties() {
    return {
      padding: {
        type: String,
        reflect: true,
      },
      position: {
        type: String,
        reflect: true,
      },
      targetClass: {
        type: String,
        reflect: true,
      },
    };
  }

  connectedCallback() {
    super.connectedCallback();

    const clickListener = ({ target }) => {
      const { targetClass, targetElements = [] } = this;

      let el = target, activeElement = this._activeElement;

      if (
        targetElements.includes(el)
        || el.classList.contains(targetClass)
        || (el = el.closest(`.${targetClass}`))
        || (el = targetElements.find(te => te.contains(el)))
      ) {
        this.show(el);
      }
      else if (
        !this.contains(target)
        && activeElement
        && target !== activeElement
        && !activeElement.contains(target)
      ) {
        this.hide();
      }
    };

    const keydownListener = e => {
      switch (e.key) {
        case "Escape":
          this.hide();
          break;
        default:
          break;
      }
    };

    document.body.addEventListener("click", clickListener);
    document.body.addEventListener("keydown", keydownListener);

    this.disconnectedCallback = () => {
      super.disconnectedCallback();
      document.body.removeEventListener("click", clickListener);
      document.body.removeEventListener("keydown", keydownListener);
    };
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    changedProperties.forEach((oldValue, propertyName) => {
      if (propertyName === "position" && this._popper) {
        this._popper.setOptions({ placement: this.position });
      }
    });
  }

  show(el) {
    let popper = this._popper;

    if (popper) {
      if (popper && popper.state && popper.state.elements && popper.state.elements.reference !== el) {
        popper.destroy();
      }
      else {
        return;
      }
    }

    const { shadowRoot } = this;
    const [
      container,
      popover,
      marker,
    ] = ["container", "popover", "marker"].map(x => shadowRoot.getElementById(x));

    if (!container || !popover) {
      return;
    }

    this._popper = createPopper(el, container, {
      placement: this.position || "top",
      modifiers: [
        {
          name: "arrow",
        },
        {
          name: "edsPopoverDirection",
          enabled: true,
          phase: "main",
          fn: ({ state }) => {
            popover.className = popover.className.replace(
              /top|bottom|left|right/,
              state.placement.match(/top|bottom|left|right/)[0]
            );
          },
        },
      ],
    });

    container.classList.add("show");

    this.dispatchEvent(new CustomEvent("show", {
      detail: el,
      bubbles: false,
      cancelable: false,
    }));

    this._activeElement = el;
  }

  hide() {
    const popper = this._popper;
    if (popper) {
      popper.destroy();
      this._popper = null;
    }

    const container = this.shadowRoot.getElementById("container");
    if (container) {
      container.classList.remove("show");
    }

    const activeElement = this._activeElement;
    if (activeElement) {
      this.dispatchEvent(new CustomEvent("hide", {
        detail: this._activeElement,
        bubbles: false,
        cancelable: false,
      }));
      this._activeElement = null;
    }
  }

  render() {
    const { padding } = this;

    const modifiers =
      padding === "none"
        ? " eds-tooltip.no-padding"
        : padding === "reduced"
          ? " eds-tooltip.reduced-padding"
          : ""
      ;

    const style =
      padding && /^[0-9]/.test(padding)
        ? `padding:${padding}`
        : ""
      ;

    return html`
      <div id="container">
        <div class="eds-popover eds-popover.top${modifiers}" style="${style}" id="popover" role="dialog">
          <div class="eds-popover_#content">
            <slot></slot>
          </div>
          <div class="eds-popover_#marker" id="marker" data-popper-arrow></div>
        </div>
      </div>
    `;
  }
}

define("eds-popover", EDSPopoverElement);
