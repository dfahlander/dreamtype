export {};

declare global {
  let dreamTypeDecl: boolean;
}

if (typeof dreamTypeDecl === "undefined") dreamTypeDecl = false;
