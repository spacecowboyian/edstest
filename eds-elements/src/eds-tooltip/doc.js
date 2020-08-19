module.exports = {
  component: "Tooltip",
  summary: `
    A tooltip is a floating container that appears on demand when the user
    hovers over content or UI components which contain a tooltip. It’s used to
    provide the user with additional information without cluttering the page.
  `,
  stylesUrl: "tooltip.html",
  lib: [
    "popper.js",
  ],
  properties: {
    delay: {
      type: "number",
      description: "The milliseconds to wait before showing the tooltip",
      example: `
        <button class="eds-button eds-button.basic example-delay-default">Delay 0 (default)</button>
        <button class="eds-button eds-button.basic example-delay-300">Delay 300</button>
        <button class="eds-button eds-button.basic example-delay-700">Delay 700</button>
        <button class="eds-button eds-button.basic example-delay-1000">Delay 1000</button>

        <br />
        <br />
        <button class="eds-button eds-button.basic example-delay-group-700">Delay 700 (shared)</button>
        <button class="eds-button eds-button.basic example-delay-group-700">Delay 700 (shared)</button>
        <button class="eds-button eds-button.basic example-delay-group-700">Delay 700 (shared)</button>

        <eds-tooltip targetClass="example-delay-default">
          Delay: <b>0 (default)</b>
        </eds-tooltip>
        <eds-tooltip delay="300" targetClass="example-delay-300">
          Delay: <b>300</b>
        </eds-tooltip>
        <eds-tooltip delay="700" targetClass="example-delay-700">
          Delay: <b>700</b>
        </eds-tooltip>
        <eds-tooltip delay="1000" targetClass="example-delay-1000">
          Delay: <b>1000</b>
        </eds-tooltip>
        <eds-tooltip delay="700" targetClass="example-delay-group-700">
          Delay: <b>700</b> (shared tooltip)
        </eds-tooltip>
      `,
    },
    position: {
      type: ["", "-start", "-end"]
        .map(x => ["top", "right", "bottom", "left"].map(y => `${y}${x}`))
        .reduce((acc, xs) => acc.concat(xs), [])
        .map(x => `"${x}"`)
        .join(" | "),
      description: "The position of the tooltip in relation to the trigger element",
      example: `
        <div style="text-align: center;">
          <button class="eds-button eds-button.primary position-example" id="positionToggle">
            top
          </button>
          <eds-tooltip targetClass="position-example" position="top" id="positionTooltip">
            <div style="padding-top: 16px; padding-bottom: 16px;">
              Insert awesome tooltip content here.
            </div>
          </eds-tooltip>
        </div>
        <script>
          (function() {
            const toggle = document.getElementById("positionToggle");
            const tooltip = document.getElementById("positionTooltip");
            const options = [
              "top",
              "top-start",
              "top-end",
              "right",
              "right-start",
              "right-end",
              "bottom",
              "bottom-start",
              "bottom-end",
              "left",
              "left-start",
              "left-end",
            ];

            let position = options.indexOf(tooltip.getAttribute("position"));

            toggle.addEventListener("click", function() {
              position = position === options.length - 1 ? 0 : position + 1;
              tooltip.setAttribute("position", options[position]);
              toggle.innerText = options[position];
            });
          })();
        </script>
      `,
    },
    targetClass: {
      type: "string",
      description: "A CSS class on elements the tooltip should attach itself to",
      example: `
        <button class="eds-button eds-button.basic example-target-class">Same Tooltip (1)</button>
        <button class="eds-button eds-button.basic example-target-class">Same Tooltip (2)</button>
        <button class="eds-button eds-button.basic example-target-class">Same Tooltip (3)</button>
        <button class="eds-button eds-button.basic example-target-class2">Different Tooltip</button>
        <eds-tooltip targetClass="example-target-class">
          One tooltip to rule them all
        </eds-tooltip>
        <eds-tooltip targetClass="example-target-class2">
          A tooltip for just one element... unless you add more with the same
          class.
        </eds-tooltip>
      `,
    },
    targetElements: {
      type: "HTMLElement[]",
      description: "An array elements the tooltip should attach itself to",
      example: `
        <button class="target-elements-example eds-button eds-button.basic">Same Tooltip (1)</button>
        <button class="target-elements-example eds-button eds-button.basic">Same Tooltip (2)</button>
        <button class="target-elements-example eds-button eds-button.basic">Same Tooltip (3)</button>
        <eds-tooltip id="targetElementsTooltip">
          Assigned to target elements instead of a class
        </eds-tooltip>
        <script>
          customElements
            .whenDefined("eds-tooltip")
            .then(() => {
              document.getElementById("targetElementsTooltip").targetElements =
                Array.from(document.querySelectorAll(".target-elements-example"));
            });
        </script>
        <script>
        </script>
      `,
    },
    beforeShow: {
      type: "(target: HTMLElement) => boolean",
      description: `
        If defined, this method is automatically called before each call to
        <code>show()</code> and can be used to process dynamic content or
        conditionally display the tooltip. The current tooltip target is passed
        as an argument. This method should not be called manually.
      `,
      example: `
        <button class="before-show-example-target eds-button eds-button.primary">
          Submit
        </button>
        <button class="before-show-example-target eds-button eds-button.basic">
          Cancel
        </button>
        <button class="before-show-example-target eds-button eds-button.basic">
          ...
        </button>
        <eds-tooltip targetClass="before-show-example-target" id="beforeShowTooltip">
          Click on the <strong id="beforeShowTooltipText"></strong> button.
        </eds-tooltip>
        <script>
          document.getElementById("beforeShowTooltip").beforeShow =
            target => {
              document.getElementById("beforeShowTooltipText").innerHTML = 
                target.textContent;

              if (target.textContent.trim() === "...") {
                return false;
              }
            };
        </script>
      `,
    },
  },
  methods: {
    show: {
      parameters: [
        [ "targetElement", "HTMLElement" ],
      ],
      type: "void",
      description: "Opens the tooltip next to the specified target element.",
      example: `
        <button
          class="eds-button eds-button.basic"
          onclick="this.nextElementSibling.show(this)">
          Open
        </button>
        <eds-tooltip onclick="this.hide()">
          Tooltip opened programatically. Click to dismiss.
        </eds-tooltip>
      `,
    },
    hide: {
      type: "void",
      description: "Closes the tooltip.",
      example: `
        <button
          class="eds-button eds-button.basic"
          onclick="this.nextElementSibling.show(this)">
          Open
        </button>
        <eds-tooltip onclick="this.hide()">
          Tooltip opened programatically. Click to dismiss.
        </eds-tooltip>
      `,
    },
  },
  events: {
    show: {
      description: `
        Dispatched when the tooltip is shown. The event detail is a reference
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
          <span class="eds-button_#label">Hover to see tooltip</span>
        </button>
        <eds-tooltip id="showEventExample" targetClass="show-event-example">
          Insert awesome tooltip content here.
        </eds-tooltip>
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
        Dispatched when the tooltip is shown. The event detail is a reference
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
          <span class="eds-button_#label">Hover to see tooltip</span>
        </button>
        <eds-tooltip id="hideEventExample" targetClass="hide-event-example">
          Insert awesome tooltip content here.
        </eds-tooltip>
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
