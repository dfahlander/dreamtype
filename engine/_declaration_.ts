export {};

declare global {
  let _declaration_: boolean;
}

export function setDeclarationMode(mode: boolean) {
  (globalThis as any)._declaration_ = mode;
}

export function getDeclarationMode() {
  return typeof _declaration_ !== "undefined" && _declaration_;
}

if (typeof _declaration_ === "undefined") setDeclarationMode(false);
