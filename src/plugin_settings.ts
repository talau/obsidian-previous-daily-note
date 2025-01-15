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

import { App, PluginSettingTab, Setting } from "obsidian";

import PreviousDailyNote from "./main";
import { PluginRibbon } from "./plugin_ribbon";

export interface PluginSettings {
    showRibbonIcon: boolean;
}

const DEFAULT_SETTINGS: PluginSettings = {
    showRibbonIcon: true
}

export async function loadSettings(plugin: PreviousDailyNote) {
    plugin.settings = Object.assign({}, DEFAULT_SETTINGS, await plugin.loadData());
    plugin.ribbon = new PluginRibbon(plugin);
}

export class PreviousDailyNoteSettingTab extends PluginSettingTab {
    plugin: PreviousDailyNote;

    constructor(app: App, plugin: PreviousDailyNote) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { containerEl } = this;

        containerEl.empty();

        new Setting(containerEl)
            .setName("Sidebar icon")
            .setDesc("Show icon on the sidebar (ribbon)")
            .addToggle((toggle) =>
                toggle
                    .setValue(this.plugin.settings.showRibbonIcon)
                    .onChange(async (value) => {
                        this.plugin.settings.showRibbonIcon = value;
                        await this.plugin.saveSettings();
                        if (value)
                            this.plugin.ribbon.showRibbonIcon();
                        else
                            this.plugin.ribbon.hideRibbonIcon();
                    })
            );
    }
}
