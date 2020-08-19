import { EDSElement, define, html, unsafeCSS } from "eds-core";
import componentStyles from "./panel-styles.scss";

const transitionDuration = 150;

export default class EDSAccordionPanelElement extends EDSElement {
  static get styles() {
    return EDSElement.styles.concat([
      componentStyles,
    ].map(unsafeCSS));
  }

  static get properties() {
    return {
      label: {
        type: String,
        reflect: true,
      },
      expandedLabel: {
        type: String,
        reflect: true,
      },
      active: {
        type: Boolean,
        reflect: true,
      },
    };
  }

  _open() {
    if (this.active) return;

    this._transitioning = true;

    const accordion = this.parentElement;
    if (!accordion.multiple) {
      accordion
        .querySelectorAll(this.tagName)
        .forEach(x => {
          if (x !== this) {
            x._close();
          }
        });
    }

    const [ details, container, content ] =
      ["details", "container", "content"].map(x => this.shadowRoot.getElementById(x));

    details.classList.add("eds-details.open");

    const contentH = height(content);

    const self = this;
    function loop(currentTime, startTime) {
      const elapsedTime = startTime ? (currentTime - startTime) : 0;
      const newH = Math.ceil(contentH * (elapsedTime / transitionDuration));

      height(container, newH);

      if (newH < contentH) {
        requestAnimationFrame(function(t) {
          loop(t, startTime || currentTime);
        });
      }
      else {
        self.active = true;
        self._transitioning = false;
        container.style.height = "auto";
        details.classList.add("eds-details.open");
      }
    }

    requestAnimationFrame(loop);
  }

  _close() {
    if (!this.active) return;

    this.transitioning = true;

    const [ details, container, content ] =
      ["details", "container", "content"].map(x => this.shadowRoot.getElementById(x));

    const contentH = height(content);

    const self = this;
    function loop(currentTime, startTime) {
      const elapsedTime = startTime ? (currentTime - startTime) : 0;
      const newH = Math.ceil(contentH * (1 - elapsedTime / transitionDuration));

      height(container, newH);
 
      if (newH > 0) {
        requestAnimationFrame(function(t) {
          loop(t, startTime || currentTime);
        });
      }
      else {
        details.classList.remove("eds-details.open");
        self.active = false;
        self._transitioning = false;
      }
    }

    requestAnimationFrame(loop);
  }

  render() {
    const {
      label,
      expandedLabel,
      active,
      previousElementSibling: prev,
      nextElementSibling: next,
      tagName,
    } = this;

    return html`
      <div>
        <div
          id="details"
          class="
            eds-accordion_.eds-details
            eds-details
            eds-details.enhanced
            ${prev && prev.tagName === tagName ? "" : "first"}
            ${next && next.tagName === tagName ? "" : "last"}
          ">
          <button
            id="summary"
            class="eds-details_#summary"
            aria-expanded="${active ? "true" : "false"}"
            aria-controls="container"
            aria-disabled="false"
            @click="${() => {
              if (this._transitioning) return;

              if (active) {
                this._close();
              }
              else {
                this._open();
              }
            }}">
            ${active && expandedLabel ? expandedLabel : label}
          </button>
          <div
            id="container"
            class="eds-details_#container"
            role="region"
            aria-labelledby="summary">
            <div id="content" class="eds-details_#content">
              <slot></slot>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

function height(el, value) {
  if (arguments.length > 1) {
    el.style.height = `${value}px`;
  }
  return el.offsetHeight;
}

define("eds-accordion-panel", EDSAccordionPanelElement);
