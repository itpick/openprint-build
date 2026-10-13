// Feed roller (print 2, TPU 95A): the white rollers on the Openprinter's feed
// shaft. Friction fit on the 8 mm shaft at roller_x; they press the paper onto
// the TPU pinch pads in the platen and pull it out the front.

include <common.scad>

difference() {
    cylinder(r = roller_r, h = roller_l, $fn = 96);
    translate([0, 0, -1]) cylinder(d = rod_d - 0.4, h = roller_l + 2);
}
