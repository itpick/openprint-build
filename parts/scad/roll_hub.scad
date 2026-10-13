// Roll hub (print 2). Plugs into the roll's cardboard core and carries a 608
// bearing in a pocket on its outer face; the roll axle's pin goes into the
// bearing.
//
// Print flange-down. 2" (50.8) cores are standard for 297 mm rolls; set
// core_id = 25.4 for 1" cores.

include <common.scad>

core_id   = 50.8;
plug_l    = 18;
flange_d  = 70;      // below the roll OD so it never touches the frame
flange_t  = 3;
hub_d     = b608_d + 6;

difference() {
    union() {
        cylinder(d = flange_d, h = flange_t);
        // plug: slight taper so it wedges into the core
        cylinder(d1 = core_id - 0.2, d2 = core_id - 1.2, h = flange_t + plug_l);
    }
    // hollow the plug, leave the bearing boss and 3 spokes
    difference() {
        translate([0, 0, flange_t]) cylinder(d = core_id - 5, h = plug_l + 1);
        cylinder(d = hub_d, h = 100);
        for (a = [0, 120, 240]) rotate(a) translate([0, -1.5, 0]) cube([core_id, 3, 100]);
    }
    // 608 pocket from the flange (outer) face, light press
    translate([0, 0, -1]) cylinder(d = b608_d + 0.05, h = b608_w + 1);
    // clearance for the axle pin past the bearing
    cylinder(d = rod_d + 2, h = 100);
}
