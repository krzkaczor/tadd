import * as Bluebird from "bluebird";
import { red } from "chalk";
import { exec } from "child_process";

const promisedExec = Bluebird.promisify(exec);

export async function execute(cmd: string): Promise<string> {
  try {
    const result = (await promisedExec(cmd)).toString();
    return result;
  } catch (e) {
    // tslint:disable-next-line
    console.error(red("Command failed with:"));
    // tslint:disable-next-line
    console.error(e.message);
    process.exit(1);
    return "";
  }
}
