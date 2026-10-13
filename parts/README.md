# Printable parts (v2, untested)

Our own parametric OpenSCAD design, **not** Open Tools' files: theirs are unpublished
(and will be CC BY-NC-SA 4.0 when they are). v2 copies the Openprinter's layout, measured
from Open Tools' own material:

- **Chassis drawing** ("Tôle Chassis MVP 2", seen in a Crowd Supply photo): 496.5 mm
  long, end profile about 102 × 106 mm with R12 corners.
- **Orthographic renders and dimension sheet** (497 × 233 × 111): paper 86–383 mm from
  the left edge, roll position.
- **See-through CAD front view of the right end** (opentools.studio image 1180), scaled
  from the 42.3 mm motor face:
  - carriage motor flush right, centre 23 mm in and 59 mm above their floor
  - feed motor under it
  - their steel floor sits on 12 mm feet; our floor is the desk, so our heights are
    theirs + 12
- **Cover-off press photos and the Crowd Supply assembly video:**
  - carriage with the cartridges hanging in front of a contact plate, rods and belt
    behind, belt on top
  - feed shaft low and forward, with two white rollers, driven inline through the beam
    coupler
  - left bracket holding the rod ends and the idler
  - motor label: STEPPERONLINE 17HE12-1204S
- **Cartridge size:** from a professional 3D scan of an HP 123, the same shell as the
  63/302/803 (hackaday.io/project/176931). Body 28 × 47 mm, 32.1 mm across the ears,
  42.3 mm tall, hanging on the ears 36 mm above the nozzles. HP doesn't publish these.

Not copied, because the photos don't resolve them: the exact rod heights and depths, and
the cutter (the 49 mm wheel at the front right). The positions we use are engineered
around the measured anchors above.

Everything prints on a Prusa CORE One (250 × 220 × 270) with no supports.

![assembly](img/assembly.png)

## Layout (frame coordinates: X from the left wall's inner face, Y forward from the back, Z up from the desk)

| | Position |
|---|---|
| Paper | x 80–377; drops down the back wall onto 7 curved paper ramps, then flat at z 21 |
| Feed shaft | y 80, z 27 (= their feed motor centre); 2 TPU rollers Ø12 at x 154 / 303 on TPU pinch pads |
| Cartridges | contact face y 50.8, nozzles z 22.5 (1.5 above the paper); front half clears the rollers by 1.5 |
| Carriage rods | y 34.3, z 34 (2× LM8UU) and z 52 (slot); park x 39 (left), far right x 367 |
| Belt | in the rod plane, pulley axis z 71 (= their carriage motor); idler (2× F623ZZ) in the left bracket |
| Carriage motor | x 462.85, z 71, on the separate motor mount: body in front of the plate, shaft back to the pulley |
| Feed motor | under it, axis X, inline with the coupler; the bay takes a 34 or 40 mm body |
| Display pod | x 400–448 (406–454 from the left outer edge), wedge 22 mm above the top, knob centre 25 mm in from the right |

## Frame joint

The frame prints as two 248.25 mm halves. A tongue or dovetail would make one half
longer than the bed allows, so the halves join with **butterfly-key joinery**. Each half
carries half of two joint blocks:

- **Platen block:** a wide rib under the paper. Its key pushes up through the floor.
- **Back block:** on the outside of the back wall. Its key drops in from the top.

Two **M3 × 16** screws with nuts clamp each block.

## What has and hasn't been checked

- **Checked:** every STL is watertight and fits the bed. All 17 `assembly.scad` checks
  come out empty, with the carriage and both cartridges at five positions:
  - **Collisions:** frame (with the motor mount and paper ramps), carriage, bought
    parts, rods, belt (both runs), paper, the two motors against each other, motor
    screw heads, roll, arms, display pod.
  - **Install paths:**
    1. The feed motor drops in from the top through its U-slot.
    2. The carriage motor goes in shaft-first from the front.
    3. Both rods and the feed shaft slide in through the left wall.
    4. The cartridges drop into the holder.
- **Not checked:** nothing has been printed or assembled.
  - The cartridge numbers come from one scan. **Print `cart_fit_gauge` first.**
  - The carriage front is at y 101.5 of 102.
  - The rollers clear the cartridges' front half by 1.5 mm.
- **Not designed yet:**
  - contact flex / pogo board behind the plate windows (see the scanned holder in the
    PrintSpider project)
  - spit/park pad at the left
  - cutter wheel
  - frosted cover and the main board's mount
  - endstop, FFC rail, paper clips, wall-mount wire

## Assembly order

1. Motor mount: bolt it to the floor (4× M3 × 12 button heads from below).
2. Feed motor: drop it into its plate from the top. Fit the coupler.
3. Carriage motor: slide the pulley into the gap behind the motor mount's plate, then
   push the motor in from the front.
