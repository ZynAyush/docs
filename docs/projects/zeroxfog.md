# ZeroXFog

**Type:** Minecraft Java resource pack  
**Latest source-tracked release:** 1.2, published 10 October 2026  
**Links:** [Modrinth](https://modrinth.com/mod/zeroxfog) · [Source and release provenance](https://github.com/ZynAyush/ZeroXFog)

ZeroXFog reduces or removes fog that obscures distant scenery and views of dimensions. The goal is clearer visuals while keeping Minecraft's familiar look.

## Features

- **Dimension fog changes:** Removes distracting fog in the Nether and End.
- **Overworld and cave visibility:** The project description and checked-in shader assets also target distance/dimensional fog behavior in the Overworld and caves.
- **Shader-level implementation:** The release includes Minecraft core shader overrides and fog include files.
- **Sodium shader support:** The release also includes Sodium shader include overrides, so fog adjustments apply to more than the vanilla shader path.
- **Compatibility overlays:** Includes multiple overlays for different resource-pack formats/versions. Minecraft's resource-pack system selects the exact overlay.
- **Vanilla-oriented appearance:** Changes fog behavior without redesigning blocks, items, or the overall art style.

## What it does not do

ZeroXFog is a client-side visual resource pack. It does not change world generation, remove blocks, change server visibility rules, increase render distance by itself, or change server-side gameplay. Actual visibility still depends on client performance, render distance, shader/mod configuration and Minecraft version.

## Installation

1. Download the current ZIP from [Modrinth](https://modrinth.com/mod/zeroxfog/versions).
2. Open the Resource Packs menu in Minecraft Java Edition.
3. Choose **Open Pack Folder** and put the ZIP there without extracting it.
4. Go back to the game, enable ZeroXFog, and move it above packs that replace the same shader resources.
5. If you use Sodium, make sure the pack is enabled and test it with your shader and mod versions.

Resource-pack priority matters: another pack with overlapping shader files placed above ZeroXFog can override some of its changes.

## Compatibility and release notes

The source-tracked 1.2 release lists Java versions from 1.20–1.21.x, snapshots, and Minecraft 26.1–26.3. Modrinth's current Versions page is authoritative for the exact files available today. The repository stores the extracted pack under `pack/` and the original published ZIP under `releases/1.2/`.

## Troubleshooting

- **Fog still appears:** Check that the pack is enabled, check its order, and see if another pack overrides the same shader paths.
- **Sodium-specific fog remains:** Make sure the installed release includes the Sodium compatibility files and that the pack is enabled after changing mod versions.
- **Pack is marked incompatible:** Check the version-specific release on Modrinth. Do not force a pack built for a different format without testing it.
- **Unexpected shader behavior:** Temporarily disable other shader/resource-pack overrides to check for conflicts.

See [source README](https://github.com/ZynAyush/ZeroXFog/blob/main/README.md) and [release provenance](https://github.com/ZynAyush/ZeroXFog/blob/main/docs/RELEASE_PROVENANCE.md).

## License

The project is listed as All Rights Reserved on Modrinth. The repository includes an ARR notice; this is not an open-source reuse licence.