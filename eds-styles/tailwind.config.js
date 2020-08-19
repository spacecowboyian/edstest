const fromEntries = Object.fromEntries
  ? Object.fromEntries
  : (es => es.reduce((obj, entry) => Object.assign({}, obj, { [entry[0]]: entry[1] }), {}));

module.exports = {
  prefix: "",
  important: false,
  separator: ":",
  theme: {
    screens: {
    },
    colors: {
      black: "#333333",
      blue: {
        100: "#f2f8ff",
        150: "#E6EFFB",
        200: "#d6e3f4",
        300: "#bbcfea",
        400: "#8dabd4",
        500: "#648abf",
        600: "#426da9",
        700: "#1d4f91",
        800: "#123f7a",
        900: "#0a3163",
      },
      gray: {
        100: "#f6f6f6",
        200: "#eaeaea",
        300: "#d6d6d6",
        400: "#c1c1c1",
        500: "#a7a7a7",
        600: "#8c8c8c",
        700: "#717171",
        800: "#585858",
        900: "#404040",
      },
      green: {
        100: "#F2FFF5",
        200: "#D0F6DB",
        300: "#9AE8B4",
        400: "#5CD08E",
        500: "#29B769",
        600: "#009f4d",
        700: "#007a3b",
        800: "#00612F",
        900: "#004A24",
      },
      lime: {
        100: "#fefff2",
        200: "#f7f9cc",
        300: "#f0f3a7",
        400: "#dce26d",
        500: "#cad03b",
        600: "#b7bf10",
        700: "#979e08",
        800: "#777d03",
        900: "#575c00",
      },
      magenta: {
        100: "#fff1fa",
        200: "#ffd8f0",
        300: "#ffc0e4",
        400: "#f790c6",
        500: "#ef62a8",
        600: "#e63888",
        700: "#c41d73",
        800: "#a20861",
        900: "#800051",
      },
      orange: {
        100: "#fff9f2",
        200: "#ffeed7",
        300: "#ffe3ba",
        400: "#ffc684",
        500: "#ffaa4f",
        600: "#ff8f1c",
        700: "#cc6e0f",
        800: "#995006",
        900: "#663300",
      },
      purple: {
        100: "#fef2ff",
        200: "#eed3f1",
        300: "#dfb6e4",
        400: "#c186c9",
        500: "#a45dad",
        600: "#883b92",
        700: "#6d2077",
        800: "#53135b",
        900: "#390a40",
      },
      raspberry: {
        100: "#fff0fb",
        200: "#f6cbea",
        300: "#eda7da",
        400: "#d86fbc",
        500: "#c43e9f",
        600: "#af1685",
        700: "#92086d",
        800: "#760056",
        900: "#570041",
      },
      red: {
        100: "#fff0f3",
        200: "#FFD6DD",
        300: "#fea8b8",
        400: "#f66c86",
        500: "#ed3457",
        600: "#e4002b",
        700: "#c60025",
        800: "#a8001f",
        900: "#8a0019",
      },
      sapphire: {
        100: "#f2fcff",
        200: "#d0eff8",
        300: "#afe2f1",
        400: "#79c8de",
        500: "#4aafcc",
        600: "#2197b9",
        700: "#0081a6",
        800: "#006580",
        900: "#004759",
      },
      teal: {
        100: "#f2fffe",
        200: "#c6f7f4",
        300: "#9befea",
        400: "#5fdad4",
        500: "#2bc6be",
        600: "#00b2a9",
        700: "#00948c",
        800: "#00756f",
        900: "#005752",
      },
      transparent: "transparent",
      white: "#ffffff",
      ...[10, 20, 30, 40, 50, 60, 70, 80, 90]
        .map(x => ({ [`white-a${x}`]: `rgba(255, 255, 255, ${x / 100})` }))
        .reduce((whites, white) => Object.assign({}, whites, white), {}),
      yellow: {
        100: "#FFF9E8",
        200: "#FFF1BD",
        300: "#FFEA90",
        400: "#FFD146",
        500: "#FEBA00",
        600: "#D49A00",
        700: "#AA7A00",
        800: "#815B00",
        900: "#573D00",
      },
    },
    spacing: {
      0: "0",
      ...[1, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 64, 68, 72, 80, 96, 128, 160, 192, 224, 256, 512]
        .map(s => ({ [s]: `${s}px` }))
        .reduce((xs, x) => Object.assign({}, xs, x), {}),
    },
    backgroundColor: theme => theme("colors"),
    backgroundPosition: {
      bottom: "bottom",
      center: "center",
      left: "left",
      "left-bottom": "left bottom",
      "left-top": "left top",
      right: "right",
      "right-bottom": "right bottom",
      "right-top": "right top",
      top: "top",
      "top-12": "center top 12px",
    },
    backgroundSize: {
      auto: "auto",
      cover: "cover",
      contain: "contain",
    },
    borderColor: theme => ({
      ...theme("colors"),
      "default": theme("colors.gray.300", "currentColor"),
    }),
    borderRadius: {
      none: "0",
      sm: "2px",
      "default": "4px",
      lg: "6px",
      full: "9999px",
    },
    borderWidth: {
      "default": "1px",
      0: "0",
      2: "2px",
      4: "4px",
    },
    boxShadow: theme => ({
      "default": "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      sm: "0 2px 12px 0 rgba(0, 0, 0, 0.12)",
      md: "0 4px 12px 0 rgba(0, 0, 0, 0.12)",
      lg: "0 8px 16px -4px rgba(0, 0, 0, 0.2)",
      ...Object.entries(theme("colors"))
        .map(function makeOutline([key, entry]) {
          switch (typeof entry) {
            case "string":
              return [key, `0 0 0 1px ${entry}`];
            case "object":
              return [key, Object.entries(entry).map(makeOutline)];
            default:
              return [key, entry];
          }
        })
        .reduce(function(xs, x) {
          return reduce("outline")(xs, x);
          function reduce(context) {
            return function(xs, [key, entry]) {
              const ctxKey = [context, key].join("-");
              switch (typeof entry) {
                case "string":
                  return Object.assign({}, xs, { [ctxKey]: entry });
                case "object":
                  return Object.assign({}, xs, entry.reduce(reduce(ctxKey), {}));
                default:
                  return xs;
              }
            };
          }
        }, {}),
      ...Object.entries(theme("colors"))
        .map(function makeInsideOutline([key, entry]) {
          switch (typeof entry) {
            case "string":
              return [key, `inset 0 0 0 2px ${entry}`];
            case "object":
              return [key, Object.entries(entry).map(makeInsideOutline)];
            default:
              return [key, entry];
          }
        })
        .reduce(function(xs, x) {
          return reduce("inside-outline")(xs, x);
          function reduce(context) {
            return function(xs, [key, entry]) {
              const ctxKey = [context, key].join("-");
              switch (typeof entry) {
                case "string":
                  return Object.assign({}, xs, { [ctxKey]: entry });
                case "object":
                  return Object.assign({}, xs, entry.reduce(reduce(ctxKey), {}));
                default:
                  return xs;
              }
            };
          }
        }, {}),
      none: "none",
    }),
    container: {},
    cursor: {
      auto: "auto",
      "default": "default",
      pointer: "pointer",
      wait: "wait",
      text: "text",
      move: "move",
      "not-allowed": "not-allowed",
    },
    fill: {
      current: "currentColor",
    },
    flex: {
      1: "1 1 0%",
      auto: "1 1 auto",
      initial: "0 1 auto",
      none: "none",
    },
    flexGrow: {
      0: "0",
      "default": "1",
    },
    flexShrink: {
      0: "0",
      "default": "1",
    },
    fontFamily: {
      sans: [
        "Roboto",
        "-apple-system",
        "BlinkMacSystemFont",
        "\"Segoe UI\"",
        "Roboto",
        "\"Helvetica Neue\"",
        "Arial",
        "\"Noto Sans\"",
        "sans-serif",
        "\"Apple Color Emoji\"",
        "\"Segoe UI Emoji\"",
        "\"Segoe UI Symbol\"",
        "\"Noto Color Emoji\"",
      ],
      mono: [
        "Menlo",
        "Monaco",
        "Consolas",
        "\"Liberation Mono\"",
        "\"Courier New\"",
        "monospace",
      ],
    },
    fontSize: {
      12: "12px",
      14: "14px",
      16: "16px",
      18: "18px",
      24: "24px",
      30: "30px",
    },
    fontWeight: [300, 400, 500, 700]
      .map(weight => ({ [weight]: weight }))
      .reduce((ws, w) => Object.assign({}, ws, w), {}),
    height: theme => ({
      auto: "auto",
      ...theme("spacing"),
      "1/2": "50%",
      full: "100%",
    }),
    inset: {
      0: "0",
      auto: "auto",
    },
    letterSpacing: {
      tighter: "-0.05em",
      tight: "-0.025em",
      normal: "0",
      wide: "0.025em",
      wider: "0.05em",
      widest: "0.1em",
    },
    lineHeight: {
      none: "1",
      normal: "1.25",
      loose: "1.5",
    },
    listStyleType: {
      none: "none",
      disc: "disc",
      decimal: "decimal",
    },
    margin: (theme, { negative }) => ({
      auto: "auto",
      ...theme("spacing"),
      ...negative(theme("spacing")),
    }),
    maxHeight: {
      full: "100%",
    },
    maxWidth: {
      full: "100%",
    },
    minHeight: {
      0: "0",
      full: "100%",
    },
    minWidth: theme => ({
      0: "0",
      ...theme("spacing"),
      full: "100%",
    }),
    objectPosition: {
      bottom: "bottom",
      center: "center",
      left: "left",
      "left-bottom": "left bottom",
      "left-top": "left top",
      right: "right",
      "right-bottom": "right bottom",
      "right-top": "right top",
      top: "top",
    },
    opacity: {
      0: "0",
      25: "0.25",
      50: "0.5",
      75: "0.75",
      100: "1",
    },
    order: {
      first: "-9999",
      last: "9999",
      none: "0",
      1: "1",
      2: "2",
      3: "3",
      4: "4",
      5: "5",
      6: "6",
      7: "7",
      8: "8",
      9: "9",
      10: "10",
      11: "11",
      12: "12",
    },
    padding: theme => theme("spacing"),
    placeholderColor: {
      gray: {
        400: "#c1c1c1", /* TODO: Should read this from the theme (colors.gray.400), but doesn't work in sass export. */
      },
    },
    stroke: {
      current: "currentColor",
    },
    textColor: theme => theme("colors"),
    transitionProperty: {
      bg: "background-color",
      "bg-all,border,shadow": "background-color,background-position,border,box-shadow",
      "border,shadow": "border,box-shadow",
      content: "font-size,opacity,padding,width,height",
      p: "padding",
      shadow: "box-shadow",
      w: "width",
      ...["border", "opacity", "transform"]
        .map(p => ({ [p]: p }))
        .reduce((ps, p) => Object.assign({}, ps, p)),
    },
    transitionDuration: {
      150: "150ms",
    },
    transitionTimingFunction:
      ["ease", "ease-in"]
        .map(f => ({ [f]: f }))
        .reduce((fs, f) => Object.assign({}, fs, f), {}),
    transitionDelay: [150].map(delay => ({ [delay]: `${delay}ms` })).reduce((ds, d) => Object.assign({}, ds, d)),
    willChange: {
      auto: "auto",
      scroll: "scroll-position",
      contents: "contents",
      opacity: "opacity",
      transform: "transform",
    },
    width: theme => ({
      auto: "auto",
      ...theme("spacing"),
      "1/2": "50%",
      full: "100%",
    }),
    zIndex: {
      auto: "auto",
      0: "0",
      10: "10",
      20: "20",
      30: "30",
      40: "40",
      50: "50",
    },
  },
  variants: {
    alignContent: [],
    alignItems: [],
    alignSelf: [],
    appearance: [],
    backgroundAttachment: [],
    backgroundColor: ["hover", "focus", "active"],
    backgroundPosition: [],
    backgroundRepeat: [],
    backgroundSize: [],
    borderCollapse: [],
    borderColor: ["hover", "focus", "focus-within"],
    borderRadius: [],
    borderStyle: [],
    borderWidth: [],
    boxShadow: ["hover", "focus", "focus-within"],
    cursor: [],
    display: [],
    fill: [],
    flex: [],
    flexDirection: [],
    flexGrow: [],
    flexShrink: [],
    flexWrap: [],
    "float": [],
    fontFamily: [],
    fontSize: [],
    fontSmoothing: [],
    fontStyle: [],
    fontWeight: ["hover", "focus"],
    height: [],
    inset: [],
    justifyContent: [],
    letterSpacing: [],
    lineHeight: [],
    listStylePosition: [],
    listStyleType: [],
    margin: [],
    maxHeight: [],
    maxWidth: [],
    minHeight: [],
    minWidth: [],
    objectFit: [],
    objectPosition: [],
    opacity: ["placeholder"],
    order: [],
    outline: ["focus"],
    overflow: [],
    padding: [],
    pointerEvents: [],
    position: [],
    resize: [],
    stroke: [],
    tableLayout: [],
    textAlign: [],
    textColor: ["hover", "focus", "active", "disabled", "placeholder"],
    textDecoration: ["hover", "focus"],
    textTransform: [],
    transitionProperty: [],
    transitionDuration: [],
    transitionTimingFunction: [],
    transitionDelay: [],
    userSelect: [],
    verticalAlign: [],
    visibility: [],
    whitespace: [],
    width: [],
    willChange: [],
    wordBreak: [],
    zIndex: [],
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [
    require("tailwindcss-transitions")(),
    ({ addUtilities, theme }) => addUtilities({
      ".border-raspberry-600-blue-700": {
        "border-image": `linear-gradient(to right, ${theme("colors.raspberry.600")}, ${theme("colors.blue.700")}) 50`,
      },
    }),
    ({ addUtilities }) => addUtilities({
      ".border-box": {
        "box-sizing": "border-box",
      },
      ".content-box": {
        "box-sizing": "content-box",
      },
    }),
    ({ addUtilities }) => addUtilities({
      ".content-0": fromEntries(["font-size", "opacity", "padding", "width", "height"].map(p => ([ p, 0 ]))),
    }),
    ({ addUtilities }) => addUtilities({ ".text-fill-current": { "-webkit-text-fill-color": "currentColor" } }),
    ({ addVariant, e }) => addVariant("disabled", ({ modifySelectors, separator }) =>
      modifySelectors(({ className }) => `.${e(`disabled${separator}${className}`)}:disabled`)),
    ({ addVariant, e }) => addVariant("placeholder", ({ modifySelectors, separator }) =>
      modifySelectors(({ className }) => `.${e(`placeholder${separator}${className}`)}::placeholder`)),
  ],
};
