import { IShellExecutor } from "./ShellExecutor";
import { PACKAGE_MANAGER } from "./types";

export default class PackageManagerController {
  constructor(public readonly pm: PACKAGE_MANAGER, public readonly executor: IShellExecutor) {}

  public get pmInstallCommand() {
    switch (this.pm) {
      case PACKAGE_MANAGER.NPM:
        return "npm install";
      case PACKAGE_MANAGER.YARN:
        return "yarn add";
    }
  }

  public async add(isDev: boolean, packages: string[]) {
    const devPostfix = isDev ? " --dev" : "";

    const installCommand = `${this.pmInstallCommand} ${devPostfix} ${packages.join(" ")}`;

    await this.executor.execute(installCommand);
  }
}
