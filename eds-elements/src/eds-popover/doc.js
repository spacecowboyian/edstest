module.exports = {
  component: "Popover",
  summary: `
    A popover is an overlay that opens on demand. It's used to provide the user
    with related information when space is limited or to avoid cluttering the
    screen with a lot of content.
  `,
  stylesUrl: "popover.html",
  lib: [
    "popper.js",
  ],
  properties: {
    position: {
      type: ["", "-start", "-end"]
        .map(x => ["top", "right", "bottom", "left"].map(y => `${y}${x}`))
        .reduce((acc, xs) => acc.concat(xs), [])
        .map(x => `"${x}"`)
        .join(" | "),
      description: "The position of the popover in relation to the trigger element",
      example: `
        <div style="display:flex; justify-content:center;">
          <button class="eds-button eds-button.basic position-example">Launch Popover</button>
          <eds-popover targetClass="position-example" position="top" id="positionPopover">
            <label class="eds-field w-192">
              <div class="eds-field_#label">Position</div>
              <div class="eds-field_#control eds-field_.eds-input eds-input">
                <select
                  onchange="this.closest('eds-popover').setAttribute('position', this.value)"
                  class="eds-input_#input eds-input_#input.dropdown">
                  <option selected>top</option>
                  <option>top-start</option>
                  <option>top-end</option>
                  <option>right</option>
                  <option>right-start</option>
                  <option>right-end</option>
                  <option>bottom</option>
                  <option>bottom-start</option>
                  <option>bottom-end</option>
                  <option>left</option>
                  <option>left-start</option>
                  <option>left-end</option>
                </select>
              </div>
            </label>
          </eds-popover>
        </div>
      `,
    },
    targetClass: {
      type: "string",
      description: "A CSS class on elements the popover should attach itself to",
      example: `
        <button class="eds-button eds-button.basic example-target-class">Same Popover (1)</button>
        <button class="eds-button eds-button.basic example-target-class">Same Popover (2)</button>
        <button class="eds-button eds-button.basic example-target-class">Same Popover (3)</button>
        <button class="eds-button eds-button.basic example-target-class2">Different Popover</button>
        <eds-popover targetClass="example-target-class">
          One popover to rule them all
        </eds-popover>
        <eds-popover targetClass="example-target-class2">
          A popover for just one element... unless you add more with the same
          class.
        </eds-popover>
      `,
    },
    targetElements: {
      type: "HTMLElement[]",
      description: "An array elements the popover should attach itself to",
      example: `
        <button class="target-elements-example eds-button eds-button.basic">Same Popover (1)</button>
        <button class="target-elements-example eds-button eds-button.basic">Same Popover (2)</button>
        <button class="target-elements-example eds-button eds-button.basic">Same Popover (3)</button>
        <eds-popover id="targetElementsPopover">
          Assigned to target elements instead of a class
        </eds-popover>
        <script>
          customElements
            .whenDefined("eds-popover")
            .then(() => {
              document.getElementById("targetElementsPopover").targetElements =
                Array.from(document.querySelectorAll(".target-elements-example"));
            });
        </script>
      `,
    },
    padding: {
      type: '"none" | "reduced" | string | null',
      description: `
        Determines the padding around the popover content. In addition to the
        provided presets, this can be set to an arbitrary CSS value such as
        <code>24px</code>.
      `,
      example: `
        <button class="eds-button eds-button.tertiary padding-example">
          <svg class="eds-button_#icon" 0 24 24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
        </button>
        <eds-popover padding="none" position="bottom-start" targetClass="padding-example">
          <a class="eds-menu-item eds-menu-item.basic">
            <svg class="eds-menu-item_#icon" viewBox="0 0 24 24">
              <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"></path>
            </svg>
            <span class="eds-menu-item_#label">Dashboard</span>
          </a>
          <a class="eds-menu-item eds-menu-item.basic">
            <svg class="eds-menu-item_#icon" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
            </svg>
            <span class="eds-menu-item_#label">Users</span>
          </a>
          <a class="eds-menu-item eds-menu-item.basic">
            <svg class="eds-menu-item_#icon" viewBox="0 0 24 24">
              <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"></path>
            </svg>
            <span class="eds-menu-item_#label">Settings</span>
          </a>
        </eds-popover>
      `,
    },
  },
  methods: {
    show: {
      parameters: [
        [ "targetElement", "HTMLElement" ],
      ],
      type: "void",
      description: "Opens the popover next to the specified target element.",
      example: `
        <button
          class="eds-button eds-button.basic"
          onclick="this.nextElementSibling.show(this)">
          Open
        </button>
        <eds-popover onclick="this.hide()">
          Popover opened programatically. Click to dismiss.
        </eds-popover>
      `,
    },
    hide: {
      type: "void",
      description: "Closes the popover.",
      example: `
        <button
          class="eds-button eds-button.basic"
          onclick="this.nextElementSibling.show(this)">
          Open
        </button>
        <eds-popover onclick="this.hide()">
          Popover opened programatically. Click to dismiss.
        </eds-popover>
      `,
    },
  },
  events: {
    show: {
      description: `
        Dispatched when the popover is shown. The event detail is a reference
        to the target element.
      `,
      type: "CustomEvent<HTMLElement>",
      bubbles: false,
      cancelable: false,
      example: `
       <button class="show-event-example eds-button eds-button.tertiary">
          <svg class="eds-button_#icon hidden-icon" viewBox="0 0 24 24" style="display:inline-block;">
            <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" />
          </svg>
          <svg class="eds-button_#icon visible-icon" viewBox="0 0 24 24" style="display:none;">
            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
          </svg>
          <span class="eds-button_#label">Click to see popover</span>
        </button>
        <eds-popover id="showEventExample" targetClass="show-event-example">
          Insert awesome popover content here.
        </eds-popover>
        <script>
          document
            .getElementById("showEventExample")
            .addEventListener("show", e => {
              e.detail.querySelector(".hidden-icon").style.display = "none";
              e.detail.querySelector(".visible-icon").style.display = "inline-block";
            });

          document
            .getElementById("showEventExample")
            .addEventListener("hide", e => {
              e.detail.querySelector(".hidden-icon").style.display = "inline-block";
              e.detail.querySelector(".visible-icon").style.display = "none";
            });
        </script>
      `,
    },
    hide: {
      description: `
        Dispatched when the popover is shown. The event detail is a reference
        to the target element.
      `,
      type: "CustomEvent<HTMLElement>",
      bubbles: false,
      cancelable: false,
      example: `
        <button class="hide-event-example eds-button eds-button.tertiary">
          <svg class="eds-button_#icon hidden-icon" viewBox="0 0 24 24" style="display:inline-block;">
            <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" />
          </svg>
          <svg class="eds-button_#icon visible-icon" viewBox="0 0 24 24" style="display:none;">
            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
          </svg>
          <span class="eds-button_#label">Click to see popover</span>
        </button>
        <eds-popover id="hideEventExample" targetClass="hide-event-example">
          Insert awesome popover content here.
        </eds-popover>
        <script>
          document
            .getElementById("hideEventExample")
            .addEventListener("show", e => {
              e.detail.querySelector(".hidden-icon").style.display = "none";
              e.detail.querySelector(".visible-icon").style.display = "inline-block";
            });

          document
            .getElementById("hideEventExample")
            .addEventListener("hide", e => {
              e.detail.querySelector(".hidden-icon").style.display = "inline-block";
              e.detail.querySelector(".visible-icon").style.display = "none";
            });
        </script>
      `,
    },
  },
};
