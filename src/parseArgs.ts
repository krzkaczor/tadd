import * as commandLineArgs from "command-line-args";

interface ICliArgs {
  isDev: boolean;
  packages: string[];
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


  return {
    isDev: !!rawOptions.dev,
    packages: rawOptions.packages || [],
    version: !!rawOptions.version,
    verbose: !!rawOptions.verbose,
  };
}
