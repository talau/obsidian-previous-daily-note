# Previous Daily Note

![GitHub release](https://img.shields.io/github/v/release/talau/obsidian-previous-daily-note)

[![Build](https://github.com/talau/obsidian-previous-daily-note/actions/workflows/build.yml/badge.svg)](https://github.com/talau/obsidian-previous-daily-note/actions/workflows/build.yml)
[![Release](https://github.com/talau/obsidian-previous-daily-note/actions/workflows/release.yml/badge.svg)](https://github.com/talau/obsidian-previous-daily-note/actions/workflows/release.yml)

---
This is a [Obsidian](https://obsidian.md) plugin that opens the previous daily note. Unlike the \"Daily notes\" command \"Open previous daily note\", it opens the previous daily note starting from today, rather than the daily note currently open. It also provides a ribbon icon and a command to perform this action.

# Install
I already submitted the plugin to [Obsidian Community plugins](https://obsidian.md/plugins) but I'm still waiting for approval. For now you can install it manually.

Steps to manually install:

1. Download the files main.js and manifest.json from [here](https://github.com/talau/obsidian-previous-daily-note/releases).
2. In your Obsidian vault create a directory ".obsidian/plugins/obsidian-previous-daily-note".
3. Copy the files from step 1 to the new directory.
4. Restart Obsidian.
5. Enable plugin in Settings -> Community plugins.

# Usage
Just click on the ribbon icon or execute a command from the [Command Palete](https://help.obsidian.md/Plugins/Command+palette).

![Plugin Ribbon Icon](https://github.com/talau/obsidian-previous-daily-note/raw/main/docs/images/plugin-ribbon.png)

![Plugin Command](https://github.com/talau/obsidian-previous-daily-note/raw/main/docs/images/plugin-command.png)


# How to build
Clone the repository and run the commands:

```bash
$ npm i
$ npm run build
$ ls dist/
```

# Releasing a new version
Inside the project directory:

```bash
$ npm run release
```
