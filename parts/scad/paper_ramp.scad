// Paper ramp (print 7, PETG): the white curved pieces along the back of the
// Openprinter's paper plate. Each turns the paper coming down the back wall
// forward onto the platen. A tab hooks into a slot in the back wall and an
// M3 x 8 from under the floor holds it down.
//
// Print lying on its side (as output), no supports.

include <common.scad>

module ramp_profile() {
    c = [back_t + lead_r, paper_z + lead_r];
    difference() {
        union() {
            // body behind the curve, plus a short flat lip at paper height
            translate([back_t, base_t]) square([lead_r + 1, paper_z + lead_r - base_t]);
            // tab into the back wall slot
            translate([back_t - ramp_tab[0], paper_z]) square([ramp_tab[0] + 0.01, ramp_tab[1]]);
        }
        translate(c) circle(r = lead_r, $fn = 96);
        translate([back_t + lead_r, paper_z]) square([10, 50]);
    }
}

module paper_ramp() {
    difference() {
        translate([-ramp_w / 2, 0, 0]) rotate([90, 0, 90]) linear_extrude(ramp_w) ramp_profile();
        translate([0, back_t + 8, base_t - 1]) cylinder(d = m3_tap, h = 9);
    }
}

// print orientation: on its side
rotate([0, -90, 0]) translate([ramp_w / 2, 0, 0]) paper_ramp();
