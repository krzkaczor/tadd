import * as Bluebird from "bluebird";
import { stat } from "fs";
import { join } from "path";
import { PACKAGE_MANAGER } from "./types";

const statAsync = Bluebird.promisify(stat);

export default async function recognizePackageManager(
  directoryPath: string
): Promise<PACKAGE_MANAGER> {
  try {
    await statAsync(join(directoryPath, "yarn.lock"));
    return PACKAGE_MANAGER.YARN;
  } catch (e) {
    if (e.code === "ENOENT") {
      return PACKAGE_MANAGER.NPM;
    }
    throw e;
  }
}
