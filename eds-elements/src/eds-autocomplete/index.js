import edsControlListStyles from "@experian/eds-styles/dist/components/eds-control-list.css";
import edsFieldStyles from "@experian/eds-styles/dist/components/eds-field.css";
import edsInputStyles from "@experian/eds-styles/dist/components/eds-input.css";
import edsPopoverStyles from "@experian/eds-styles/dist/components/eds-popover.css";
import edsPrimitiveStyles from "@experian/eds-styles/dist/eds-primitives.css";
import edsButtonStyles from '@experian/eds-styles/dist/components/eds-button.css';
import edsMenuItemStyles from '@experian/eds-styles/dist/components/eds-menu.css'
import { EDSElement, define, html, unsafeCSS } from "eds-core";
import { createPopper } from "@popperjs/core";

class EDSAutocomplete extends EDSElement {

  static get styles() {
    return EDSElement.styles.concat([
      edsControlListStyles,
      edsFieldStyles,
      edsInputStyles,
      edsPopoverStyles,
      edsPrimitiveStyles,
      edsButtonStyles,
      edsMenuItemStyles
    ].map(unsafeCSS));
  }

  static get properties() {
    return {
      label: {
        type: String,
        reflect: true,
      },
      placeholder: {
        type: String,
        reflect: true,
      },
      options: {
        type: Array,
        reflect: false,
      },
      value: {
        type: String,
        reflect: true,
      },
      open: {
        type: Boolean,
        reflect: false,
      },
      info: {
        type: String,
        reflect: true,
      },
      warning: {
        type: String,
        reflect: true,
      },
      error: {
        type: String,
        reflect: true,
      },
    };
  }

  initialize() {
    super.initialize();
    this.value = '';

    document.body.addEventListener(
      "click",
      ({ target }) => {
        if (target !== this) {
          if (this.open) { // Necessary to avoid unintended side effects.
            this.open = false;
          }
        }
      }
    );
    this.addEventListener("blur", () => this.open = false);
  }

  _focusFirstControl() {
    const input = this.shadowRoot.querySelector("input");
    input && input.focus();
  }

  updated(changedProps) {
    super.updated(changedProps);

    this.newOptions = [...this.options];

    console.log(changedProps)
    const isOpen = this.open;
    const wasOpen = changedProps.has("open") ? changedProps.get("open") : isOpen;

    if (isOpen !== wasOpen) {
      if (isOpen) {
        this._popper = createPopper(
          this.shadowRoot.getElementById("opener"),
          this.shadowRoot.getElementById("menu"),
          {
            placement: "bottom-start",
            modifiers: [
              {
                enabled: true,
                phase: "read",
                name: "alignWidth",
                fn: ({ state: { elements: { reference, popper } } }) => {
                  popper.style.minWidth = `${reference.getBoundingClientRect().width}px`;
                },
              },
              {
                name: "offset",
                options: {
                  offset: [0, 10],
                },
              },
              {
                enabled: true,
                phase: "afterWrite",
                name: "focusFirstControl",
                fn: () => this._focusFirstControl(),
              },
            ],
          },
        );
      }
      else {
        const popper = this._popper;
        popper && popper.destroy();
        this.shadowRoot.querySelector("#button").focus();
      }
      this.dispatchEvent(new Event(isOpen ? "open" : "close", { bubbles: false, cancelable: false }));
    }
  }

  onKeyUp(e) {
    this.open = true;
    this.value = e.currentTarget.value;
    this.newOptions = this.options.filter(option => option.content.toLowerCase().includes(this.value))
    console.log(this.newOptions)
  }

  selectOption(e) {
    this.value = e.currentTarget.dataset.value;
    this.open = false;
    this.dispatchEvent(new Event("valueUpdate", {
      detail: { selection: this.value },
      bubbles: true,
      cancelable: false,
      composed: true
    }));
  }

  clearValue() {
    this.value = '';
    this.newOptions = [...this.options];
    this.dispatchEvent(new Event("valueUpdate", {
      detail: { selection: this.value },
      bubbles: true,
      cancelable: false,
      composed: true
    }));
  }

  render() {
    const {
      label,
      newOptions,
      open,
      placeholder,
      info,
      warning,
      error,
      value
    } = this;

    return html`
    <div class="eds-field">
      <div class="eds-field_#label">${label}</div>
      <div class="eds-field_#control eds-field_.eds-input eds-input" id="opener">
        <input @input="${this.onKeyUp}" @focus=${() => { this.open = true }} type="text" placeholder="Search" .value=${value} class="eds-input_#input" />
        <div @click="${this.clearValue}" class="eds-input_#append eds-input_.eds-input-addon eds-input-addon eds-input-addon.append">
          <div id="button" class="eds-input-addon_#content eds-input-addon_#content.icon eds-input-addon_.eds-link eds-link">
            ${ value === '' ?
        html`<svg class="eds-input-addon_#content.icon" fill="#6185b7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px"><path d="M22 20L20 22 14 16 14 14 16 14z" /><path fill="none" stroke="#6185b7" stroke-miterlimit="10" stroke-width="2" d="M9 3A6 6 0 1 0 9 15A6 6 0 1 0 9 3Z" /><path fill="none" stroke="#000000" stroke-miterlimit="10" d="M13 13L15.5 15.5" /></svg>` :
        html`<svg class="eds-input-addon_#content.icon" style="fill:#6185b7;" fill="#6185b7" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/></svg>`
      } 
          </div>
        </div>
      </div>
      <div
        id="menu"
        class="eds-popover eds-popover\.bottom-start eds-popover\.no-padding eds-popover.no-margin"
        role="dialog"
        style="box-sizing: border-box; ${this.open ? "" : "display:none"}">
        <div class="eds-popover_#content">
          <div class="eds-field container">
            <div class="eds-field_#control eds-field_.eds-control-list eds-control-list">
              ${(newOptions ? newOptions : []).map(({ content, newValue, selected }, idx) => {
        return html`
        <a 
          href="javascript:void(0);"
          data-value="${content}"
          @click="${this.selectOption}"
          class="${`eds-menu-item eds-menu-item.basic ${this.value === content ? ' eds-menu-item.blue-selected' : ''}`} "
        >
          <span class="eds-menu-item_#label">${content}</span>
        </a>`;
      })}
            </div>
          </div>
        </div>
        <div class="eds-popover_#marker" id="marker" data-popper-arrow></div>
      </div>
    </div>`;
  }
}

customElements.define('eds-autocomplete', EDSAutocomplete);
