module.exports = {
  component: "Segmented Control",
  tag: "eds-segmented-control",
  summary: "Segmented control is a horizontal container with segments that are equal in size. It allows the user to select a single option or switch between views or data within the UI or workflow.",
  stylesUrl: "segmented-control.html",
  lib: [],
  properties: {
    ariaLabel: {
      type: "string",
      description: "A label for the segmented control used to aid screen readers",
      example: `
        <eds-segmented-control ariaLabel="Account options">
          <eds-segmented-control-option ariaLabel="Change password">
            <svg viewBox="0 0 24 24">
              <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/>
            </svg>
          </eds-segmented-control-option>
          <eds-segmented-control-option ariaLabel="Edit profile" selected>
            <svg viewBox="0 0 24 24">
              <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
            </svg>
          </eds-segmented-control-option>
        </eds-segmented-control>
      `,
    },
    background: {
      type: '"white" | "gray"',
      description: "The background color of the segmented control container",
      example: `
        <eds-segmented-control background="gray">
          <eds-segmented-control-option selected>One</eds-segmented-control-option>
          <eds-segmented-control-option>Two</eds-segmented-control-option>
          <eds-segmented-control-option>Three</eds-segmented-control-option>
        </eds-segmented-control>
      `,
    },
  },
  slots: {
    message: {
      description: "A message that can appear alongside the options",
      example: `
        <eds-segmented-control ariaLabel="EDS Layer">
          <eds-segmented-control-option>
            <svg viewBox="0 0 24 24">
              <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
            </svg>
            <span>Layer 2</span>
          </eds-segmented-control-option>
          <eds-segmented-control-option selected>
            <span>Layer 3</span>
          </eds-segmented-control-option>
          <span slot="message">
            Learn about our layered approach
          </span>
          <a href="#" slot="message">here</a>
          <span slot="message">.</span>
        </eds-segmented-control>
      `,
    },
  },
  children: {
    option: {
      properties: {
        ariaLabel: {
          type: "string",
          description: "A label for the option used to assist screen readers",
        },
        selected: {
          type: "boolean",
          description: "Indicates whether the option is selected.",
        },
      },
    },
  },
};
