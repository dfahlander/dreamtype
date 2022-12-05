declare global {
  var _dreamTypeContext: {
    declaration: boolean;
  };
}

if (typeof _dreamTypeContext === "undefined") {
  _dreamTypeContext = { declaration: false };
}

export const CTX = _dreamTypeContext;
