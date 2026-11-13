# Installation and compatibility guide

## Server plugin: Carpet Fake Players

1. Check that the server runs Paper or Purpur. Note its exact Minecraft version.
2. Open the [Carpet Fake Players Modrinth page](https://modrinth.com/plugin/carpetfakeplayer) and choose the matching release. The project publishes separate builds for 26.1.x, 26.2 and 26.3.
3. Stop the server and back up its directory.
4. Put the downloaded JAR in the server's `plugins/` directory.
5. Start the server, then check the generated `plugins/Carpet Fake Players/config.yml`.
6. Before players use the plugin, set bot limits, ownership permissions, persistence and physics.
7. Test the plugin on a staging server first, especially if other plugins affect authentication, player lists, permissions or entity behavior.

Don't use a JAR built for a different Minecraft target. The project lists Paper and Purpur as supported platforms; don't assume Folia or standalone Spigot is supported.

## Resource packs

These packs are client-side. Install them in Minecraft Java Edition's resource-pack folder:

- [ZeroXFog](https://modrinth.com/mod/zeroxfog)
- [Netherite Stones & Ores](https://modrinth.com/resourcepack/netherite-ores)
- [Smooth Fonts 32x](https://modrinth.com/resourcepack/smooth-fonts-32x)

To install a pack:

1. Download the release for your exact Minecraft version from the project's Modrinth Versions page.
2. In Minecraft, open **Options → Resource Packs → Open Pack Folder**.
3. Copy the downloaded ZIP into that folder. Keep it zipped unless the pack's instructions say otherwise.
4. Go back to the game and enable the pack.
5. Move it above packs that change the same assets. Packs higher in the list can override overlapping textures, font definitions or shader files.

You can enable several packs at once, but their order decides which pack takes priority when they change the same assets. If something looks wrong, test the pack on its own first.

## Compatibility checks

- Check the project's current Modrinth Versions page for supported versions. They may change after this documentation is written.
- Resource-pack compatibility depends on Minecraft's pack format and assets. A warning does not always mean the game will refuse to load a pack, but forcing an unlisted format can lead to missing or incorrect assets.
- ZeroXFog's Sodium-specific fog handling relies on Sodium's shader paths.
- Font mods and other font packs may override Smooth Fonts 32x.
- Texture and blockstate packs may override Netherite Stones & Ores.