#!/usr/bin/env bash
# Render every printable part to stl/. Needs OpenSCAD (nix shell nixpkgs#openscad,
# or set OPENSCAD=/Applications/OpenSCAD.app/Contents/MacOS/OpenSCAD).
set -euo pipefail
cd "$(dirname "$0")/scad"
out=../stl
mkdir -p "$out"
oscad=${OPENSCAD:-openscad}
r() { echo "-> $1"; "$oscad" -q -o "$out/$1.stl" "${@:2}"; }

r cart_fit_gauge     cart_fit_gauge.scad
r carriage           carriage.scad
r frame_left         -D 'part="left"'  frame.scad
r frame_right        -D 'part="right"' frame.scad
r joint_key_platen   -D 'which="platen"' joint_key.scad
r joint_key_back     -D 'which="back"'   joint_key.scad
r roll_arm_left      -D 'side="left"'  roll_arm.scad
r roll_arm_right     -D 'side="right"' roll_arm.scad
r roll_axle          roll_axle.scad
r roll_hub           roll_hub.scad
r feed_roller        feed_roller.scad
r pinch_pad          pinch_pad.scad
r pi_zero_mount      pi_zero_mount.scad
r encoder_knob       encoder_knob.scad
