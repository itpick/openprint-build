// Print this FIRST (5 min). Two 12 mm-tall rings sized exactly like the
// carriage pockets. If an HP 63/302 doesn't slide in snugly, change cart_w /
// cart_d / cart_fit in common.scad and re-render everything.

include <common.scad>

pw = cart_w + cart_fit;
pd = cart_d + cart_fit;

for (i = [0, 1]) translate([i * (pw + 8), 0, 0])
    difference() {
        translate([-2, -2, 0]) cube([pw + 4, pd + 4, 12]);
        translate([0, 0, -1]) cube([pw, pd, 14]);
        translate([pw / 2 - 3, -3, 8]) cube([6, 4, 5]);   // which-way-round notch
    }
