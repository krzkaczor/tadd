import { exec } from "child_process";
import { red } from "chalk";
import * as Bluebird from 'bluebird';

const promisedExec = Bluebird.promisify(exec);

export async function execute(cmd: string): Promise<string> {
  try {
    const result = (await promisedExec(cmd)).toString();
    return result;
  } catch (e) {
    console.error(red("Command failed with:"));
    console.error(e.message);
    process.exit(1);
    return ""
  }
}
