# Carpet Fake Players

**Type:** server plugin  
**Platforms:** Paper and Purpur  
**Minecraft targets:** 26.1.x, 26.2 and 26.3 (use the matching build)  
**Java:** 25  
**Links:** [Modrinth](https://modrinth.com/plugin/carpetfakeplayer) · [Source code](https://github.com/ZynAyush/carpet-fake-players)

Carpet Fake Players adds server-side fake players that you can spawn and control with `/bot`. It is intended for server owners who need player-like entities for testing, server activities or administration. It is not a client mod: install the JAR that matches your Minecraft version on the Paper or Purpur server.

## Feature guide

### 1. Bot spawning and ownership

- Spawn a fake player with a name you choose, or use the configured default name prefix.
- Players with the required permissions can own and manage their own bots.
- The shipped configuration sets both a server-wide live-bot cap and a per-player cap. The current 26.3 defaults are 50 bots total and 3 per player. You can set the per-player cap from 1 to 5.
- Command permission and ownership are checked separately. A command permission does not automatically let a player control someone else's bot.
- Operators and admins can manage bots and create administrator-managed original bots. Access to original bots can be granted or revoked.

### 2. Player-like server physics

For supported behavior, the plugin runs server-side player and entity ticking rather than treating every bot as a static display. You can configure gravity, collision, velocity, fall damage and knockback handling. Collision behavior can also be controlled with the plugin's collision setting and scoreboard-team rule. Keep physics enabled for normal movement and interaction. Disable it only for bots that are meant to be non-physical.

### 3. Combat and repeated actions

`/bot attack` supports a one-time attack, continuous attacks, an interval mode measured in ticks and a stop action. Attack reach is configurable. The plugin also provides `/bot mine`, an administrator-only mining action with its own enable switch and block reach setting.

### 4. Item use and equipment

`/bot use` triggers an interaction with the bot's held item. It supports single, continuous and interval modes, as well as a stop action. Configuration options control reach, whether a successful use swings the bot's hand, whether held block items and non-block items can be used, and whether mining can be used as a fallback when a right-click does not consume the target interaction.

The plugin can synchronize the bot's visible hand and equipment for viewers. Hotbar and offhand selection are controlled independently. A bot can drop its selected item, a stack or its inventory.

### 5. Inventory, death and persistence

- You can configure what happens to inventory and experience on death.
- The shipped 26.3 configuration keeps inventory and level on death and disables XP-orb drops by default.
- Persistent bots can be autosaved at regular intervals.
- Rejoin snapshots can be saved when a bot quits, is kicked or dies.
- Snapshots can persist across server restarts. An owner or operator can restore a saved bot with `/bot rejoin`.
- When the relevant setting is enabled, a killed bot's inventory can be preserved for a later spawn with the same name.

Persistence settings are separate: spawn defaults, death behavior, kill behavior, autosave and rejoin snapshots each have their own settings. Review the generated configuration before changing them.

### 6. Skin and sneaking

A bot can use a player skin by name, and its sneaking can be turned on or off. Configuration can force the visible sneaking pose and keep it fixed until the owner turns it off.

### 7. Item pickup

Pickup can use the normal server-player physics path or the plugin's fallback bridge. The fallback settings control pickup radius, check interval, the maximum number of item entities processed per check, pickup-delay handling, item-owner restrictions and preferred hotbar placement. Defaults respect normal pickup delays and ownership restrictions rather than instantly collecting every item.

### 8. Messages and integrations

- Join and leave messages can announce when fake players arrive or depart.
- Advancement announcements can use separate formatting and can be limited to advancements vanilla would normally announce.
- AuthMe compatibility can be configured.
- LuckPerms support can hide or override inherited group prefixes in bot display names and list names.
- Debug logging and separate spawn, kill and pickup log switches are available.

## Commands

The main command is `/bot`.

| Command | What it does |
|---|---|
| `/bot spawn [name]` | Spawn a bot. |
| `/bot kill [name\|all]` | Remove a bot or all bots the sender is allowed to manage. |
| `/bot kill_other <name>` | Administratively remove another player's bot, subject to permission. |
| `/bot rejoin [name]` | Restore a saved bot snapshot. |
| `/bot info [name]` | Show information about a bot. |
| `/bot attack [name] [single\|continuously\|interval <ticks>\|stop]` | Start or stop attack actions. |
| `/bot use [name] [single\|continuously\|interval <ticks>\|stop]` | Start or stop held-item use actions. |
| `/bot hotbar <name> <0-8>` | Select a hotbar slot. |
| `/bot offhand <name> <0-35\|clear>` | Set or clear the offhand slot. |
| `/bot drop <name>` | Drop the selected item. |
| `/bot dropstack <name> [item]` | Drop a stack. |
| `/bot dropinv <name>` | Drop the inventory. |
| `/bot sneak <name> <on\|off>` | Toggle sneaking. |
| `/bot skin <name> <player>` | Apply a skin by player name. |
| `/bot mine [name] [single\|continuously\|interval <ticks>\|stop]` | Run the administrator-only mining action. |
| `/bot original spawn <name>` | Create an administrator-managed original bot. |
| `/bot original grant <player>` | Grant original-bot management access. |
| `/bot original revoke <player>` | Revoke original-bot management access. |
| `/bot reload` | Reload configuration. |

If a player owns exactly one active bot, some control commands can omit its name. If they own multiple bots, specify which one to control.

## Permissions

| Permission | Purpose |
|---|---|
| `bot.*` | Parent permission that grants all declared bot permissions. |
| `bot.admin` | Administrative controls. |
| `bot.player` | Normal controls for a player's own bots. |
| `bot.action` | Attack and use controls. |
| `bot.use` | Normal bot commands for owned bots. |
| `bot.rejoin` | Restore saved bots. |
| `bot.kill-other` | Remove another player's bot. |
| `bot.original` | Create and manage original bots. |
| `bot.original.grant` | Grant or revoke original-bot access. |
| `bot.reload` | Reload configuration. |
| `bot.mine` | Use the admin-only mining action. |

Check `plugin.yml` in the source folder for the defaults and permission inheritance in the exact build you use. Ownership checks still apply after permission checks.

## Configuration reference

File: `plugins/Carpet Fake Players/config.yml`. The current 26.3 source includes these sections:

| Section | What it controls |
|---|---|
| `enable`, `debug`, `logging` | Master switch, diagnostics, and spawn, kill and pickup logging. |
| `limits` | Server-wide and per-player bot caps. |
| `spawn` | Default name prefix, persistent-by-default behavior, game mode, invulnerability, collision, glowing, gravity, pickup and starting hotbar slot. |
| `physics` | Whether normal server-player and entity physics runs. |
| `attributes` | Maximum health, movement speed, attack speed and knockback resistance. |
| `hunger` | Whether attacks and item use add normal player exhaustion. |
| `pickup` | Vanilla physics or fallback, radius, check interval, item processing cap, pickup-delay and owner checks, and hotbar preference. |
| `hand-sync` | Visible hand and equipment updates on pickup, hotbar change and item give. |
| `drop` | Thrown-item velocity multiplier and pickup delay. |
| `sneak` | Forced and fixed sneaking-pose behavior. |
| `death`, `kill` | Inventory, level and XP behavior on death or removal. |
| `mine`, `attack`, `use` | Enable switches and action reach. |
| `knockback` | Whether vanilla Paper knockback is left intact. |
| `autosave` | Periodic save interval. |
| `join-message`, `leave-message`, `advancement-message` | Chat announcements and formatting. |
| `owner-offline-timeout`, `owner-offline-warning` | Timeout for ordinary owned bots and the warning message. The current default timeout is 15 minutes. |
| `authme` | AuthMe fake-player bridge behavior. |
| `luckperms` | Bot prefix handling. |
| `rejoin` | Snapshot capture, persistence across restarts and which removal events can be restored. |
| `collision` | Player-style collision and collision team or rule. |
| `messages` | Prefix and success, error and warning colors. |

Most settings have comments in the shipped YAML. Some require a server restart; do not assume a reload applies restart-only settings.

## Installation and version matching

1. Stop the server and back up its files.
2. Download the plugin release for the server's exact Minecraft version.
3. Put the JAR in `plugins/`.
4. Start the server and review `plugins/Carpet Fake Players/config.yml`.
5. Assign players only the permissions they need.
6. Test spawning, ownership and persistence on a staging server before enabling the plugin on a busy production server.

Paper and Purpur are the listed server platforms. The repository does not claim standalone Spigot/Bukkit or Folia support. See the [installation guide](../guides/installation.md) and [source README](https://github.com/ZynAyush/carpet-fake-players/blob/main/README.md).

## Build from source

Each Minecraft target has its own Gradle project: `Carpet-Fake-Players-26.1-source`, `Carpet-Fake-Players-26.2-source` and `Carpet-Fake-Players-26.3-source`. Build the matching directory with JDK 25:

```bash
./gradlew clean build
```

On Windows, use `gradlew.bat clean build`. The JAR is created in that version project's `build/libs/` directory.

## Support

For a useful bug report, include the Minecraft version, Paper/Purpur build, Java version, plugin build, relevant plugins, full console stack trace and steps to reproduce the problem. [Open a GitHub issue](https://github.com/ZynAyush/carpet-fake-players/issues).