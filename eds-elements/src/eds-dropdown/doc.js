module.exports = {
  component: "Dropdown",
  summary: "A combination of form elements structured as an advanced menu of options",
  stylesUrl: "dropdown.html",
  lib: ["popper.js"],
  properties: {
    label: {
      type: "string",
      description: "The label for the field associated with the dropdown",
      example: `<eds-dropdown label="Example Dropdown"></eds-dropdown>`,
    },
    value: {
      type: "Array<string>",
      description: "The selected value(s)",
      example:
        `
        <div style="display: inline-flex; flex-flow: row nowrap">
          <eds-dropdown id="valueExampleDropdown" label="Favorite Fruit">
            <eds-option value="apple">Apple</eds-option> 
            <eds-option value="strawberry" selected>Strawberry</eds-option>
            <eds-option value="grape">Grape</eds-option>
          </eds-dropdown>
          <div style="margin-left: 16px">
            Selected value: <span id="valueExampleDisplay"></span>
          </div>
        </div>
        <script>
          customElements
            .whenDefined("eds-dropdown")
            .then(() => {
              document.getElementById("valueExampleDisplay").innerHTML =
                JSON.stringify(document.getElementById("valueExampleDropdown").value);
            });

            document.getElementById("valueExampleDropdown").addEventListener("change", () => {
              document.getElementById("valueExampleDisplay").innerHTML =
                JSON.stringify(document.getElementById("valueExampleDropdown").value);
            });
        </script>
        `,
    },
    placeholder: {
      type: "string",
      description: "The placeholder text to display when no value is set",
      example: `<eds-dropdown label="Placeholder Example" placeholder="Click to select..."></eds-dropdown>`,
    },
    multiple: {
      type: "boolean",
      description: "Allows for multiple values to be selected.",
      example:
        `
        <eds-dropdown label="Preferred Days" multiple>
          <eds-option>Monday</eds-option>
          <eds-option>Tuesday</eds-option>
          <eds-option>Wednesday</eds-option>
          <eds-option>Thursday</eds-option>
          <eds-option>Friday</eds-option>
        </eds-dropdown>
        `,
    },
    formatter: {
      type: "(selectedOptions: Array<{ value: string; content: string; }>) => string",
      description: "The function used to transform the selected option(s) into a single display value",
      example:
        `
        <eds-dropdown id="formatterExampleDropdown" label="Formatter Example" multiple>
          <eds-option>One</eds-option>
          <eds-option>Two</eds-option>
          <eds-option>Three</eds-option>
        </eds-dropdown>
        <script>
          customElements
            .whenDefined("eds-dropdown")
            .then(() => {
              document.getElementById("formatterExampleDropdown").formatter =
                selected => selected.map(({ content }) => content).join(" + ");
            });
        </script>
        `,
    },
    searchable: {
      type: "boolean",
      description: "Adds a search input that allows the user to filter the options.",
      example:
        `
        <eds-dropdown label="Favorite Fruit" searchable>
${
            ["Apple", "Banana", "Cherry", "Grape", "Strawberry", "Watermelon"]
              .map(fruit => [...Array(10).keys()].map(i => `          <eds-option>${fruit} ${i + 1}</eds-option>`))
              .reduce((allFruits, fruits) => allFruits.concat(fruits), [])
              .join("\n")
        }
        </eds-dropdown>
        `,
    },
    searchPlaceholder: {
      type: "string",
      description: "The placeholder text to display in the search box",
      example:
        `
        <eds-dropdown label="Favorite Fruit" searchable searchPlaceholder="Fruit filter">
${
            ["Apple", "Banana", "Cherry", "Grape", "Strawberry", "Watermelon"]
              .map(fruit => [...Array(10).keys()].map(i => `          <eds-option>${fruit} ${i + 1}</eds-option>`))
              .reduce((allFruits, fruits) => allFruits.concat(fruits), [])
              .join("\n")
        }
        </eds-dropdown>
        `,
    },
    searchFunction: {
      type: "(option: { value: string; content: string; }, query: string) => boolean",
      description: "For a searchable dropdown, the predicate used to filter options",
      example:
        `
        <eds-dropdown id="searchFunctionExampleDropdown" label="Search Example" searchable>
          <eds-option>One</eds-option>
          <eds-option>Two</eds-option>
          <eds-option>Three</eds-option>
        </eds-dropdown>
        <script>
          customElements
            .whenDefined("eds-dropdown")
            .then(() => {
              document.getElementById("searchFunctionExampleDropdown").searchFunction =
                ({ content }, query) => content.indexOf(query) === 0;
            });
        </script>
        `,
    },
    info: {
      type: "string",
      description: "Assistive text to display alongside the dropdown",
      example: `<eds-dropdown label="Info Example" info="Insert awesome info message here."></eds-dropdown>`,
    },
    warning: {
      type: "string",
      description: "Assistive text, indicating a warning, to display alongside the dropdown",
      example: `<eds-dropdown label="Warning Example" warning="Insert awesome warning message here."></eds-dropdown>`,
    },
    error: {
      type: "string",
      description: "Assistive text, indicating an error, to display alongside the dropdown",
      example: `<eds-dropdown label="Error Example" error="Insert awesome error message here."></eds-dropdown>`,
    },
  },
  events: {
    change: null,
    open: {
      description: "Dispatched when the dropdown opens.",
      type: "Event",
      bubbles: false,
      cancelable: false,
    },
    close: {
      description: "Dispatched when the dropdown closes.",
      type: "Event",
      bubbles: false,
      cancelable: false,
    },
  },
};
