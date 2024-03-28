type CSSModuleClasses = { readonly [key: string]: string }
declare module "*.css" { }
declare module "*.svg" { }
declare module "*.png" { }
declare module "*.modules.less" {
  const styles: CSSModuleClasses
  export default styles
}


type ENV = "dev" | "fat" | "uat" | "pre" | "pro"

declare const NODE_ENV: "development" | "production"

declare const REACT_NODE_ENV: ENV
