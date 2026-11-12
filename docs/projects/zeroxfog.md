# ZeroXFog

**Type:** Minecraft Java resource pack  
**Latest source-tracked release:** 1.2, published 10 October 2026  
**Links:** [Modrinth](https://modrinth.com/mod/zeroxfog) · [Source and release provenance](https://github.com/ZynAyush/ZeroXFog)

ZeroXFog reduces or removes the fog effects that obscure distant scenery and dimension views. The aim is better visual clarity while keeping the familiar Minecraft look.

## Features

- **Dimension fog changes:** Removes distracting fog in the Nether and End.
- **Overworld and cave visibility:** The project description and checked-in shader assets target distance/dimensional fog behavior in the Overworld and caves as well.
- **Shader-level implementation:** The release contains Minecraft core shader overrides and fog include files.
- **Sodium shader support:** The release also includes Sodium shader include overrides, so the fog adjustment is not limited to the vanilla shader path.
- **Compatibility overlays:** The pack contains multiple overlays for different resource-pack formats/versions. Minecraft's resource-pack system handles the exact overlay selection.
- **Vanilla-oriented appearance:** It changes fog behavior rather than redesigning blocks, items, or the overall art style.

## What it does not do

ZeroXFog is a client-side visual resource pack. It does not alter world generation, remove actual blocks, change server visibility rules, increase render distance by itself, or modify server-side gameplay. Actual visibility remains affected by client performance, render distance, shader/mod configuration, and Minecraft version.

## Installation

1. Download the current ZIP from [Modrinth](https://modrinth.com/mod/zeroxfog/versions).
2. Open Minecraft Java Edition's Resource Packs menu.
3. Choose **Open Pack Folder** and place the ZIP there without extracting it.
4. Return to the game, enable ZeroXFog, and move it above packs that override the same shader resources.
5. If using Sodium, confirm the pack is enabled and test with the shader/mod versions you run.

Resource-pack priority matters: another pack with overlapping shader files placed above ZeroXFog can override some of its changes.

## Compatibility and release notes

The source-tracked 1.2 release lists Java versions from 1.20–1.21.x, snapshots, and Minecraft 26.1–26.3. Modrinth's current Versions page is authoritative for the exact files available today. The repository stores the extracted pack under `pack/` and the original published ZIP under `releases/1.2/`.

## Troubleshooting

- **Fog still appears:** Check pack enablement, pack order, and whether another pack overrides the same shader paths.
- **Sodium-specific fog remains:** Confirm the installed release includes the Sodium compatibility files and that the pack is enabled after changing mod versions.
- **Pack is marked incompatible:** Check the version-specific release on Modrinth; do not force a pack built for a different format without testing.
- **Unexpected shader behavior:** Temporarily disable other shader/resource-pack overrides to isolate conflicts.

See [source README](https://github.com/ZynAyush/ZeroXFog/blob/main/README.md) and [release provenance](https://github.com/ZynAyush/ZeroXFog/blob/main/docs/RELEASE_PROVENANCE.md).

## License

The project is listed as All Rights Reserved on Modrinth. The repository includes an ARR notice; this is not an open-source reuse licence.