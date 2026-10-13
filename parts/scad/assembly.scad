// Assembly + interference checks. Not a printable part.
//   openscad -D 'check="carriage_left"' -o /tmp/x.stl assembly.scad
// Each check intersects two groups; an EMPTY result means no collision.

include <common.scad>
use <frame.scad>
use <carriage.scad>

check = "none";
c_min = 80; c_max = 404;          // carriage centre travel (park .. far right)
e = 0.05;                         // shrink envelopes so touching faces don't count

module frame_all() { left(); mid(); right(); }
module carriage_at(c) translate([c, rod_y, rod_z]) carriage_body_all();

// bought parts as simple envelopes
module motor_carriage() translate([pulley_x - nema_w/2, 42 - 38 + e, rod_z + belt_z - nema_w/2 + e]) cube([nema_w, 38 - 2*e, nema_w - 2*e]);
module motor_feed()     translate([L - 45 + e, feed_y - nema_w/2, feed_z - nema_w/2]) cube([38 - 2*e, nema_w, nema_w]);
module pulley()         translate([pulley_x, 48.5, rod_z + belt_z]) rotate([-90,0,0]) cylinder(r = 8, h = 15.5);
module idler()          translate([idler_x, 47.5, rod_z + belt_z]) rotate([-90,0,0]) cylinder(r = 9, h = 9);
module rods()           for (z = [rod_z, rod_z + rod_spacing]) translate([0.5, rod_y, z]) rotate([0,90,0]) cylinder(d = rod_d, h = L - 1);
module shafts()         { translate([pillar_x[0] + 8.5, feed_y, feed_z]) rotate([0,90,0]) cylinder(d = rod_d, h = pillar_x[1] - pillar_x[0] - 9);
                          translate([pillar_x[0] + 8.5, feed_y, pinch_z]) rotate([0,90,0]) cylinder(d = rod_d, h = pillar_x[1] - pillar_x[0] - 9); }
module sleeves()        for (x = [115, 190, 278, 352]) translate([x - 20, feed_y, feed_z]) rotate([0,90,0]) cylinder(r = feed_r, h = 40);
module pinch()          for (x = [115, 190, 278, 352]) translate([x - 3.5, feed_y, pinch_z]) rotate([0,90,0]) cylinder(r = 11, h = 7);
module coupler()        translate([L - 45 - 26 + e, feed_y, feed_z]) rotate([0,90,0]) cylinder(d = 19, h = 25);
module belt()           for (z = [-1, 1]) translate([pulley_x, 49, rod_z + belt_z + z * pulley_pr - belt_t/2]) cube([idler_x - pulley_x, 6, belt_t]);
module paper()          translate([paper_x0, rib_y, paper_z]) cube([297, depth - rib_y, 0.1]);
rib_y = 52;

module moving()  { carriage_at(c_min); carriage_at(c_max); carriage_at((c_min + c_max) / 2); }
module bought()  { motor_carriage(); motor_feed(); pulley(); idler(); rods(); shafts(); sleeves(); pinch(); coupler(); }

if (check == "frame_vs_carriage")  intersection() { frame_all(); moving(); }
if (check == "frame_vs_bought")    intersection() { frame_all(); union() { motor_carriage(); motor_feed(); pulley(); idler(); sleeves(); pinch(); coupler(); } }
if (check == "carriage_vs_bought") intersection() { moving(); union() { motor_carriage(); motor_feed(); pulley(); idler(); shafts(); sleeves(); pinch(); coupler(); } }
if (check == "belt_vs_frame")      intersection() { frame_all(); belt(); }
if (check == "belt_vs_rollers")    intersection() { belt(); union() { sleeves(); pinch(); coupler(); motor_feed(); } }
if (check == "carriage_vs_paper")  intersection() { moving(); paper(); }
if (check == "none") { frame_all(); moving(); bought(); }
