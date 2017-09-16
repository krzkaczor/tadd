import { gray, green, red } from "chalk";
import { negate } from "lodash";
import * as ora from "ora";

import { hasTypings } from "./hasTypings";
import { ILogger, Logger } from "./Logger";
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
  public readonly logger: ILogger;

  constructor(private readonly config: ITaddConfig) {
    this.logger = new Logger();
    const commandExecutor = new ShellExecutor(this.logger);
    this.packageManagerController = packageManagerControllerFactory(
      config.packageManager,
      commandExecutor
    );
  }

  public async add(isDev: boolean, packages: string[]) {
    console.log(`Using: ${this.packageManagerController.formattedName()}`);

    const packageInstallingBar = ora(`Installing packages: ${green(packages.join(","))}`).start();

    try {
      await this.packageManagerController.add(isDev, packages);
    } catch (e) {
      packageInstallingBar.fail();
      this.finishFailure(e);
    }
    packageInstallingBar.succeed();

    if (this.config.verbose) {
      console.log(gray("Run commands:"));
      console.log(this.logger.dump());
    }

    const packagesWithTypings = packages.filter(hasTypings);
    console.log(`Detected typings: ${packagesWithTypings}`);

    const packagesWithoutTypings = packages.filter(negate(hasTypings));
    if (packagesWithoutTypings.length === 0) {
      this.finishSuccess();
    }

    const typingsInstallingBar = ora(
      `Installing typings: ${packagesWithoutTypings.join(", ")}`
    ).start();
    const typingsPackages = packagesWithoutTypings.map(name => `@types/${name}`);
    try {
      await this.packageManagerController.add(true, typingsPackages);
    } catch (e) {
      typingsInstallingBar.fail();
      this.finishFailure(e);
    }
    typingsInstallingBar.succeed();

    this.finishSuccess();
  }

  private finishSuccess() {
    // tslint:disable-next-line
    console.log(green("All good!"));
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
