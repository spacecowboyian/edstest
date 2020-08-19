import { EDSElement, define, html, unsafeCSS } from "eds-core";
import { createPopper } from "@popperjs/core";
import { theme } from "@experian/eds-styles/tailwind.config.js";
import edsTooltipStyles from "@experian/eds-styles/dist/components/eds-tooltip.css";
import componentStyles from "./styles.scss";

export default class EDSTooltipElement extends EDSElement {
  static get styles() {
    return EDSElement.styles.concat([
      edsTooltipStyles,
      componentStyles,
    ].map(unsafeCSS));
  }

  static get properties() {
    return {
      delay: {
        type: Number,
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

    const listeners = Object.entries({
      focusin: ({ target }) => {
        const el = this._targetMatch(target);
        if (el) {
          this._activate(el);
        }
      },
      focusout: ({ target }) => {
        const el = this._activeTargetMatch(target);
        if (el) {
          this._deactivate();
        }
      },
      mouseover: ({ target }) => {
        const el = this._targetMatch(target);
        if (el) {
          this._activate(el);
        }
      },
      mouseout: ({ target }) => {
        const el = this._activeTargetMatch(target);
        if (el) {
          this._deactivate();
        }
      },
    })
      .map(([eventName, listener]) => [
        eventName,
        x => !this._suppressUserEvents && listener(x),
      ]);

    listeners.forEach(([eventName, listener]) => {
      document.addEventListener(eventName, listener);
    });

    this.disconnectedCallback =
      listeners.reduce((cleanup, [eventName, listener]) => () => {
        cleanup();
        document.removeEventListener(eventName, listener);
      }, () => super.disconnectedCallback());
  }

  _activeTargetMatch(el) {
    if (!el) {
      return null;
    }

    const activeTarget = this._activeTarget;
    if (activeTarget === el) {
      return activeTarget;
    }

    if (activeTarget && activeTarget.contains(el)) {
      return activeTarget;
    }

    return null;
  }

  _targetMatch(el) {
    if (!el) {
      return null;
    }

    const { targetClass, targetElements = [] } = this;

    if (el.classList.contains(targetClass)) {
      return el;
    }

    if (targetElements.includes(el)) {
      return el;
    }

    const ancestor =
      el.closest(`.${targetClass}`) || targetElements.find(t => t.contains(el));

    if (ancestor) {
      return ancestor;
    }

    return null;
  }

  _activate(el) {
    if (this.beforeShow && this.beforeShow(el) === false) {
      return;
    }

    this._activeTarget = el;

    this._work = setTimeout(() => {
      this._work = null;

      const container = this.shadowRoot.getElementById("container");
      const tooltip = this.shadowRoot.getElementById("tooltip");

      this._popper = createPopper(el, container, {
        placement: this.position || "top",
        modifiers: [
          {
            name: "arrow",
          },
          {
            name: "edsTooltipDirection",
            enabled: true,
            phase: "main",
            fn: ({ state }) => {
              tooltip.className = tooltip.className.replace(
                /top|bottom|left|right/,
                state.placement.match(/top|bottom|left|right/)[0]
              );
            },
          },
        ],
      });

      container.classList.add("show");

      this.dispatchEvent(new CustomEvent("show", {
        bubbles: false,
        cancelable: false,
        detail: el,
      }));
    }, this._suppressDelay || !this.delay ? 0 : this.delay);
  }

  _deactivate() {
    if (this._activeTarget) {
      this.dispatchEvent(new CustomEvent("hide", {
        bubbles: false,
        cancelable: false,
        detail: this._activeTarget,
      }));
      this._activeTarget = null;
    }

    if (this._work) {
      clearTimeout(this._work);
      this._work = null;
    }

    if (this._popper) {
      this._popper.destroy();
      this._popper = null;
    }

    this.shadowRoot.getElementById("container").classList.remove("show");

    this._suppressDelay = true;
    setTimeout(() => this._suppressDelay = false, 500);
  }

  show(el) {
    this._suppressUserEvents = true;
    this._activate(el);
  }

  hide() {
    this._deactivate();
    this._suppressUserEvents = false;
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    changedProperties.forEach((oldValue, propertyName) => {
      if (propertyName === "position" && this._popper) {
        this._popper.setOptions({ placement: this.position });
      }
    });
  }

  render() {
    return html`
      <div id="container">
        <div class="eds-tooltip eds-tooltip.top" id="tooltip" role="tooltip">
          <div class="eds-tooltip_#content">
            <slot></slot>
          </div>
          <div class="eds-tooltip_#marker" id="marker" data-popper-arrow></div>
        </div>
      </div>
    `;
  }
}

define("eds-tooltip", EDSTooltipElement);
