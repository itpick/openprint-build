// Print carriage (v2), modelled on the Openprinter's: the two cartridges hang
// by their side ears in a holder in front of a vertical contact plate; the
// body behind the plate rides two 8 mm rods, belt clamped on top.
//
//   body    2x LM8UU pressed into the lower bore (rod constrains Y and Z);
//           a vertical slot rides the upper rod (constrains Y only)
//   plate   windows behind each cartridge's 16-pad contact field for the
//           contact flex / pogo board (not designed yet)
//   holder  pockets sized from a 3D scan of an HP 123 (same shell as the
//           63/302/803): ears on 2 mm ledges, an M3 thumb screw in the front
//           bar pushes each cartridge back onto its contacts
//   clamp   both ends of the GT2 belt drop into the top channel, teeth down,
//           and a 2.5 mm zip tie through the tunnel holds them
//
// Modelled in frame coordinates (Y, Z absolute; X relative to the carriage
// centre). Print standing on the front bar (as output), no supports: every
// horizontal hole is a teardrop pointing up in the print.

include <common.scad>

pocket_w  = cart_ear_w + cart_fit;       // 32.6 across the ears
body_w    = cart_w + cart_fit;           // 28.5 below the ears
ledge_z   = nozzle_z + cart_ear_z;       // ears rest here (58.5)
front_y   = cart_y0 + cart_d + cart_fit; // cartridge front (99.5)
bar_t     = 2;
wall_t    = 2.4;
top_z     = 70;
low_z     = 24;                          // under the snout, 3 mm over the paper
// holder walls must clear the feed shaft and rollers (top at feed_z + roller_r)
clear_y   = feed_y - roller_r - 0.5;
clear_z   = feed_z + roller_r + 0.5;

body_y    = [rod_y - 9.5, cart_y0 - plate_t];
body_z    = [rod_z[0] - lm_d / 2 - 2.5, rod_z[1] + 9];

belt_run  = belt_zf - pulley_pr;         // lower belt run, clamped here
clamp_x   = 12;
slot_h    = belt_t + 0.2;

// teardrop along X pointing -Y (up in the print)
module td(d, l) rotate([90, 0, 0]) teardrop_x(d, l);

// wall outline in (Y, Z): low under the snout, stepping up at 45 degrees to
// clear the feed shaft and rollers under the cartridges' front half
module wall_profile() {
    polygon([[cart_y0 - 0.01, low_z], [clear_y - (clear_z - low_z), low_z], [clear_y, clear_z],
             [front_y + bar_t, clear_z], [front_y + bar_t, top_z], [cart_y0 - 0.01, top_z]]);
}

module wall_at(x, w) translate([x - w / 2, 0, 0]) rotate([90, 0, 90]) linear_extrude(w) wall_profile();

module holder() {
    for (s = [-1, 1]) wall_at(s * (carr_hw - wall_t / 2), wall_t);
    wall_at(0, wall_t);
    // ledges under the ears, along each pocket side
    for (s = [-1, 1], side = [-1, 1]) {
        xi = s * pocket_x + side * (pocket_w / 2 - (pocket_w - body_w) / 4);
        translate([xi - (pocket_w - body_w) / 4, cart_y0, ledge_z - 2.5])
            cube([(pocket_w - body_w) / 2, front_y - cart_y0, 2.5]);
    }
    // front bar with a thumb screw per pocket
    difference() {
        translate([-carr_hw, front_y, ledge_z - 2.5]) cube([2 * carr_hw, bar_t, 8]);
        for (s = [-1, 1]) translate([s * pocket_x, front_y - 1, ledge_z + 2.5])
            rotate([-90, 0, 0]) cylinder(d = m3_tap, h = bar_t + 2);
    }
}

module plate() {
    difference() {
        translate([-carr_hw, cart_y0 - plate_t, low_z]) cube([2 * carr_hw, plate_t, top_z - low_z]);
        // contact windows, one per cartridge
        for (s = [-1, 1])
            translate([s * pocket_x - 6, cart_y0 - plate_t - 1, nozzle_z + cart_pad_z[0] - 1.5])
                cube([12, plate_t + 2, cart_pad_z[1] - cart_pad_z[0] + 3]);
    }
}

module body() {
    difference() {
        translate([-carr_bw, body_y[0], body_z[0]]) cube([2 * carr_bw, body_y[1] - body_y[0] + 0.01, body_z[1] - body_z[0]]);
        // lower rod: LM8UU bores from both ends, narrower stop in the middle
        for (s = [-1, 1])
            translate([s * (carr_bw - lm_l / 2 + 0.5), rod_y, rod_z[0]]) td(lm_d + lm_fit, lm_l + 1);
        translate([0, rod_y, rod_z[0]]) td(12, 2 * carr_bw + 2);
        // upper rod: slot, tight in Y, free in Z
        translate([-carr_bw - 1, rod_y - (rod_d + 0.6) / 2, rod_z[1] - 7])
            cube([2 * carr_bw + 2, rod_d + 0.6, 14]);
    }
}

// Belt clamp on the body top: a channel open to the top with teeth on its
// floor, and a zip-tie tunnel underneath.
module clamp() {
    difference() {
        translate([-clamp_x / 2, body_y[0], body_z[1] - 0.01])
            cube([clamp_x, body_y[1] - body_y[0], belt_run + 2 - body_z[1]]);
        translate([-clamp_x / 2 - 1, belt_y - (belt_w + 0.6) / 2, belt_run - slot_h / 2])
            cube([clamp_x + 2, belt_w + 0.6, 20]);
        translate([0, belt_y, belt_run - slot_h / 2 - 1.6])
            cube([3.4, belt_w + 12, 1.8], center = true);
    }
    for (i = [0 : clamp_x / belt_pitch - 1])
        translate([-clamp_x / 2 + i * belt_pitch + 0.5, belt_y - (belt_w + 0.6) / 2, belt_run - slot_h / 2 - 0.01])
            cube([1, belt_w + 0.6, 0.75]);
}

module carriage_body_all() {
    body();
    plate();
    holder();
    clamp();
}

// print orientation: front bar on the bed
translate([0, 0, front_y + bar_t]) rotate([-90, 0, 0]) carriage_body_all();
