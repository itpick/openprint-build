// Roll hub (print 2). Plugs into the roll's cardboard core and clamps to the
// 8 mm spindle with an M3 grub screw. A 608 bearing on each spindle end drops
// into the slot in the end-wall roll arm.
//
// Print flange-down. VERIFY core_id: 2" (50.8) is common for 297 mm plotter
// rolls; set 25.4 for 1" cores.

include <common.scad>

core_id   = 50.8;
plug_l    = 18;
flange_d  = 86;      // keeps the roll square; < 2 * (roll_z - height)
flange_t  = 3;
hub_d     = 18;

difference() {
    union() {
        cylinder(d = flange_d, h = flange_t);
        // plug: slight taper so it wedges into the core
        cylinder(d1 = core_id - 0.2, d2 = core_id - 1.2, h = flange_t + plug_l);
        cylinder(d = hub_d, h = flange_t + plug_l + 8);
    }
    // hollow the plug, leave 3 spokes
    difference() {
        translate([0, 0, flange_t]) cylinder(d = core_id - 5, h = plug_l + 1);
        cylinder(d = hub_d, h = 100);
        for (a = [0, 120, 240]) rotate(a) translate([0, -1.5, 0]) cube([core_id, 3, 100]);
    }
    translate([0, 0, -1]) cylinder(d = rod_d + 0.25, h = 100);
    // M3 grub screw + nut trap in the boss
    translate([0, 0, flange_t + plug_l + 4]) rotate([0, 90, 0]) cylinder(d = m3_tap, h = hub_d);
    translate([hub_d / 2 - 4, -3.1, flange_t + plug_l + 0.5]) cube([2.6, 6.2, 20]);
}
