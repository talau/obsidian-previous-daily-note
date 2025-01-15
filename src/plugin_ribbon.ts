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

import { Notice, Platform } from "obsidian";

import PreviousDailyNote from "./main";
import { openPreviousDailyNote } from "./previous_daily"

export class PluginRibbon {
    plugin: PreviousDailyNote;
    ribbonIcon: HTMLElement;

    constructor(plugin: PreviousDailyNote) {
        this.plugin = plugin;
        this.load();
    }

    load() {
        if (this.plugin.settings.showRibbonIcon)
            this.addRibbonIcon();
    }

    addRibbonIcon() {
        this.ribbonIcon = this.plugin.addRibbonIcon("calendar-minus", "Open previous daily note", () => {
            openPreviousDailyNote(this.plugin);
        });
    }

    showRibbonIcon() {
        if (! this.ribbonIcon)
            this.addRibbonIcon();
        else
            this.ribbonIcon.show();
    }

    hideRibbonIcon() {
        if (Platform.isMobile)
            new Notice("On mobile you need to restart Obsidian to this action take effect.");

        this.ribbonIcon.hide();
    }
}
