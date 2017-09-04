#!/usr/bin/env node
import { parseArgs } from "./parseArgs";
import { green, blue } from "chalk";
import { join } from "path";
import { execute } from "./execute";
import { hasTypings } from "./hasTypings";
import { negate } from 'lodash'

const { packages, isDev } = parseArgs();

console.log(`Installing packages: ${green(packages.join(","))}`);

const devPostfix = isDev ? " --dev" : "";
const installCommand = `yarn add${devPostfix} ${packages.join(" ")}`;
execute(installCommand);

const packagesWithoutTypings = packages
  .filter(x => negate(hasTypings));

if (packagesWithoutTypings.length === 0) {
  finish()
}

console.log(`Packages needing typings: ${blue(packagesWithoutTypings.join(", "))}`);
const typingsInstallCommand = `yarn add --dev ${packagesWithoutTypings
  .map(name => `@types/${name}`)
  .join(" ")}`;
execute(typingsInstallCommand);

finish();

function finish() {
  console.log(green("All good!"));
  process.exit(0);
}