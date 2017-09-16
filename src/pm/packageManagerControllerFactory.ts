import { IShellExecutor } from "../ShellExecutor";
import { PACKAGE_MANAGER } from "../types";
import IPackageManagerController from "./IPackageManagerController";
import NpmController from "./NpmController";
import YarnController from "./YarnController";

export const packageManagerControllerFactory = (
  packageManager: PACKAGE_MANAGER,
  executor: IShellExecutor
): IPackageManagerController => {
  switch (packageManager) {
    case PACKAGE_MANAGER.NPM:
      return new NpmController(executor);
    case PACKAGE_MANAGER.YARN:
      return new YarnController(executor);
    default:
      throw new Error(`Unrecognized package manager ${packageManager}`);
  }
};
