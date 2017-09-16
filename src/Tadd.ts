import { gray, green, red } from "chalk";
import { difference } from "lodash";
import * as ora from "ora";
import { EOL } from "os";
import * as timeSpan from "time-span";

import { hasTypings } from "./hasTypings";
import { Logger } from "./Logger";
import PackageReference from "./PackageReference";
import { packageSemverString } from "./packageSemverString";
import IPackageManagerController from "./pm/IPackageManagerController";
import { packageManagerControllerFactory } from "./pm/packageManagerControllerFactory";
import { ShellExecutor } from "./ShellExecutor";
import { PACKAGE_MANAGER } from "./types";

interface ITaddConfig {
  packageManager: PACKAGE_MANAGER;
  verbose: boolean;
}

export default class Tadd {
  public readonly packageManagerController: IPackageManagerController;
  public readonly logger: Logger;

  constructor(private readonly config: ITaddConfig) {
    this.logger = new Logger();
    const commandExecutor = new ShellExecutor(this.logger);
    this.packageManagerController = packageManagerControllerFactory(
      config.packageManager,
      commandExecutor
    );
  }

  public async add(isDev: boolean, packages: PackageReference[]) {
    const startTime = timeSpan();
    console.log(`Using: ${this.packageManagerController.formattedName()}`);

    const packageInstallingBar = ora(`Installing packages: ${green(packages.join(", "))}`).start();

    try {
      await this.packageManagerController.add(isDev, packages.map(p => p.toString()));
    } catch (e) {
      packageInstallingBar.fail();
      this.finishFailure(e);
    }
    packageInstallingBar.succeed();

    const packagesWithTypings = packages.filter(t => hasTypings(t.name));
    if (packagesWithTypings.length > 0) {
      console.log(gray(`Detected builtin typings: ${packagesWithTypings.join(", ")}`));
    }

    const packagesWithoutTypings = difference(packages, packagesWithTypings);
    if (packagesWithoutTypings.length === 0) {
      this.finishSuccess(startTime);
    }

    const typingsPackages = (await Promise.all(
      packagesWithoutTypings.map(packageSemverString)
    )).map(t => t.toTypingsPackage());

    const typingsInstallingBar = ora(`Installing typings: ${typingsPackages.join(", ")}`).start();
    try {
      await this.packageManagerController.add(true, typingsPackages.map(p => p.toString()));
    } catch (e) {
      typingsInstallingBar.fail();
      this.finishFailure(e);
    }
    typingsInstallingBar.succeed();

    if (this.config.verbose) {
      console.log(gray("Run commands:"));
      console.log(this.logger.cmdOutputLogs.join(EOL));
    }

    this.finishSuccess(startTime);
  }

  private finishSuccess(startTime: any) {
    const duration = startTime();

    console.log(gray(`Commands executed:${EOL}${this.logger.cmdLogs.join(EOL)}`));
    console.log(green(`💎  All good! Took ${(duration / 1000).toFixed(2)}s.`));
    process.exit(0);
  }

  private finishFailure(e: Error) {
    // tslint:disable-next-line
    console.log(red("Error occurred!"));
    // tslint:disable-next-line
    console.log(e);
    process.exit(0);
  }
}
