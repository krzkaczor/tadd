import * as Bluebird from "bluebird";
import { exec } from "child_process";
import { ILogger } from "./Logger";

const promisedExec = Bluebird.promisify(exec);

export class ShellExecutor implements IShellExecutor {
  constructor(private readonly logger: ILogger) {}

  public async execute(cmd: string): Promise<void> {
    try {
      const result = await promisedExec(cmd);
      this.logger.log(result.toString());
    } catch (e) {
      throw new Error(`Command ${cmd} failed with ${e.message}`);
    }
  }
}

export interface IShellExecutor {
  execute(cmd: string): Promise<void>;
}
