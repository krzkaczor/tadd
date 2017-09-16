export interface ILogger {
  log(l: string): void;
}

export class Logger implements ILogger {
  private logs: string[];

  constructor() {
    this.logs = [];
  }

  public log(l: string) {
    this.logs.push(l);
  }

  public dump(): string {
    const logDump = this.logs.join("\n"); // @todo support windows properly

    this.logs = [];

    return logDump;
  }
}
