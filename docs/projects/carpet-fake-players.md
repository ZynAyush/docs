# Carpet Fake Players

**Type:** server plugin  
**Platforms:** Paper and Purpur  
**Minecraft targets:** 26.1.x, 26.2 and 26.3 (use the matching build)  
**Java:** 25  
**Links:** [Modrinth](https://modrinth.com/plugin/carpetfakeplayer) · [Source code](https://github.com/ZynAyush/minecraft-playerbots)

Carpet Fake Players adds server-side fake players that can be spawned and controlled through `/bot`. The plugin is intended for server owners who need controllable player-like entities for testing, server activities and administration. It is not a client mod: install the matching plugin JAR on the Paper/Purpur server.

## Feature guide

### 1. Bot spawning and ownership

- Spawn a fake player with a chosen name, or use the configured default name prefix.
- Regular players can own and manage their own bots when granted the player permissions.
- The shipped configuration sets a global live-bot cap and a per-player cap. The current 26.3 default is 50 total and 3 per player; the per-player value is configurable from 1 to 5.
- Ownership is checked separately from command permission. Having a command permission does not automatically let a player control somebody else's bot.
- Operators/admins can manage bots and create administrator-managed original bots. Original-bot access can be granted or revoked.

### 2. Player-like server physics

The plugin runs server-side player/entity ticking for supported behavior rather than treating every bot as a static display. Configurable behavior includes gravity, collision, velocity, fall damage and knockback handling. Collision can be controlled with the plugin's collision setting and scoreboard-team rule. Keep physics enabled for normal movement and interaction; disabling it is intended for deliberately non-physical bots.

### 3. Combat and repeated actions

The `/bot attack` command supports a one-time attack, continuous attacks, a tick-interval mode and stopping an active action. Attack reach is configurable. The plugin also exposes `/bot mine` for an administrator-only mining action, with its own enable switch and block reach setting.

### 4. Item use and equipment

`/bot use` triggers a bot's held-item interaction. It supports single, continuous and interval modes, plus a stop action. The configuration controls reach, whether a successful use swings the bot's hand, whether held block items and non-block items may be used, and whether a mining fallback is allowed when a right-click does not consume the target interaction.

The plugin can synchronize visible hand/equipment state for viewers. Hotbar selection and offhand selection are independently controllable. The bot can drop the selected item, a stack or its inventory.

### 5. Inventory, death and persistence

- Inventory and experience behavior on death can be configured.
- The shipped 26.3 configuration keeps inventory and level on death and disables XP-orb drops by default.
- Persistent bots can be periodically autosaved.
- Rejoin snapshots can be saved when a bot quits, is kicked or dies.
- Snapshots can survive a server restart, allowing an owner or operator to restore a saved bot with `/bot rejoin`.
- A killed bot's inventory can be preserved for a later spawn with the same name when the relevant setting is enabled.

Persistence options are distinct: the spawn default, death behavior, kill behavior, autosave and rejoin snapshot behavior each have their own settings. Review the generated configuration before changing them.

### 6. Skin and sneaking

A bot can use a player skin by name. Sneaking can be toggled on or off. The configuration can force the visible sneaking pose and keep it fixed until the owner turns it off.

### 7. Item pickup

Pickup can use the normal server-player physics path or the plugin fallback bridge. The fallback settings control pickup radius, check interval, maximum item entities processed per check, pickup-delay handling, item-owner restrictions and preferred hotbar placement. The defaults are tuned to respect normal pickup delays and ownership restrictions rather than instantly vacuuming every item.

### 8. Messages and integrations

- Join and leave messages can announce fake-player arrivals/departures.
- Advancement announcements can be formatted separately and can be limited to advancements vanilla would normally announce.
- AuthMe compatibility is configurable.
- LuckPerms support can hide or override inherited group prefixes for bot display/list names.
- Debug logging and spawn/kill/pickup log switches are available.

## Commands

The main command is `/bot`.

| Command | What it does |
|---|---|
| `/bot spawn [name]` | Spawn a bot. |
| `/bot kill [name\|all]` | Remove a bot or all bots the sender is allowed to manage. |
| `/bot kill_other <name>` | Administrative removal of another player's bot, subject to permission. |
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

If a player owns exactly one active bot, some control commands can omit the bot name. With multiple owned bots, specify the name.

## Permissions

| Permission | Purpose |
|---|---|
| `bot.*` | Parent permission granting all declared bot permissions. |
| `bot.admin` | Administrative controls. |
| `bot.player` | Normal controls for a player's own bots. |
| `bot.action` | Attack and use controls. |
| `bot.use` | Normal bot commands for owned bots. |
| `bot.rejoin` | Restore saved bots. |
| `bot.kill-other` | Remove another player's bot. |
| `bot.original` | Create/manage original bots. |
| `bot.original.grant` | Grant or revoke original-bot access. |
| `bot.reload` | Reload configuration. |
| `bot.mine` | Use the admin-only mining action. |

Check the `plugin.yml` in the source folder for defaults and permission inheritance for the exact build. Ownership checks still apply after permission checks.

## Configuration reference

File: `plugins/PlayerBots/config.yml`. The current 26.3 source includes these sections:

| Section | What it controls |
|---|---|
| `enable`, `debug`, `logging` | Master switch, diagnostics, spawn/kill/pickup logging. |
| `limits` | Server-wide bot cap and per-player bot cap. |
| `spawn` | Default name prefix, persistent-by-default behavior, game mode, invulnerability, collision, glowing, gravity, pickup and starting hotbar slot. |
| `physics` | Whether normal server-player/entity physics runs. |
| `attributes` | Maximum health, movement speed, attack speed and knockback resistance. |
| `hunger` | Whether attacks and item use add normal player exhaustion. |
| `pickup` | Vanilla physics vs fallback, radius, check interval, item processing cap, pickup delay/owner checks and hotbar preference. |
| `hand-sync` | Visible hand/equipment updates on pickup, hotbar change and item give. |
| `drop` | Thrown-item velocity multiplier and pickup delay. |
| `sneak` | Forced and fixed sneaking pose behavior. |
| `death`, `kill` | Inventory, level and XP behavior on death/removal. |
| `mine`, `attack`, `use` | Enable switches and action reach. |
| `knockback` | Whether vanilla Paper knockback is left intact. |
| `autosave` | Periodic save interval. |
| `join-message`, `leave-message`, `advancement-message` | Chat announcements and formatting. |
| `owner-offline-timeout`, `owner-offline-warning` | Timeout for ordinary owned bots and warning message. Current default timeout is 15 minutes. |
| `authme` | AuthMe fake-player bridge behavior. |
| `luckperms` | Bot prefix handling. |
| `rejoin` | Snapshot capture, persistence across restart and which removal events can be restored. |
| `collision` | Player-style collision and collision team/rule. |
| `messages` | Prefix and success/error/warning colors. |

Most settings are documented with comments in the shipped YAML. Some require a server restart. Do not assume a reload applies restart-only settings.

## Installation and version matching

1. Stop the server and back up its files.
2. Download the plugin release matching the server's exact Minecraft version.
3. Place the JAR in `plugins/`.
4. Start the server and review `plugins/PlayerBots/config.yml`.
5. Assign only the permissions players need.
6. Test bot spawning, ownership and persistence on a staging server before enabling it on a busy production server.

Paper and Purpur are the listed server platforms. The repository does not claim standalone Spigot/Bukkit or Folia support. See [installation guide](../guides/installation.md) and [source README](https://github.com/ZynAyush/minecraft-playerbots/blob/main/README.md).

## Build from source

Each Minecraft target has its own Gradle project: `PlayerBots-26.1-full-source`, `PlayerBots-26.2-full-source` and `PlayerBots-26.3-full-source`. Build the matching directory with JDK 25:

```bash
./gradlew clean build
```

On Windows use `gradlew.bat clean build`. The JAR is produced in that version project's `build/libs/` directory.

## Support

For a useful bug report include Minecraft version, Paper/Purpur build, Java version, plugin build, relevant plugins, full console stack trace and reproduction steps. [Open a GitHub issue](https://github.com/ZynAyush/minecraft-playerbots/issues).
