import { execSync } from "child_process";
import { red } from "chalk";

export function execute(cmd: string): string {
  try {
    console.log(`-- ${cmd}`);
    const result = execSync(cmd).toString();
    return result;
  } catch (e) {
    console.error(red("Command failed with:"));
    console.error(e.message);
    process.exit(1);
    return ""
  }
}
