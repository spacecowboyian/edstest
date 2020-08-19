module.exports = {
  component: "Accordion",
  tag: "eds-accordion",
  summary: "An accordion is a vertically stacked menu with a list of headers that can be clicked to reveal or hide content related to the header.",
  stylesUrl: "accordion.html",
  lib: [],
  example: `
    <eds-accordion>
      <eds-accordion-panel label="Label 1" expandedLabel="Label expanded 1">
        Hello I am content 1
      </eds-accordion-panel>
      <eds-accordion-panel label="Label 2" expandedLabel="Label expanded 2">
        Hello I am content 2
      </eds-accordion-panel>
      <eds-accordion-panel label="Label 3" expandedLabel="Label expanded 3">
        <eds-accordion>
          <eds-accordion-panel label="Nested 1">
            Hello I am Nested 1 content
          </eds-accordion-panel>
          <eds-accordion-panel label="Nested 2">
            Hello I am Nested 2 content
          </eds-accordion-panel>
          <eds-accordion-panel label="Nested 3">
            Hello I am Nested 3 content
          </eds-accordion-panel>
        </eds-accordion>
      </eds-accordion-panel>
    </eds-accordion>
  `,
  properties: {
    multiple: {
      type: "boolean",
      description: "Defines whether multiple <code>eds-accordion-panel</code> can be open at the same time.",
      example: `
        <eds-accordion multiple>
          <eds-accordion-panel label="Label 1" expandedLabel="Label expanded 1">
            Hello I am content 1
          </eds-accordion-panel>
          <eds-accordion-panel label="Label 2" expandedLabel="Label expanded 2">
            Hello I am content 2
          </eds-accordion-panel>
        </eds-accordion>
      `,
    },
  },
  children: {
    panel: {
      properties: {
        active: {
          type: "boolean",
          description: "Toggles the active state of the panel.",
          content: `
            <eds-accordion>
              <eds-accordion-panel label="Label 1">
                Hello I am content 1
              </eds-accordion-panel>
              <eds-accordion-panel label="Label 2" active>
                Hello I am content 2
              </eds-accordion-panel>
            </eds-accordion>
          `,
        },
        label: {
          type: "string",
          description: "The text that appears in the label",
          example: `
            <eds-accordion>
              <eds-accordion-panel label="Label 1">
                Hello I am content 1
              </eds-accordion-panel>
              <eds-accordion-panel label="Label 2">
                Hello I am content 2
              </eds-accordion-panel>
            </eds-accordion>
          `,
        },
        expandedLabel: {
          type: "string",
          description: "The text that appears in the label when expanded",
          example: `
            <eds-accordion>
              <eds-accordion-panel label="Label 1">
                Hello I am content 1
              </eds-accordion-panel>
              <eds-accordion-panel label="Label 2">
                Hello I am content 2
              </eds-accordion-panel>
            </eds-accordion>
          `,
        },
      },
    },
  },
};
