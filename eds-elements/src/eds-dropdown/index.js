import edsCheckboxStyles from "@experian/eds-styles/dist/components/eds-checkbox.css";
import edsControlListStyles from "@experian/eds-styles/dist/components/eds-control-list.css";
import edsFieldStyles from "@experian/eds-styles/dist/components/eds-field.css";
import edsInputStyles from "@experian/eds-styles/dist/components/eds-input.css";
import edsPopoverStyles from "@experian/eds-styles/dist/components/eds-popover.css";
import edsRadioStyles from "@experian/eds-styles/dist/components/eds-radio.css";
import { EDSElement, define, html, unsafeCSS } from "eds-core";
import { createPopper } from "@popperjs/core";

const overrideKeyboardEvent = fs => e => {
  if (fs.hasOwnProperty(e.key)) {
    e.preventDefault();
    fs[e.key](e);
  }
};

export default class EDSDropdownElement extends EDSElement {
  static get styles() {
    return EDSElement.styles.concat([
      edsCheckboxStyles,
      edsControlListStyles,
      edsFieldStyles,
      edsInputStyles,
      edsPopoverStyles,
      edsRadioStyles,
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
      formatter: {
        type: Function,
        reflect: false,
      },
      options: {
        type: Array,
        reflect: false,
      },
      value: {
        type: Array,
        reflect: false,
      },
      multiple: {
        type: Boolean,
        reflect: true,
      },
      open: {
        type: Boolean,
        reflect: true,
      },
      searchable: {
        type: Boolean,
        reflect: true,
      },
      searchFunction: {
        type: Function,
        reflect: false,
      },
      searchPlaceholder: {
        type: String,
        reflect: false,
      },
      query: {
        type: String,
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

  get options() {
    return this._options || [];
  }

  set options(options) {
    this._options = options;

    const oldVal = this._value;
    this._value = options.filter(({ selected }) => selected).map(({ value }) => value);
    this.requestUpdate("value", oldVal);
  }

  get value() {
    return this._value || [];
  }

  set value(val) {
    this._value = val;

    const oldOpts = this._options;
    this._options = oldOpts.map(({ value, content }) => ({ value, content, selected: !!~val.indexOf(value) }));
    this.requestUpdate("options", oldOpts);
  }

  _beginOptionsSync() {
    this.options = this._optionsFromDOM();
    const obs = this._optionsObserver = new MutationObserver(mutations => {
      for (let mutation of mutations) {
        switch (mutation.type) {
          case "childList":
            this.options = this._optionsFromDOM();
            return;
        }
      }
    });
    obs.observe(this, { childList: true, attributes: false, subtree: false });
  }

  _endOptionsSync() {
    const obs = this._optionsObserver;
    obs && obs.disconnect();
  }

  _optionsFromDOM() {
    return [].map.call(this.querySelectorAll("eds-option"), function (option) {
      const content = option.innerText;
      const value = option.hasAttribute("value") ? option.getAttribute("value") : content;
      return { content, value, selected: option.hasAttribute("selected") };
    });
  }

  _select(value) {
    const options = this.options.slice();
    const selectedIndex = options.map(({ selected }) => selected).indexOf(true);
    const valueIndex = options.map(({ value }) => value).indexOf(value);

    if (!this.multiple && ~selectedIndex && selectedIndex !== valueIndex) {
      options.splice(selectedIndex, 1, { ...options[selectedIndex], selected: false });
    }

    if (~valueIndex && !options[valueIndex].selected) {
      options.splice(valueIndex, 1, { ...options[valueIndex], selected: true });
    }

    this.options = options;
  }

  _deselect(value) {
    const options = this.options.slice();
    const valueIndex = options.map(({ value }) => value).indexOf(value);
    options.splice(valueIndex, 1, { ...options[valueIndex], selected: false });
    this.options = options;
  }

  _focusFirstControl() {
    const input = this.shadowRoot.querySelector("input");
    input && input.focus();
  }

  initialize() {
    super.initialize();

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

  connectedCallback() {
    super.connectedCallback();
    this._beginOptionsSync();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._endOptionsSync();
  }

  updated(changedProps) {
    super.updated(changedProps);

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
                  offset: [0, 4],
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
        this.shadowRoot.querySelector("button").focus();
      }
      this.dispatchEvent(new Event(isOpen ? "open" : "close", { bubbles: false, cancelable: false }));
    }
  }

  render() {
    const {
      label,
      options,
      placeholder,
      searchable,
      searchPlaceholder,
      query,
      info,
      warning,
      error,
    } = this;

    const value = this.value || [];

    const formatter = this.formatter || (selectedOptions =>
      selectedOptions
        .map(({ content }) => content)
        .join(", "));

    const searchFunction = this.searchFunction || (({ content }, query) =>
      content.toLowerCase().includes(query.toLowerCase()));

    const type = this.multiple ? "checkbox" : "radio";

    const motif = error
      ? "error"
      : warning
        ? "warning"
        : null
      ;

    const assistiveText = error || warning || info;

    return html`
      <div
        style="display: inline-block; outline: none"
        @keydown="${overrideKeyboardEvent({ Escape: () => this.open = false })}"
        tabindex="-1">
        <div class="eds-field">
          <div class="eds-field_#label">${label}</div>
          <div class="eds-field_#control eds-field_.eds-input eds-input${motif ? ` eds-input.${motif}` : ""}" id="opener">
            <button
              id="trigger"
              class="eds-input_#input eds-input_#input.dropdown${value.length ? "" : " eds-input_#input.placeholder"}"
              @click="${() => this.open = !this.open && options.length > 0}"
              @keydown="${
      overrideKeyboardEvent({
        ArrowDown: () => {
          if (options.length > 0) {
            this.open = true;
            this._focusFirstControl();
          }
        },
        ArrowUp: () => {
          if (options.length > 0) {
            this.open = true;
          }
        },
      })
      }">
              <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap">
                ${
      value.length
        ? formatter(options.filter(({ selected }) => selected))
        : (placeholder || "")
      }
              </span>
            </button>
          </div>
          ${
      assistiveText
        ? html`<div class="eds-field_#assistive-text${motif ? ` eds-field_#assistive-text.${motif}` : ""}">
                  ${assistiveText}
                </div>`
        : ""
      }
        </div>
        <div
          id="menu"
          class="eds-popover eds-popover\.no-padding"
          role="dialog"
          style="box-sizing: border-box; ${this.open ? "" : "display:none"}">
          <div class="eds-popover_#content" style="max-height: 256px; display: flex; flex-flow: column nowrap">
            ${
      searchable && html`
                <div style="margin-bottom: 8px">
                  <div class="eds-input">
                    <input
                      id="search"
                      type="search"
                      placeholder="${searchPlaceholder || "Type to filter options..."}"
                      class="eds-input_#input"
                      @input="${({ target: { value } }) => this.query = value}"
                      @keydown="${
        overrideKeyboardEvent({
          ArrowDown: () => {
            const option = this.shadowRoot.querySelector(".option");
            option && option.focus();
          },
          ArrowUp: () => {
            this.shadowRoot.getElementById("trigger").focus();
          },
        })
        }" />
                  </div>
                </div>`
      }
            <div class="eds-field" style="flex: 1; overflow-y: auto">
              <div class="eds-field_#control eds-field_.eds-control-list eds-control-list">
                ${(query ? options.filter(o => searchFunction(o, query)) : options).map(({ content, value, selected }, idx) => html`
                  <label
                    class="eds-control-list_.control eds-control-list_.eds-${type} eds-${type} option"
                    @keydown="${
        overrideKeyboardEvent({
          ArrowDown: e => {
            const next = e.currentTarget.nextElementSibling;
            if (next) {
              next.focus();
              if (type === "radio") {
                next.click();
              }
            }
          },
          ArrowUp: e => {
            if (idx === 0) {
              const elAbove = ["search", "trigger"]
                .map(id => this.shadowRoot.getElementById(id))
                .filter(x => x);

              elAbove.length && elAbove[0].focus();
            }
            else {
              const previous = e.currentTarget.previousElementSibling;
              if (previous) {
                previous.focus();
                if (type === "radio") {
                  previous.click();
                }
              }
            }
          },
        })
        }">
                    <input
                      type="${type}"
                      class="eds-${type}_#input"
                      name="selection"
                      ?checked="${selected}"
                      @change="${
        ({ target }) => {
          if (target.checked) {
            this._select(value);
          }
          else {
            this._deselect(value);
          }
          this.dispatchEvent(new Event("change", { bubbles: true, cancelable: false }));
        }
        }" />
                    <span class="eds-${type}_#label">${content}</span>
                  </label>
                `)}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

define("eds-dropdown", EDSDropdownElement);
