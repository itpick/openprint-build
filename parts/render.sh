#!/usr/bin/env bash
# Render every printable part to stl/. Needs OpenSCAD (nix shell nixpkgs#openscad).
set -euo pipefail
cd "$(dirname "$0")/scad"
out=../stl
mkdir -p "$out"
r() { echo "-> $1"; openscad -q -o "$out/$1.stl" "${@:2}"; }

r cart_fit_gauge     cart_fit_gauge.scad
r carriage           carriage.scad
r frame_left         -D 'part="left"'  frame.scad
r frame_mid          -D 'part="mid"'   frame.scad
r frame_right        -D 'part="right"' frame.scad
r splice_floor       -D 'which="floor"' splice_plate.scad
r splice_back        -D 'which="back"'  splice_plate.scad
r roll_hub           roll_hub.scad
r feed_sleeve        feed_sleeve.scad
for i in 0 1 2 3 4; do r "pinch_spacer_$i" -D "i=$i" pinch_spacer.scad; done
r pi_zero_mount      pi_zero_mount.scad
r encoder_knob       encoder_knob.scad
