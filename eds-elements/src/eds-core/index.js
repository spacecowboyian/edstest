import { EDSElement, css, html, unsafeCSS } from "./eds-element.js";
import { define } from "./define.js";

window.EDSCore = { EDSElement, css, define, html, unsafeCSS };

// Component configuration
const defaults = {
  useGlobalStyles: true,
  hideUntilReady: false
};
window.EDS = Object.assign(defaults, window.EDS);
