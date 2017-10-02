import { blue, red } from "chalk";

export function printVersion() {
  const packageInfo = require("../package.json");
  const version = packageInfo.version;

  // tslint:disable-next-line
  console.log(`${blue("tadd")} ver. ${version}`);
  process.exit(0);
}

export function printFail(e: Error) {
  console.log(red(e.message));
  if (process.env.NODE_ENV === "development") {
    console.log(e.stack);
  }
  process.exit(1);
}
