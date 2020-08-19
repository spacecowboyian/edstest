module.exports = {
  component: "Progress",
  summary: "The progress indicator is a visual indicator that lets the user know progress is being made throughout the UI or workflow. Use this component to let the user know an item is downloading, uploading, or saving.",
  stylesUrl: "progress.html",
  lib: [],
  properties: {
    motif: {
      type: "'magenta' | 'purple'",
      description: "The color of the progress element",
      example: `
        <eds-progress style="width:200px;"></eds-progress><br/>
        <eds-progress motif="magenta" style="width:200px;"></eds-progress><br/>
        <eds-progress motif="purple" style="width:200px;"></eds-progress>
      `,
    },
    value: {
      type: "number",
      description: "The value to display in the indicator",
      example: `<eds-progress style="width:200px;" value="0.25"></eds-progress>`,
    },
    baselineValue: {
      type: "number",
      description: "The baseline value to display",
      example: `<eds-progress style="width:200px;" value="0.25" baselineValue="0.5"></eds-progress>`,
    },
    max: {
      type: "number",
      description: `
        The maximum, or denominator, which affects the size of the filled area
        of the progress bar
      `,
      example: `<eds-progress style="width:200px;" value="2" max="3"></eds-progress>`,
    },
    ariaLabelValue: {
      type: "string",
      description: "A description of the value used to aid screen readers",
      example: `<eds-progress value="0.5" ariaLabelValue="Percent complete" style="width:200px;"></eds-progress>`,
    },
  },
};
