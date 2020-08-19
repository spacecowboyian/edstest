export const define = (tag, elementClass) => {
  customElements.define(tag, elementClass);
  window[elementClass.name] = elementClass;
};
