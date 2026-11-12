# Troubleshooting and bug reports

## Carpet Fake Players

**Plugin does not load**
- Check that the JAR matches the server's exact Minecraft target.
- Confirm the server is Paper or Purpur and Java 25 is available for the listed builds.
- Review the first plugin error in the server startup log; include the complete stack trace when reporting it.

**Player cannot control a bot**
- Check bot ownership and the relevant `bot.player`, `bot.use` or `bot.action` permissions.
- Remember that permission and ownership are separate checks. An ordinary player cannot control another player's bot simply because they have a generic command permission.
- If a player owns multiple bots, include the bot name in control commands.

**Bot disappears or does not rejoin**
- Review `owner-offline-timeout`, `rejoin`, `autosave`, `death` and `kill` settings.
- Confirm snapshots are enabled for the event that removed the bot and persistent snapshots are enabled if restoration after restart is expected.
- Original/admin-managed bots can have different timeout behavior from ordinary player-owned bots.

**Physics, collision or pickup looks wrong**
- Review `physics.enabled`, `collision.enabled`, `collision.rule` and the pickup section.
- Check whether another plugin changes entity collisions, item pickup or player ticking.
- Test with a minimal plugin set to isolate conflicts.

**Hand or item display does not update**
- Check the `hand-sync` settings and reproduce with a clean client/resource-pack setup.

## Resource packs

**Pack does not appear in the menu**
- Confirm the ZIP is in the actual Minecraft `resourcepacks` directory and has not been nested inside an extra folder.
- Re-download the version matching the game.

**Some textures, font glyphs or fog changes are missing**
- Move the pack above overlapping packs.
- Disable other packs temporarily to identify a conflict.
- For ZeroXFog, verify Sodium compatibility and the correct release files if you use Sodium.
- For Smooth Fonts 32x, check whether a mod or another pack supplies its own font definition.
- For Netherite Stones & Ores, check whether another pack overrides the same block texture or blockstate.

## Reporting a useful issue

For the plugin, include:
- Minecraft version and exact Paper/Purpur build
- Java version and plugin release
- Relevant plugins and permission setup
- Relevant configuration sections (remove private server details)
- Full console stack trace and clear reproduction steps

For a resource pack, include:
- Minecraft version and pack version
- Loader/rendering mods such as Sodium, if relevant
- Resource-pack order
- Screenshots showing expected vs actual appearance
- Whether the issue remains when the pack is tested alone

Report code/plugin issues in the [GitHub repository issue tracker](https://github.com/ZynAyush/minecraft-playerbots/issues) or use the relevant project's Modrinth page for pack feedback.
