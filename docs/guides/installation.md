# Installation and compatibility guide

## Server plugin: Carpet Fake Players

1. Confirm the server is Paper or Purpur and note its exact Minecraft version.
2. Open the [Carpet Fake Players Modrinth page](https://modrinth.com/plugin/carpetfakeplayer) and select the matching release. The project publishes separate builds for 26.1.x, 26.2 and 26.3.
3. Stop the server and back up the server directory.
4. Put the downloaded JAR in the server's `plugins/` directory.
5. Start the server and inspect the generated `plugins/PlayerBots/config.yml`.
6. Configure bot limits, ownership permissions, persistence and physics before allowing regular players to use it.
7. Test on a staging server first, especially if other plugins alter authentication, player lists, permissions or entity behavior.

Do not use a JAR built for a different Minecraft target. Paper and Purpur are the supported platforms listed by the project; do not assume Folia or standalone Spigot support.

## Resource packs

The following packs are client-side and are installed in Minecraft Java Edition's resource-pack folder:

- [ZeroXFog](https://modrinth.com/resourcepack/zeroxfog)
- [Netherite Stones & Ores](https://modrinth.com/resourcepack/netherite-stones-ores)
- [Smooth Fonts 32x](https://modrinth.com/resourcepack/smooth-font-32x)

General steps:

1. Download the release for the exact Minecraft version from the project's Modrinth Versions page.
2. In Minecraft, open **Options → Resource Packs → Open Pack Folder**.
3. Copy the downloaded ZIP into that folder. Leave it zipped unless the pack's own instructions say otherwise.
4. Return to the game and enable the pack.
5. Move it above other packs that change the same assets. Higher-priority packs can override overlapping textures, font definitions or shader files.

You can enable multiple packs together, but their order determines which overlapping assets take priority. If something does not look right, test the pack by itself first.

## Compatibility checks

- Use the project's current Modrinth Versions page as the source of truth; supported versions can change after this documentation is written.
- Resource-pack compatibility is tied to Minecraft's pack format and assets. A pack warning does not necessarily mean the game will refuse to load it, but forcing an unlisted format can produce missing or incorrect assets.
- Sodium shader paths matter for ZeroXFog's Sodium-specific fog handling.
- Font mods and other font packs may override Smooth Fonts 32x.
- Texture/blockstate packs may override Netherite Stones & Ores.
