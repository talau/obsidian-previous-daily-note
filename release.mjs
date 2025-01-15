/*
 * Copyright (c) 2025 Marcos Talau <marcos@talau.info>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http:www.gnu.org/licenses/>.
 */

import * as fs from "fs";
import readline from "readline";
import { execSync } from "child_process";

const JSON_SPACE = 4;

function _getAnswer(question, rl) {
    const ret = new Promise(r => rl.question(question, r));

    return ret;
}
async function getAnswer(question) {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

    const answer = await _getAnswer(question, rl);
    rl.close();

    return answer;
}

function readJSONFile(fname) {
    return JSON.parse(fs.readFileSync(fname, "utf-8"));
}

function saveJSONFile(fname, data, space) {
    fs.writeFileSync(fname, JSON.stringify(data, null, space) + "\n");
}

function checkUncommited() {
    const out = execSync("git diff");

    if (out.length !== 0) {
        console.log("Please, commit changes before");
        process.exit(1);
    }
}

// main
checkUncommited();

let update_files = true;
const pkg = readJSONFile("package.json");
const cur_version = pkg["version"];
console.log(`Current version: ${cur_version}`);

const new_version = await getAnswer("    New version: ");
if (cur_version > new_version) {
    console.log("cur_version > new_version, aborting");
    process.exit(1);
} else if (cur_version == new_version) {
    await getAnswer("cur_version == new_version, continue? [C-c to abort] ");
    update_files = false;
}

if (update_files) {
    pkg["version"] = new_version;
    saveJSONFile("package.json", pkg, JSON_SPACE);

    const manifest = readJSONFile("manifest.json");
    manifest["version"] = new_version;
    saveJSONFile("manifest.json", manifest, JSON_SPACE);

    const versions = readJSONFile("versions.json");
    versions[new_version] = manifest["minAppVersion"];
    saveJSONFile("versions.json", versions, JSON_SPACE);

    execSync("git add package.json manifest.json versions.json");
    execSync(`git commit -m "release version ${new_version}"`);
}

execSync(`git tag ${new_version}`);
execSync("git push");
execSync("git push --tags");
