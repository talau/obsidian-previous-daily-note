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

import { Notice, Plugin } from "obsidian";
import { appHasDailyNotesPluginLoaded } from "obsidian-daily-notes-interface";

import { getCmdOpenPreviousDailyNote } from "./plugin_commands";
import { PluginRibbon } from "./plugin_ribbon";

export default class PreviousDailyNote extends Plugin {
    ribbon: PluginRibbon;

    async onload() {
        /*
         * For the configuration [1] to work as expected, the ribbon creation must
         * be outside of "app.workspace.onLayoutReady()".
         * [1] "Options -> Appearence -> Interface, Ribbon menu configuration".
         */
        this.ribbon = new PluginRibbon(this);

        /*
         * Ensure that all plugins are loaded.
         *  https://forum.obsidian.md/t/how-to-access-other-plugins-as-dependencies/14469/2
         *  Thanks to pjeby
         */
        this.app.workspace.onLayoutReady( () => {
            if (! appHasDailyNotesPluginLoaded()) {
                new Notice("You need to enable Daily Notes plugin to use 'Previous Daily Note'");
                this.ribbon.hideRibbonIcon();

                return;
            }

            this.addCommand(getCmdOpenPreviousDailyNote(this));
        });
    }
}
