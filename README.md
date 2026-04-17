# TUI New Tab

A minimal terminal-style new tab page Chrome extension with productivity features, Islamic tools, and website blocking capabilities.

![Version](https://img.shields.io/badge/version-1.0-blue)
![Manifest](https://img.shields.io/badge/manifest-v3-green)

## Features

### Widgets

- **Clock** - Digital clock with 12/24 hour format options
- **Calendar** - Monthly calendar view
- **Weather** - Current weather conditions with Celsius/Fahrenheit toggle
- **Bookmarks** - Manage and quick-access your favorite sites
- **News** - RSS news feed reader
- **Prayer Times** - Islamic prayer times display
- **Islamic Reminders** - Daily Islamic reminders
- **Zikr Counter** - Digital dhikr/tasbih counter
- **Focus Timer** - Pomodoro-style timer with PIN lock support
- **Daily Mission** - Rotating daily quests with streak tracking
- **Command Palette** - Terminal-style action launcher (`:`)

### Focus Mode

Block distracting websites during focus sessions. Pre-configured to block:
- YouTube
- Twitter/X
- Reddit
- TikTok
- Instagram
- Facebook
- Netflix
- Twitch

### Themes

Choose from 9 built-in themes:
- Terminal (default)
- Monokai
- One Dark
- Catppuccin
- Dracula
- Nord
- Gruvbox
- Solarized
- Rose Pine (Dawn in light mode)

### Custom Background

Set custom background images for your new tab page.

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `i` | Upload ASCII background image |
| `r` | Remove ASCII background |
| `a` | Add bookmark |
| `d` | Delete selected bookmark |
| `Enter` | Open selected item |
| `↑` `↓` | Navigate bookmarks/news |
| `0-9` | Quick select bookmark / open news |
| `h` | Open help modal |
| `e` | Toggle Islamic mode |
| `s` | Open settings |
| `t` | Open themes |
| `f` | Start focus timer |
| `q` | Reroll daily mission |
| `x` | Complete daily mission |
| `y` | Theme roulette |
| `:` | Open command palette |
| `z` | Increment zikr counter |
| `Esc` | Close modal / blur search |

## Installation

### Development

1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top-right corner)
4. Click "Load unpacked"
5. Select the extension folder

### Production

1. Package the extension in Chrome (`chrome://extensions/` → Developer mode → Pack extension)
2. Install the generated `.crx` file

## Project Structure

```
new_tab_extension/
├── manifest.json      # Extension configuration
├── background.js      # Service worker for blocking rules
├── newtab.html        # New tab page HTML
├── newtab.css         # Terminal-style styling
├── newtab.js          # Main application logic
├── block_rules.json   # Website blocking rules
├── blocked.html       # Blocked site redirect page
└── favicon.png        # Extension icon
```

## Permissions

| Permission | Purpose |
|------------|---------|
| `storage` | Save bookmarks, settings, and preferences |
| `declarativeNetRequest` | Block distracting websites during focus mode |
| `alarms` | Schedule prayer time notifications |
| `<all_urls>` | Apply blocking rules to all websites |

## Configuration

### Settings

Access via `s` key:
- **Temperature Unit** - Toggle between Celsius and Fahrenheit
- **Clock Format** - Switch between 12-hour and 24-hour display

### Focus Timer PIN

Set a 4-digit PIN to prevent early termination of focus sessions.

## Customization

### Adding Block Rules

Edit `block_rules.json` to add or modify blocked websites:

```json
{
  "id": 10,
  "priority": 1,
  "action": {
    "type": "redirect",
    "redirect": {
      "extensionPath": "/blocked.html"
    }
  },
  "condition": {
    "urlFilter": "||example.com",
    "resourceTypes": ["main_frame"]
  }
}
```

### Theme Colors

Modify CSS variables in `newtab.css` to create custom themes.

## Browser Support

- Google Chrome (Manifest V3)
- Microsoft Edge
- Other Chromium-based browsers

## License

MIT License

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request
