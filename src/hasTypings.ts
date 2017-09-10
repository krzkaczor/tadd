import { readFileSync } from "fs";
import { join } from "path";

export function hasTypings(name: string): boolean {
  const dir = join(process.cwd(), "node_modules", name);
  const packageJsonPath = join(dir, "package.json");
  const packageJson = JSON.parse(readFileSync(packageJsonPath).toString());

  return !!packageJson.typings;
}
