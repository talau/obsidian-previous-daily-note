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

import type { Moment } from "moment";
import { moment, Notice, Plugin, TFile, Vault } from "obsidian";
import { getDailyNoteSettings, IPeriodicNoteSettings } from "obsidian-daily-notes-interface";

export function openPreviousDailyNote(plugin: Plugin) {
    const leaf = plugin.app.workspace.getLeaf();
    const file = findPreviousDailyNote(plugin.app.vault);

    if (file)
        leaf.openFile(file);
}

function findPreviousDailyNote(vault: Vault): TFile | null {
    const MAX_DAYS = 365;
    let file: TFile | null;
    let prev_day: Moment;
    let i: number = 1;

    do {
        prev_day = moment().subtract(i, "day");
        file = vault.getFileByPath(getDailyNoteFilePath(getDailyNoteSettings(), prev_day));

        if (file != null)
             break;
    } while (++i <= MAX_DAYS);

    if (file == null)
        new Notice(`Not found previous daily note in the last ${MAX_DAYS} days.`)

    return file;
}

function getDailyNoteFilePath(dailynote_settings: IPeriodicNoteSettings, day: Moment) {
    let file_path: string = "";

    if (dailynote_settings.folder && dailynote_settings.folder != "")
        file_path = dailynote_settings.folder + "/";

    file_path += day.format(dailynote_settings.format) + ".md";

    return file_path;
}
