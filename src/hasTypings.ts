import { join } from "path";
import { readFileSync} from 'fs'

export function hasTypings(name: string): boolean {
  const dir = join(process.cwd(), "node_modules", name);
  const packageJsonPath = join(dir, "package.json");
  const packageJson = JSON.parse(readFileSync(packageJsonPath).toString());

  return !!packageJson.typings;
}
