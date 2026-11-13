# Troubleshooting and bug reports

## Carpet Fake Players

**Plugin does not load**
- Make sure the JAR matches the server's exact Minecraft target.
- Make sure the server runs Paper or Purpur and that Java 25 is available for the listed builds.
- Find the first plugin error in the server startup log. Include the complete stack trace when reporting the issue.

**Player cannot control a bot**
- Check bot ownership and the relevant `bot.player`, `bot.use` or `bot.action` permissions.
- Permission and ownership are checked separately. A generic command permission does not let an ordinary player control another player's bot.
- If a player owns multiple bots, include the bot name in control commands.

**Bot disappears or does not rejoin**
- Review the `owner-offline-timeout`, `rejoin`, `autosave`, `death` and `kill` settings.
- Make sure snapshots are enabled for the event that removed the bot. If you expect it to be restored after a restart, make sure persistent snapshots are enabled.
- Original/admin-managed bots can have different timeout behavior from ordinary player-owned bots.

**Physics, collision or pickup looks wrong**
- Review `physics.enabled`, `collision.enabled`, `collision.rule` and the pickup section.
- Check whether another plugin changes entity collisions, item pickup or player ticking.
- Test with a minimal plugin set to check for conflicts.

**Hand or item display does not update**
- Check the `hand-sync` settings and try to reproduce the issue with a clean client/resource-pack setup.

## Resource packs

**Pack does not appear in the menu**
- Confirm the ZIP is in the actual Minecraft `resourcepacks` directory and is not nested inside an extra folder.
- Download the version that matches your game again.

**Some textures, font glyphs or fog changes are missing**
- Move the pack above any packs that overlap with it.
- Temporarily disable other packs to check for conflicts.
- For ZeroXFog, check Sodium compatibility and use the correct release files if you use Sodium.
- For Smooth Fonts 32x, check whether a mod or another pack supplies its own font definition.
- For Netherite Stones & Ores, check whether another pack overrides the same block texture or blockstate.

## Reporting a useful issue

For the plugin, include:
- Minecraft version and exact Paper/Purpur build
- Java version and plugin release
- Relevant plugins and permission setup
- Relevant configuration sections (remove private server details)
- Full console stack trace and clear steps to reproduce the issue

For a resource pack, include:
- Minecraft version and pack version
- Loader/rendering mods such as Sodium, if relevant
- Resource-pack order
- Screenshots showing the expected and actual appearance
- Whether the issue still happens when you test the pack by itself

Report code/plugin issues in the [GitHub repository issue tracker](https://github.com/ZynAyush/carpet-fake-players/issues), or use the relevant project's Modrinth page for pack feedback.