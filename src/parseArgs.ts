import * as commandLineArgs from "command-line-args";
import PackageReference from "./PackageReference";

interface ICliArgs {
  isDev: boolean;
  packages: PackageReference[];
  version: boolean;
  verbose: boolean;
}

export function parseArgs(): ICliArgs {
  const optionDefinitions = [
    { name: "version", alias: "v", type: Boolean },
    { name: "dev", alias: "d", type: Boolean },
    { name: "verbose", type: Boolean },
    { name: "packages", type: String, multiple: true, defaultOption: true },
  ];

  const rawOptions = commandLineArgs(optionDefinitions);

  const packages: PackageReference[] = (rawOptions.packages || []).map((packageString: string) => {
    const chunks = packageString.split("@");

    if (chunks.length >= 1 && chunks.length <= 2) {
      return new PackageReference(chunks[0], chunks[1]);
    } else {
      throw new Error(`Unparsable package reference string: ${packageString}`);
    }
  });

  return {
    packages,
    isDev: !!rawOptions.dev,
    version: !!rawOptions.version,
    verbose: !!rawOptions.verbose,
  };
}
