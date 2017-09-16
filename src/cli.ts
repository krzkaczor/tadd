#!/usr/bin/env node
import { blue, green, red } from "chalk";
import { negate } from "lodash";
import * as ora from "ora";
import { hasTypings } from "./hasTypings";
import { Logger } from "./Logger";
import PackageManagerController from "./PackageManagerController";
import { parseArgs } from "./parseArgs";
import recognizePackageManager from "./recognizePackageManager";
import { ShellExecutor } from "./ShellExecutor";
import { PACKAGE_MANAGER } from "./types";

async function main() {
  const { packages, isDev } = parseArgs();

  const logger = new Logger();
  const commandExecutor = new ShellExecutor(logger);

  const recognizedPackageManager = await recognizePackageManager(process.cwd());
  reportPackageManager(recognizedPackageManager);
  const pmController = new PackageManagerController(recognizedPackageManager, commandExecutor);

  const packageInstallingBar = ora(`Installing packages: ${green(packages.join(","))}`).start();
  try {
    await pmController.add(isDev, packages);
  } catch (e) {
    packageInstallingBar.fail();
    finishFailure(e);
  }
  packageInstallingBar.succeed();

  const packagesWithoutTypings = packages.filter(negate(hasTypings));
  if (packagesWithoutTypings.length === 0) {
    finishSuccess();
  }

  const typingsInstallingBar = ora(
    `Installing typings: ${blue(packagesWithoutTypings.join(", "))}`
  ).start();
  const typingsPackages = packagesWithoutTypings.map(name => `@types/${name}`);
  try {
    await pmController.add(true, typingsPackages);
  } catch (e) {
    typingsInstallingBar.fail();
    finishFailure(e);
  }
  typingsInstallingBar.succeed();

  finishSuccess();

  function finishSuccess() {
    // tslint:disable-next-line
    console.log(green("All good!"));
    process.exit(0);
  }

  function finishFailure(e: Error) {
    // tslint:disable-next-line
    console.log(red("Error occurred!"));
    // tslint:disable-next-line
    console.log(e);
    process.exit(0);
  }
}
// tslint:disable-next-line
main().catch(e => console.error(e));

function reportPackageManager(pm: PACKAGE_MANAGER) {
  const pmString = pm === PACKAGE_MANAGER.NPM ? red("npm") : blue("yarn");
  // tslint:disable-next-line
  console.log(`Using: ${pmString}`);
}
