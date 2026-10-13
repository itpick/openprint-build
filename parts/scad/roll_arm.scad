// Roll arm (print one left, one right). Bolts to the outside of the back wall
// with two M3 x 10 + nuts and holds a roll axle in an open-top hook, so the
// roll lifts straight out, as on the Openprinter's roll bracket.
//
//   -D 'side="left"' or -D 'side="right"'
//
// Print flat (the big plate on the bed, tab up), no supports.

include <common.scad>

side = "left";
dir  = side == "left" ? -1 : 1;     // tab points away from the paper

strip_y = 8;                         // part of the arm behind the back wall
hook_r  = 16;
slot_w  = 12.4;                      // roll_axle journal is 12

// Arm outline in (Y, Z) frame coordinates.
module arm_profile() {
    difference() {
        union() {
            translate([-strip_y, height - 50]) square([strip_y, 60]);
            hull() {
                translate([-strip_y, height]) square([strip_y, 10]);
                translate([roll_y, roll_z]) circle(r = hook_r);
            }
        }
        // open-top slot for the axle journal
        translate([roll_y, roll_z]) circle(d = slot_w);
        translate([roll_y - slot_w / 2, roll_z]) square([slot_w, hook_r + 1]);
    }
}

module arm(dir) {
    // plate, thickness along X
    rotate([90, 0, 90]) linear_extrude(arm_t) arm_profile();
    // tab against the back wall, with the two M3 holes
    difference() {
        translate([dir < 0 ? -14 : 0, -back_t, height - 50])
            cube([arm_t + 14, back_t, 50]);
        for (z = [height - 40, height - 15])
            translate([arm_t / 2 + dir * 8, -back_t - 1, z])
                rotate([-90, 0, 0]) cylinder(d = m3, h = back_t + 2);
    }
}

module arm_left()  arm(-1);   // frame coordinates, origin at arm_x
module arm_right() arm(1);

// lay the plate on the bed with the tab pointing up
if (dir < 0) translate([0, 0, arm_t]) rotate([0, 90, 0]) arm(dir);
else rotate([0, -90, 0]) arm(dir);
