# IsraelCord

Mass delete your Discord messages right inside Discord, and archive them when you want to keep a copy first.

## Features

- Prune messages in a channel or DM with filters
- Purge messages across an entire server
- Ghost mode to scan and clean old messages
- DM purge functionality
- Message archive tool with channel, DM and whole server sources
- Date ranges with presets, message limits, author filters, keyword and regex filters
- Bot, attachment and embed filters
- Export as JSON, NDJSON, plain text, Markdown, styled HTML or CSV
- Live counters, download log and a preview of collected messages
- Automatic token detection, no copy and paste needed
- Feedback box with a 4 hour cooldown
- Statistics tracking

## Installation

1. Download or clone this repository
2. Open Chrome and go to chrome://extensions/
3. Enable Developer mode
4. Click Load unpacked and select the extension folder

## Usage

1. Open Discord in your browser
2. Click the IsraelCord button in the toolbar, or the button in the Discord title bar
3. Press Auto-detect token, IsraelCord links your session by itself
4. Use the tabs to prune, purge, ghost, clean DMs or download messages

## Downloading messages

1. Open the Download tab
2. Choose Channel or Server as the source, then detect the ID from the page
3. Leave Everything on for the full history, or pick a date range, presets are included
4. Add filters such as only mine, skip bots, keyword, regex or a specific author ID
5. Pick an export format and start the download
6. The file is saved to your Downloads folder when it finishes, and Save again keeps a second copy

## Automatic Updates

The updater.py script checks for updates in this GitHub repository and updates the current directory. It is recommended that you add updater.py to your startup folder so IsraelCord updates itself automatically each time you sign in.

On Windows, press Win + R, type shell:startup, and place a shortcut to updater.py there.

## Notes

Use responsibly and in accordance with Discord's Terms of Service. Only your own messages are deleted, and the archive tool only reads what you already have access to.
