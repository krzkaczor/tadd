#!/usr/bin/env node
import { parseArgs } from "./parseArgs";
import { green, blue } from "chalk";
import { join } from "path";
import { execute } from "./execute";
import { hasTypings } from "./hasTypings";
import { negate } from "lodash";
import * as ora from "ora";

async function main() {
  const { packages, isDev } = parseArgs();
  
  const packageInstallingBar = ora(`Installing packages: ${green(packages.join(","))}`).start();
  
  const devPostfix = isDev ? " --dev" : "";
  const installCommand = `yarn add${devPostfix} ${packages.join(" ")}`;
  await execute(installCommand)
  packageInstallingBar.succeed();
  
  const packagesWithoutTypings = packages.filter(negate(hasTypings));
  
  if (packagesWithoutTypings.length === 0) {
    finish();
  }
  
  const typingsInstallingBar = ora(`Packages needing typings: ${blue(packagesWithoutTypings.join(", "))}`).start();
  const typingsInstallCommand = `yarn add --dev ${packagesWithoutTypings
    .map(name => `@types/${name}`)
    .join(" ")}`;
  await execute(typingsInstallCommand);
  typingsInstallingBar.succeed();
  
  finish();
  
  function finish() {
    console.log(green("All good!"));
    process.exit(0);
  }
  
}

main().catch((e) => console.error(e));
