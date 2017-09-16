import { startsWith } from "lodash";

export default class PackageDefinition {
  constructor(public readonly name: string, public readonly version?: string) {}

  public toString() {
    return this.version ? `${this.name}@${this.version}` : this.name;
  }

  public toTypingsPackage() {
    if (startsWith("@types/")) {
      throw new Error("Package is already package with typings!");
    }

    return new PackageDefinition(`@types/${this.name}`, this.version);
  }
}
