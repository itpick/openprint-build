# openprint-build

Build notes and parts research for the [Open Tools Openprinter](https://www.opentools.studio/) —
an open-source, repairable, DRM-free inkjet from Paris, launched via
[Crowd Supply](https://www.crowdsupply.com/open-tools/openprinter) (pre-launch as of Oct 2026).

## The product

- Repairable inkjet built around standard HP cartridges (printhead lives in the cartridge,
  so a worn head is a cheap consumable swap, not a repair)
- HP 63 (US) / HP 302 (EU) / HP 803 (Asia), black + color, usable independently, refillable, no DRM
- Prints sheets (A4/A3, Letter/Tabloid) or a 297 mm roll with an integrated cutter
- Raspberry Pi Zero W main board + STM32 cartridge board, CUPS print server (driverless,
  AirPrint, Windows/macOS/Linux/iOS/Android), Wi-Fi 802.11ac, BT 4.1, USB-C + USB-A, 24 V DC
- 1.47" TFT + jogger wheel; desk or wall mount; ~497×233×111 mm
- All plastic parts are designed to be 3D-printable; files (and full BOM) promised under
  CC BY-NC-SA 4.0 **after** the final product ships
- Price/speed/ship date: not announced yet

## Part inventory (from specs, FAQ, press; no official BOM yet)

**Electronics:** Raspberry Pi Zero W · STM32 MCU cartridge board · 1.47" 172×320 TFT · jogger wheel

**Print:** HP 63/302/803 cartridges (black, color) · refillable, sold as the "Inkit"
(4× 100 ml bottles black/cyan/magenta/yellow + tools + vials)

**Mechanics:** carriage with belt drive + 2 steel guide rods · removable roll spindle ·
integrated cutter · standard off-the-shelf rods/fasteners · 3D-printable plastic parts
(factory colorways: classic, chalky blue, marble grey, clockwork orange, pistachio, terracotta)

**I/O & power:** USB-C (host) · USB-A (flash drive) · Wi-Fi 802.11ac · BT 4.1 ·
RJ45 Ethernet (in progress per June 2026 update) · 24 V DC 2.1 mm barrel

**Consumables:** A4/A3/Letter/Tabloid sheets · roll 297 mm × 18 m or 37.5 m (11" US)

## The founders

| Person | Role |
|---|---|
| Léonard Hartmann | Mechanical engineering, design & project lead ([@Leonard2vinci](https://github.com/Leonard2vinci)) |
| Nicolas Schurando | Electronics, software & firmware ([@nschurando](https://github.com/nschurando)); also Sitron Labs / Solder Ninja Pen |
| Laurent Berthuel | Industrial partner (manufacturing strategy) |

Wider team: Benjamin Forest (firmware), elium studio (industrial design).
Backed by SATT LUTECH, Bpifrance; linked to ENSCI. Patent + registered design,
files under CC BY-NC-SA 4.0 (non-commercial!).

## Has anyone built one?

No public clone/replica exists. The [OpenTools-Studio GitHub org](https://github.com/OpenTools-Studio)
has zero public repos. Buildable prior art, though — this is the lineage Openprinter
itself descends from:

| Project | Link | Notes |
|---|---|---|
| **YTEC HP45 controller** | [yvodehaas/HP45-standalone-controller-V4.02](https://github.com/yvodehaas/HP45-standalone-controller-V4.02), [Inkjet-commander](https://github.com/yvodehaas/Inkjet-commander) | Full reverse-engineering of the HP45 head (300 nozzles @600 dpi, 52 contacts, 12 V). The most complete DIY inkjet foundation; [project page](https://ytec3d.com/hp45-inkjet-printhead/) has nozzle maps, CAD, timing |
| **SpritesMods Magic Brush** | [spritesmods.com/?art=magicbrush](https://spritesmods.com/?art=magicbrush) | ESP32-driven tri-color cartridge (Hackaday Supercon 2018). This project made Openprinter switch to HP 302/63 |
| **DIY_Inkjet_Printer** | [DIY-Inkjet-Printers/DIY_Inkjet_Printer](https://github.com/DIY-Inkjet-Printers/DIY_Inkjet_Printer) | Barebones Arduino piezo driver |
| **PrintSpider** | [lichnost/PrintSpider_Arduino](https://github.com/lichnost/PrintSpider_Arduino) | Arduino HP-cartridge printing robot |
| **HPWriter** | [dairyking98/HPWriter](https://github.com/dairyking98/HPWriter) | HP45-head silent typewriter |

Community: [Hackaday.io project log](https://hackaday.io/project/202990-open-printer) ·
[Open Tools Discord](https://discord.com/channels/1369359529346596874/1369359529346596877)

## Printing the case on a Prusa CORE One

Feasible. All plastic parts are 3D-printable by design; the machine is modular with standard
components, so individual parts should fit the 250×220×270 mm build volume (long trims may
need splitting). The CORE One's enclosed chamber makes **ASA** the natural choice (near the
24 V PSU, sunlight-tolerant); PETG works too. Their six colorways are just filament choices.
Caveats: STLs/CAD aren't published yet, and CC BY-NC-SA means personal printing is fine but
no selling derivatives, credit required, share-alike.

## Status

- [ ] Watch for Crowd Supply launch (expected autumn 2026)
- [ ] When files drop: download CAD/STLs, verify CORE One build-plate fit per part
- [ ] Evaluate YTEC controller vs waiting for Openprinter's own board files
- [ ] Source HP 302/63 cartridges + refill ink
