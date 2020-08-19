module.exports = {
  component: "Modal",
  tag: "eds-modal",
  summary: "A modal is an overlay that’s automatically placed on top of the main screen. It disables the main screen and keeps it visible in the background until the user completes a required action in the workflow.",
  stylesUrl: "modal.html",
  lib: [],
  example: `
    <button class="eds-button eds-button.primary" onclick="this.nextElementSibling.show()">
      <svg class="eds-button_#icon" viewBox="0 0 24 24"><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>
      <span class="eds-button_#label">Launch Modal</span>
    </button>
    <eds-modal>
      <header>
        <h1>Modal title</h1>
      </header>
      <div>
        Hello
      </div>
      <footer>
        <button class="eds-button eds-button.primary" onclick="this.closest('eds-modal').open=false">
          Close
        </button>
      </footer>
    </eds-modal>
  `,
  properties: {
    visible: {
      type: "boolean",
      description: "Indicates whether the modal is visible or hidden.",
    },
    closable: {
      type: "boolean",
      description: "When <code>false</code>, suppresses the user's ability to close the dialog.",
      example: `
        <button class="eds-button eds-button.basic" onclick="this.nextElementSibling.show()">
          Launch
        </button>
        <eds-modal closable="false">
          <div>
            You can only close this by clicking the button below.
          </div>
          <footer>
            <button class="eds-button eds-button.basic" onclick="this.closest('eds-modal').hide()">
              Hide
            </button>
          </footer>
        </eds-modal>
      `,
    },
    ariaLabelClose: {
      type: "string",
      description: "A description of the close button used to aid screen readers",
      example: `
        <button class="eds-button eds-button.basic" onclick="this.nextElementSibling.show()">
          Launch
        </button>
        <eds-modal ariaLabelClose="Testing">
          <div>
            Hello world!
          </div>
        </eds-modal>
      `,
    },
  },
  methods: {
    show: {
      type: "void",
      description: "Shows the modal.",
      example: `
        <button class="eds-button eds-button.basic" onclick="this.nextElementSibling.show()">
          Launch
        </button>
        <eds-modal>
          <div>
            Hello world!
          </div>
          <footer>
            <button
              class="eds-button eds-button.basic"
              onclick="this.closest('eds-modal').hide()">
              Hide
            </button>
          </footer>
        </eds-modal>
      `,
    },
    hide: {
      type: "void",
      description: "Hides the modal.",
      example: `
        <button class="eds-button eds-button.basic" onclick="this.nextElementSibling.show()">
          Launch
        </button>
        <eds-modal>
          <div>
            Hello world!
          </div>
          <footer>
            <button
              class="eds-button eds-button.basic"
              onclick="this.closest('eds-modal').hide()">
              Hide
            </button>
          </footer>
        </eds-modal>
      `,
    },
  },
  events: {
    show: {
      description: "Dispatched when the modal is shown.",
      type: "CustomEvent<void>",
      bubbles: false,
      cancelable: false,
      example: `
        <button class="eds-button eds-button.basic" onclick="this.nextElementSibling.show()">
          Show (<span id="showCount">0</span>)
        </button>
        <eds-modal id="showEventExample">
          <div>
            Hello world!
          </div>
          <footer>
            <button class="eds-button eds-button.basic" onclick="this.closest('eds-modal').hide()">
              Hide
            </button>
          </footer>
        </eds-modal>
        <script>
          document.getElementById("showEventExample").addEventListener("show", () => {
            const count = document.getElementById("showCount");
            count.textContent = parseInt(count.textContent) + 1;
          });
        </script>
      `,
    },
    hide: {
      description: "Dispatched when the modal is hidden.",
      type: "CustomEvent<void>",
      bubbles: false,
      cancelable: false,
      example: `
        <button class="eds-button eds-button.basic" onclick="this.nextElementSibling.show()">
          Show
        </button>
        <eds-modal id="hideEventExample">
          <div>
            Hello world!
          </div>
          <footer>
            <button class="eds-button eds-button.basic" onclick="this.closest('eds-modal').hide()">
              Hide (<span id="hideCount">0</span>)
            </button>
          </footer>
        </eds-modal>
        <script>
          document.getElementById("hideEventExample").addEventListener("hide", () => {
            const count = document.getElementById("hideCount");
            count.textContent = parseInt(count.textContent) + 1;
          });
        </script>
      `,
    },
  },
  notes: [
    `
      The <code>--width</code> and <code>--height</code> custom CSS properties
      can be used to affect the width and height of the modal dialog.
    `,
  ],
};
