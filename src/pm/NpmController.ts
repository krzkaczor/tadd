import { red } from "chalk";
import { IShellExecutor } from "../ShellExecutor";
import { PACKAGE_MANAGER } from "../types";
import IPackageManagerController from "./IPackageManagerController";

export default class NpmController implements IPackageManagerController {
  constructor(public readonly executor: IShellExecutor) {}

  public async add(isDev: boolean, packages: string[]) {
    const devPostfix = isDev ? "--dev" : "";

    const installCommand = `npm install ${devPostfix} ${packages.join(" ")}`;

    await this.executor.execute(installCommand);
  }

  public formattedName(): string {
    return red("NPM");
  }
}
