# Installation and compatibility guide

## Server plugin: Carpet Fake Players

1. Check that the server runs Paper or Purpur, and note its exact Minecraft version.
2. Open the [Carpet Fake Players Modrinth page](https://modrinth.com/plugin/carpetfakeplayer) and choose the matching release. The project publishes separate builds for 26.1.x, 26.2 and 26.3.
3. Stop the server and back up its directory.
4. Put the downloaded JAR in the server's `plugins/` directory.
5. Start the server, then check the generated `plugins/Carpet Fake Players/config.yml`.
6. Before letting regular players use the plugin, configure bot limits, ownership permissions, persistence and physics.
7. Test the plugin on a staging server first, especially if other plugins affect authentication, player lists, permissions or entity behavior.

Do not use a JAR built for a different Minecraft target. The project lists Paper and Purpur as supported platforms; do not assume that Folia or standalone Spigot is supported.

## Resource packs

These packs are client-side. Install them in Minecraft Java Edition's resource-pack folder:

- [ZeroXFog](https://modrinth.com/mod/zeroxfog)
- [Netherite Stones & Ores](https://modrinth.com/resourcepack/netherite-ores)
- [Smooth Fonts 32x](https://modrinth.com/resourcepack/smooth-fonts-32x)

To install a pack:

1. Download the release for your exact Minecraft version from the project's Modrinth Versions page.
2. In Minecraft, open **Options → Resource Packs → Open Pack Folder**.
3. Copy the downloaded ZIP into that folder. Keep it zipped unless the pack's own instructions say otherwise.
4. Return to the game and enable the pack.
5. Move it above other packs that change the same assets. Packs higher in the list can override overlapping textures, font definitions or shader files.

You can enable multiple packs at once, but their order determines which pack takes priority for overlapping assets. If something looks wrong, test the pack by itself first.

## Compatibility checks

- Check the project's current Modrinth Versions page for supported versions; they can change after this documentation is written.
- Resource-pack compatibility depends on Minecraft's pack format and assets. A warning does not necessarily mean the game will refuse to load a pack, but forcing an unlisted format can result in missing or incorrect assets.
- ZeroXFog's Sodium-specific fog handling depends on the Sodium shader paths.
- Font mods and other font packs may override Smooth Fonts 32x.
- Texture and blockstate packs may override Netherite Stones & Ores.