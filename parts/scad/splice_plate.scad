// Splice plate for the tray joints (print 4: floor + back wall at each of
// the two joints). Lies inside the tray across the joint, M3 x 12 + nuts.
//
//   -D 'which="floor"' or -D 'which="back"'

include <common.scad>

which = "floor";
w = 40;      // along X, matches splice_w in frame.scad
t = 4;

if (which == "floor")
    difference() {
        translate([-w / 2, 6, 0]) cube([w, 44, t]);
        for (dx = [-w / 4, w / 4], y = [15, 40])
            translate([dx, y, -1]) cylinder(d = m3, h = t + 2);
    }
else
    difference() {
        // printed flat; local Y = height in the tray (clears the floor plate)
        translate([-w / 2, 12, 0]) cube([w, 86, t]);
        for (dx = [-w / 4, w / 4], z = [30, 80])
            translate([dx, z, -1]) cylinder(d = m3, h = t + 2);
    }
