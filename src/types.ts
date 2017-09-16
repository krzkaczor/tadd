export enum PACKAGE_MANAGER {
  NPM = "NPM",
  YARN = "YARN",
}

export interface IPackage {
  name: string;
  version?: string;
}
