import * as commandLineArgs from "command-line-args";
import * as invariant from "invariant";

interface IOptions {
  isDev: boolean;
  packages: string[];
}

export function parseArgs(): IOptions {
  const optionDefinitions = [
    { name: "dev", alias: "d", type: Boolean },
    { name: "packages", type: String, multiple: true, defaultOption: true },
  ];

  const rawOptions = commandLineArgs(optionDefinitions);
  console.log(rawOptions);

  invariant(
    rawOptions["packages"] && rawOptions["packages"].length > 0,
    "You need to provide package name!"
  );

  return {
    isDev: !!rawOptions["dev"],
    packages: rawOptions["packages"],
  };
}
