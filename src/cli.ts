#!/usr/bin/env node
import { printFail, printVersion } from "./cmds";
import { parseArgs } from "./parseArgs";
import recognizePackageManager from "./recognizePackageManager";
import Tadd from "./Tadd";

async function main() {
  const { packages, isDev, version, verbose } = parseArgs();

  if (version) {
    printVersion();
  }

  if (packages.length === 0) {
    throw new Error("You haven't provided any packages to install.");
  }

  const recognizedPackageManager = await recognizePackageManager(process.cwd());
  const tadd = new Tadd({ verbose, packageManager: recognizedPackageManager });

  await tadd.add(isDev, packages);
}
main().catch(printFail);
