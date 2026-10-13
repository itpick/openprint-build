// Assembly + interference checks (v2). Not a printable part.
//   openscad -D 'check="frame_vs_carriage"' -o /tmp/x.stl assembly.scad
// Each check intersects two groups; an EMPTY result means no collision.
// Bought parts are modelled at datasheet size; the cartridges from the 3D scan.

include <common.scad>
use <frame.scad>
use <carriage.scad>
use <roll_arm.scad>

check = "none";
e = 0.05;                          // shrink envelopes so touching faces don't count
positions = [c_min, c_min + 60, (c_min + c_max) / 2, c_max - 60, c_max];

module frame_all() { left(); right(); }
module carriage_at(c) translate([c, 0, 0]) carriage_body_all();

// cartridge from the scan: snout, body, ears + lid (convex pieces)
module cartridge_piece(i) {
    if (i == 0) translate([-cart_w / 2 + e, cart_y0 + e, nozzle_z + e]) cube([cart_w - 2*e, cart_snout, cart_step_z]);
    if (i == 1) translate([-cart_w / 2 + e, cart_y0 + e, nozzle_z + cart_step_z]) cube([cart_w - 2*e, cart_d - 1.2, cart_ear_z - cart_step_z]);
    if (i == 2) translate([-cart_ear_w / 2 + e, cart_y0 + e, nozzle_z + cart_ear_z + e]) cube([cart_ear_w - 2*e, cart_d - 2*e, cart_h - cart_ear_z]);
}
module cartridge() for (i = [0 : 2]) cartridge_piece(i);
module carts_at(c) for (s = [-1, 1]) translate([c + s * pocket_x, 0, 0]) cartridge();

// ---- motors, from the 17HS3401 datasheet -------------------------------------
// local: face at z=0, body toward -z, shaft toward +z; connector on local +x.
// Each piece is convex, so an install sweep can hull it piece by piece.
module nema17_piece(i, l = nema_l) {
    if (i == 0) translate([-nema_w/2 + e, -nema_w/2 + e, -l + e]) cube([nema_w - 2*e, nema_w - 2*e, l - 2*e]);
    if (i == 1) cylinder(d = 22, h = 2);
    if (i == 2) cylinder(d = 5, h = nema_shaft);
    if (i == 3) translate([nema_w/2 - e, -conn_w/2, -l + e]) cube([conn_h, conn_w, conn_l]);
}
module nema17(l = nema_l) for (i = [0 : 3]) nema17_piece(i, l);
module nema_screws(t) for (dx = [-1, 1], dy = [-1, 1])
    translate([dx * nema_holes/2, dy * nema_holes/2, t + e]) cylinder(d = 5.5, h = 3);

// carriage motor: body in front of its plate, shaft toward -Y, connector toward -X
module at_carriage_motor() translate([pulley_x, mface_y, belt_zf]) rotate([90, 0, 0]) rotate([0, 0, 180]) children();
module motor_carriage() at_carriage_motor() nema17();
module motor_carriage_screws() at_carriage_motor() nema_screws(mplate_t);
// feed motor: shaft toward -X, connector toward -Y. Checked with the longest
// body the bay takes (40 mm).
module at_feed_motor() translate([feed_mx, feed_y, feed_z]) rotate([0, -90, 0]) rotate([0, 0, -90]) children();
module motor_feed() at_feed_motor() nema17(nema_l_max);
module motor_feed_screws() at_feed_motor() nema_screws(6);
module motors() { motor_carriage(); motor_feed(); }

