import { promisify } from "bluebird";
import { readFile } from "fs";
import { get } from "lodash";
import { join } from "path";
import PackageReference from "./PackageReference";

const readFileAsync = promisify(readFile);

export async function packageSemverString(packageRef: PackageReference) {
  if (packageRef.version) {
    return packageRef;
  }

  const packageInfo = JSON.parse(
    (await readFileAsync(join(process.cwd(), "package.json"))).toString()
  );

  const version =
    packageInfo.dependencies[packageRef.name] || packageInfo.devDependencies[packageRef.name];

  return new PackageReference(packageRef.name, version);
}

export async function isPackageInstalled(packageRef: PackageReference): Promise<boolean> {
  const packageInfo = JSON.parse(
    (await readFileAsync(join(process.cwd(), "package.json"))).toString()
  );

  return !!(
    get(packageInfo, `dependencies.${packageRef.name}`) ||
    get(packageInfo, `devDependencies.${packageRef.name}`)
  );
}
