export interface ILogger {
  logInstalledPackage(l: string): void;
  logCommand(l: string): void;
  logCommandOutput(l: string): void;
}

export class Logger implements ILogger {
  public cmdOutputLogs: string[];
  public cmdLogs: string[];
  public packagesInstalled: string[];

  constructor() {
    this.cmdOutputLogs = [];
    this.cmdLogs = [];
    this.packagesInstalled = [];
  }

  public logInstalledPackage(pkg: string) {
    this.packagesInstalled.push(pkg);
  }

  public logCommand(cmd: string) {
    this.cmdLogs.push(cmd);
  }

  public logCommandOutput(l: string) {
    this.cmdOutputLogs.push(l);
  }
}
