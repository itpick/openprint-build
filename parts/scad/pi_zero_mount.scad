// Raspberry Pi Zero W tray (65 x 30, M2.5 holes on 58 x 23). Screws to the
// tray floor in the right-front electronics bay with two M3.

include <common.scad>

difference() {
    union() {
        translate([-37, -19, 0]) cube([74, 38, 2.5]);
        for (x = [-29, 29], y = [-11.5, 11.5])
            translate([x, y, 0]) cylinder(d = 6, h = 2.5 + 5);
    }
    for (x = [-29, 29], y = [-11.5, 11.5])
        translate([x, y, -1]) cylinder(d = 2.2, h = 20);   // M2.5 self-tap
    for (x = [-20, 20]) translate([x, 0, -1]) cylinder(d = m3, h = 5);
}
