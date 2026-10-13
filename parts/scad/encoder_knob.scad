// Jogger knob for an EC11 rotary encoder (6 mm D-shaft, flat at 4.5 mm).
// Print top-down (the closed face on the bed).

include <common.scad>

d = 22; h = 14; bore_l = 11;

difference() {
    union() {
        cylinder(d = d, h = h, $fn = 96);
    }
    // grip flutes
    for (a = [0 : 15 : 359]) rotate(a) translate([d / 2 + 0.4, 0, 2]) cylinder(d = 2, h = h);
    // D bore from the open (top) side
    translate([0, 0, h - bore_l]) intersection() {
        cylinder(d = 6.15, h = bore_l + 1);
        translate([-3.2, -3.075, 0]) cube([6.4, 4.5 + 0.1, bore_l + 1]);   // flat: 4.6 across
    }
}