4. Carriage: press 2× LM8UU into the carriage.
5. Rods: slide both through the left wall and the carriage until they bottom out in the
   motor mount. Fit the grub screws.
6. Feed shaft: slide it through the left wall with the two rollers on it, into the
   coupler.
7. Idler and belt: idler in the left bracket. Belt over the pulley and idler, both ends
   zip-tied in the carriage clamp.
8. Paper ramps and pinch pads: hook the 7 ramps into the back-wall slots, one M3 × 8
   each from below; drop the pinch pads into their pockets.
9. Display pod: LCD glass into the window recess (foam tape behind the board), EC11
   through the deck, then screw the deck to the motor mount and the end wall.

## Parts

| STL | Qty | Material | Notes |
|---|---|---|---|
| `cart_fit_gauge` | 1 | any | print first: one holder pocket, check the ears seat |
| `frame_left` | 1 | PETG | floor, back wall, left end, rod/idler bracket, feed shaft bushing |
| `frame_right` | 1 | PETG | right end + ports, feed motor plate |
| `motor_mount` | 1 | PETG | carriage motor plate + gusset + right rod ends; carries the display pod |
| `display_pod` | 1 | PETG | LCD wedge + deck with the EC11 hole (Waveshare 1.47": glass 36.3 × 19.4) |
| `paper_ramp` | 7 | PETG (white) | curved guides at the back of the platen, hook into the back wall |
| `joint_key_platen`, `joint_key_back` | 1 each | PETG | frame joint |
| `carriage` | 1 | PETG/ASA | prints standing on its front bar |
| `roll_arm_left`, `roll_arm_right` | 1 each | PETG | bolt to the back wall, M3 × 10 + nuts |
| `roll_hub` | 2 | PETG | 2" core; 608 pressed into the outer face |
| `roll_axle` | 2 | PETG | journal sits in the arm hook |
| `feed_roller` | 2 | **TPU 95A** | friction fit on the feed shaft |
| `pinch_pad` | 2 | **TPU 95A** | drops into the platen pockets under the rollers |
| `pi_zero_mount` | 1 | PETG | Pi Zero W (65 × 30, M2.5 on 58 × 23) |
| `encoder_knob` | 1 | PETG | EC11, Ø6 D-shaft, flat 4.5 |

PETG, 0.2 mm layers, 4 perimeters, 25 % gyroid. Solid volume is about 880 cm³; expect
roughly 0.5–0.7 kg.

## Bought parts

| Part | Qty | Notes |
|---|---|---|
| 8 mm steel rod (h6), 412 mm | 2 | carriage rods |
| 8 mm steel rod, 423 mm | 1 | feed shaft (left wall to 11 mm into the coupler) |
| LM8UU (8 × 15 × 24) | 2 | carriage |
| 608 bearing (8 × 22 × 7) | 2 | roll hubs |
| F623ZZ flanged bearing (3 × 10 × 4) + M3 × 20 + nut | 2 | belt idler |
| NEMA17, 34 mm body (17HS3401; theirs: 17HE12-1204S) | 2 | the feed bay also takes 40 mm (17HS4401). Shaft 21–25 mm, measure it |
| GT2 20T pulley, 5 mm bore (16 × 16) | 1 | teeth toward the plate |
| GT2 6 mm belt | ~0.95 m | both ends zip-tied in the carriage clamp |
| Beam coupler 5 → 8 mm, D19 L25 | 1 | |
| M3 × 16 + nuts | 4 | frame joint |
| M3 × 10 + nuts | 4 | roll arms |
| M3 × 12 button head | 4 | motor mount to the floor |
| M3 × 8 | 7 | paper ramps |
| M3 × 12 self-tap | 4 | display pod deck |
| M3 grub screws | 2 | rods, in the left bracket |
| M3 thumb screws × 10 | 2 | press the cartridges onto their contacts |
| M3 (motors), M2.5 self-tap (Pi), M4 (wall / feet) | | |
| EC11 encoder, Pi Zero W, Waveshare 1.47" ST7789, stepper drivers, cartridge board | | electronics TBD |
| HP 63 / 302 (or 123 / 803) black + colour | 1 each | |

## Rebuilding

```sh
nix shell nixpkgs#openscad --command ./render.sh          # all STLs -> stl/
nix shell nixpkgs#openscad --command openscad -D 'check="frame_vs_carriage"' -o /tmp/c.stl scad/assembly.scad
```

On macOS with the OpenSCAD app: `OPENSCAD=/Applications/OpenSCAD.app/Contents/MacOS/OpenSCAD ./render.sh`.

All dimensions live in `scad/common.scad`. Re-render and re-run the 17 checks after any
change. An empty result ("top level object is empty") means no collision.
