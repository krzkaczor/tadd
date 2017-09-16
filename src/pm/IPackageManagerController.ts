import { IShellExecutor } from "../ShellExecutor";

export default interface IPackageManagerController {
  add(isDev: boolean, packages: string[]): Promise<void>;
  formattedName(): string;
};
