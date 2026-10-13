// Feed roller sleeve (print 4, TPU 95A). Friction fit on the 8 mm feed shaft;
// the sleeve's compliance supplies the pinch force against the 608 bearings
// below (centre distance = 23, sleeve r = feed_r = 12.3 + bearing r 11).
//
// Sleeve centres in X: 115, 190, 278, 352 (two per side of the A4 centreline).

include <common.scad>

len = 40;

difference() {
    cylinder(r = feed_r, h = len, $fn = 96);
    translate([0, 0, -1]) cylinder(d = rod_d - 0.4, h = len + 2);
}
