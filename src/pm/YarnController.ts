import { blue } from "chalk";
import { IShellExecutor } from "../ShellExecutor";
import { PACKAGE_MANAGER } from "../types";
import IPackageManagerController from "./IPackageManagerController";

export default class YarnController implements IPackageManagerController {
  constructor(public readonly executor: IShellExecutor) {}

  public async add(isDev: boolean, packages: string[]) {
    const devPostfix = isDev ? "--dev" : "";

    const installCommand = `yarn add ${devPostfix} ${packages.join(" ")}`;

    await this.executor.execute(installCommand);
  }

  public formattedName(): string {
    return blue("YARN");
  }
}