module pulley()   translate([pulley_x, mplate_y - pulley_l - 0.5, belt_zf]) rotate([-90,0,0]) cylinder(d = pulley_od, h = pulley_l);
module idler()    translate([idler_x, belt_y - idler_wd/2 + e, belt_zf]) rotate([-90,0,0]) cylinder(d = idler_od, h = idler_wd - 2*e);
module rods()     for (z = rod_z) translate([-wall, rod_y, z]) rotate([0,90,0]) cylinder(d = rod_d, h = rod_len);
module feed_shaft() translate([-wall, feed_y, feed_z]) rotate([0,90,0]) cylinder(d = rod_d, h = feed_len);
module rollers()  for (x = roller_x) translate([x - roller_l/2, feed_y, feed_z]) rotate([0,90,0]) cylinder(r = roller_r, h = roller_l);
module coupler()  translate([coupler_x + e, feed_y, feed_z]) rotate([0,90,0]) cylinder(d = coupler_d, h = coupler_l - 2*e);
module belt()     for (z = [-1, 1]) translate([idler_x, belt_y - belt_w/2, belt_zf + z * pulley_pr - belt_t/2]) cube([pulley_x - idler_x, belt_w, belt_t]);
module belt_upper() translate([idler_x, belt_y - belt_w/2, belt_zf + pulley_pr - belt_t/2]) cube([pulley_x - idler_x, belt_w, belt_t]);
module paper()    translate([paper_x0, back_t + lead_r, paper_z]) cube([297, depth - back_t - lead_r, 0.1]);
module roll()     translate([paper_x0, roll_y, roll_z]) rotate([0,90,0]) cylinder(d = roll_od, h = 297);
module arms()     { translate([arm_x[0], -e, 0]) arm_left(); translate([arm_x[1], -e, 0]) arm_right(); }

module moving()  for (c = positions) { carriage_at(c); carts_at(c); }
module bought()  { motors(); pulley(); idler(); rods(); feed_shaft(); rollers(); coupler(); }

// ---- install paths -------------------------------------------------------------
// 1. feed motor drops in from the top (before the carriage motor)
module sweep_feed_motor() for (i = [0 : 3]) hull() for (dz = [0, 120]) translate([0, 0, dz]) at_feed_motor() nema17_piece(i, nema_l_max);
// 2. carriage motor comes in from the front, shaft first through its plate
module sweep_carriage_motor() for (i = [0 : 3]) hull() for (dy = [0, 60]) translate([0, dy, 0]) at_carriage_motor() nema17_piece(i);
// 3. rods and feed shaft slide in through the left end wall
module sweep_shafts() {
    for (z = rod_z) hull() for (dx = [-300, 0]) translate([dx - wall + 1, rod_y, z]) rotate([0,90,0]) cylinder(d = rod_d - 0.2, h = rod_len - 1);
    hull() for (dx = [-300, 0]) translate([dx - wall + 1, feed_y, feed_z]) rotate([0,90,0]) cylinder(d = rod_d - 0.4, h = feed_len - 1);
}
// 4. cartridges drop into the holder from above
module sweep_carts() for (s = [-1, 1], i = [0 : 2]) hull() for (dz = [0, 80]) translate([c_min + s * pocket_x, 0, dz]) cartridge_piece(i);

if (check == "frame_vs_carriage")  intersection() { frame_all(); moving(); }
if (check == "frame_vs_bought")    intersection() { frame_all(); union() { motors(); pulley(); idler(); rollers(); coupler(); } }
if (check == "carriage_vs_bought") intersection() { moving(); union() { motors(); pulley(); idler(); feed_shaft(); rollers(); coupler(); } }
if (check == "rods_vs_bought")     intersection() { rods(); union() { motors(); pulley(); idler(); coupler(); feed_shaft(); rollers(); } }
if (check == "belt_vs_frame")      intersection() { frame_all(); belt(); }
if (check == "belt_vs_bought")     intersection() { belt(); union() { motors(); coupler(); rods(); feed_shaft(); } }
if (check == "belt_vs_carriage")   intersection() { belt_upper(); moving(); }
if (check == "carriage_vs_paper")  intersection() { moving(); paper(); }
if (check == "motors")             intersection() { motor_carriage(); motor_feed(); }
if (check == "screws")             intersection() { union() { motor_carriage_screws(); motor_feed_screws(); } union() { frame_all(); bought(); } }
if (check == "roll")               intersection() { roll(); union() { frame_all(); arms(); bought(); } }
if (check == "arms_vs_frame")      intersection() { arms(); frame_all(); }
if (check == "install_feed_motor") intersection() { sweep_feed_motor(); frame_all(); }
if (check == "install_carr_motor") intersection() { sweep_carriage_motor(); union() { frame_all(); motor_feed(); coupler(); } }
if (check == "install_shafts")     intersection() { sweep_shafts(); union() { frame_all(); motors(); } }
if (check == "install_carts")      intersection() { sweep_carts(); union() { carriage_at(c_min); frame_all(); } }
if (check == "none") { frame_all(); moving(); bought(); belt(); roll(); arms(); }
