// PETG frame: a U-tray (floor + back wall) with two end walls, in two halves
// that join at x = split_x with butterfly-key joinery (joint_key.scad) and
// four M3 screws. Each half is 248.25 mm long and fits a CORE One bed.
//
//   openscad -D 'part="left"'  -o frame_left.stl  frame.scad
//   part = left | right | all (preview only)
//
// Print upright (as modelled), no supports: rod/shaft holes are teardrops and
// every plate stands on the floor. PETG, 4 perimeters, 25% gyroid.
//
// Layout (follows the Openprinter, see common.scad):
//   left end   rod + idler bracket; the carriage parks here over the spit pad
//   back       paper drops down the back wall onto a curved lead-in
//   floor      ribbed platen at paper_z; TPU pinch pads under the two rollers
//   right end  rod bracket, carriage motor plate (motor in front, pulley
//              behind), feed motor plate below it, ports in the end wall

include <common.scad>

part = "all";

rib_pitch = 12;
rib_t     = 2;

// Joint: half of each block on each side of the seam.
jb_w      = 12;              // block half-length along X
key_clr   = 0.15;            // socket clearance per side
pj_y      = [back_t + lead_r + 6, depth - 3];   // platen joint block, flat part

// Back-wall clip slots (the Openprinter's row of rectangular slots).
clip_n    = 7;
clip_w    = 10;
clip_h    = 4;
clip_z    = height - 14;

// Pinch pads (pinch_pad.scad, TPU) sit in pockets under the rollers.
pad_w     = roller_l + 4;
pad_d     = 20;

// ---- bits shared by both halves -------------------------------------------

module floor_and_back(x0, x1) {
    translate([x0, 0, 0]) cube([x1 - x0, depth, base_t]);
    translate([x0, 0, 0]) cube([x1 - x0, back_t, height]);
}

// Rib profile in (Y, Z): flat at paper_z, with a concave lead-in at the back
// that turns the paper from the back wall forward, and a chamfered front.
module rib_profile(y1 = depth - 2) {
    c = [back_t + lead_r, paper_z + lead_r];        // lead-in arc centre
    difference() {
        polygon([[back_t, 0], [y1, 0], [y1, paper_z - 2], [y1 - 2, paper_z],
                 [c[0], paper_z], [back_t, c[1]]]);
        translate(c) circle(r = lead_r, $fn = 96);
    }
}

module rib(w, y1 = depth - 2) {
    rotate([90, 0, 90]) linear_extrude(w) rib_profile(y1);
}

// Ribbed platen in the paper zone, clipped to this half. The ribs skip the
// platen joint block (itself a wide rib) and the pinch pad seats.
module platen(x0, x1) {
    for (x = [paper_x0 - 6 : rib_pitch : paper_x1 + 6])
        if (x - rib_t / 2 > x0 + 1 && x + rib_t / 2 < x1 - 1
            && abs(x - split_x) > jb_w + 2
            && min([for (r = roller_x) abs(x - r)]) > pad_w / 2 + 3)
            translate([x - rib_t / 2, 0, 0]) rib(rib_t);
}

// Seat for a TPU pinch pad under each feed roller: a block up to the paper
// with a pocket the pad drops into.
module pad_seat(rx) {
    translate([rx - pad_w / 2 - 2, feed_y - pad_d / 2 - 2, 0])
        cube([pad_w + 4, pad_d + 4, paper_z - 4]);
}
module pad_pocket(rx) {
    translate([rx - pad_w / 2 - 0.2, feed_y - pad_d / 2 - 0.2, base_t])
        cube([pad_w + 0.4, pad_d + 0.4, 50]);
}

// Butterfly key socket, centred on the seam, through z0..z1.
module key_socket(yc, z0, z1) {
    translate([split_x, yc, z0 - 1])
        linear_extrude(z1 - z0 + 2) key_profile(key_clr);
}

// M3 across the seam: head pocket on the left, nut trap (open to the top
// for the platen block, to the back for the back block) on the right.
module seam_screw(y, z, nut_open) {
    translate([split_x, y, z]) teardrop_x(m3, 2 * jb_w + 2);
    translate([split_x - jb_w - 1 + (jb_w - 5) / 2, y, z]) teardrop_x(6, jb_w - 5);
    translate([split_x + 6, y, z])
        if (nut_open == "top")
            translate([0, -5.8 / 2, -5.8 / 2]) cube([2.7, 5.8, 50]);
        else
            translate([0, -5.8 / 2 - 20, -5.8 / 2]) cube([2.7, 20 + 5.8 / 2, 5.8]);
}

module joint_blocks() {
    // Platen block: a wide rib straddling the seam, under the paper.
    translate([split_x - jb_w, 0, 0]) rib(2 * jb_w, pj_y[1]);
    // Back block: a rib on the outside of the back wall.
    translate([split_x - jb_w, bj_y[0], bj_z[0]])
        cube([2 * jb_w, bj_y[1] - bj_y[0] + back_t, bj_z[1] - bj_z[0]]);
}

module joint_cuts() {
    // platen key: through the floor, push in from below or above
    key_socket((pj_y[0] + pj_y[1]) / 2, 0, paper_z);
    // back key: drops in from the top; both screws sit below it
    key_socket(bj_yc, bj_z[1] - back_key_h, bj_z[1] + 5);
    for (y = [pj_y[0] + 6, pj_y[1] - 8]) seam_screw(y, paper_z / 2 + 1, "top");
    for (z = [bj_z[0] + 12, bj_z[0] + 26]) seam_screw(bj_yc, z, "back");
}

// Clip slots along the top of the back wall, spread over the paper width.
module clip_slots() {
    for (i = [0 : clip_n - 1]) {
        x = paper_x0 + 297 * (i + 0.5) / clip_n;
        if (abs(x - split_x) > jb_w + clip_w)
            translate([x - clip_w / 2, -1, clip_z]) cube([clip_w, back_t + 2, clip_h]);
    }
}

// Roll arm mounting: two M3 through the back wall at each arm.
module arm_holes() {
    for (ax = arm_x, z = [height - 40, height - 15])
        translate([ax + arm_t / 2 + (ax < split_x ? -8 : 8), -1, z])
            rotate([-90, 0, 0]) cylinder(d = m3, h = back_t + 2);
}

// End wall with rounded front corners.
// dir = -1 for the left wall (extends to -X), +1 for the right.
module end_wall(x_inner, dir) {
    xw = dir < 0 ? x_inner - wall : x_inner;
    difference() {
        translate([xw, 0, 0]) rotate([90, 0, 90]) linear_extrude(wall) end_profile();
        // wall-mount / feet holes
        for (y = [20, depth - 25])
            translate([xw + wall / 2, y, 12]) teardrop_x(m4, wall + 2);
    }
}

// End wall outline in (Y, Z): square at the back, R12 at both front corners.
module end_profile() {
    hull() {
        square([1, height]);
        translate([depth - corner_r, corner_r]) circle(r = corner_r);
        translate([depth - corner_r, height - corner_r]) circle(r = corner_r);
    }
}

// Left bracket (the Openprinter's black left end block): both rods pass in
// through the end wall and the bracket (M3 grub screws hold them), the feed
// shaft runs in a plain bushing in the end wall, and the belt idler (2x F623ZZ
// on an M3 x 20) sits in an open-top slot at the top.
module left_bracket() {
    gap = idler_wd + 1;
    difference() {
        translate([-0.01, rod_y - 9.5, 0]) cube([lbr_w, 18.5, belt_zf + 9]);   // 0.5 behind the carriage plate
        for (z = rod_z)
            translate([0, rod_y, z]) teardrop_x(rod_d + 0.15, 2 * (wall + lbr_w) + 2);
        // grub screws: lower from the front face, upper from the top of the rod
        translate([lbr_w / 2, rod_y, rod_z[0]]) rotate([-90, 0, 0]) cylinder(d = m3_tap, h = 20);
        translate([lbr_w / 2, rod_y, rod_z[1]]) cylinder(d = m3_tap, h = belt_zf - rod_z[1] - 12);
        // idler slot, open to the top
        translate([-1, belt_y - gap / 2, belt_zf - idler_od / 2 - 2]) cube([lbr_w + 2, gap, 50]);
        translate([idler_x, belt_y, belt_zf]) teardrop_y(m3, 30);
    }
}

module left_wall_holes() {
    for (z = rod_z) translate([-wall / 2, rod_y, z]) teardrop_x(rod_d + 0.15, wall + 2);
    translate([-wall / 2, feed_y, feed_z]) teardrop_x(rod_d + 0.3, wall + 2);   // feed bushing
}

// Right end wall ports, as on the Openprinter (VERIFY against your parts):
// power button at the front, then USB-A, USB-C and the DC jack toward the back.
module right_ports() {
    x = L + wall / 2;
    translate([x, depth - 22, height - 30]) teardrop_x(12.2, wall + 2);         // 12 mm button
    translate([x, 58, height - 12]) cube([wall + 2, 6.2, 13.6], center = true); // USB-A
    translate([x, 44, height - 12]) cube([wall + 2, 3.6, 9.4], center = true);  // USB-C
    translate([x, 30, height - 12]) teardrop_x(8.2, wall + 2);                // 5.5x2.1 jack, 8 mm
}

// Right rod bracket: blind sockets for both rods just past the carriage's
// far-right position. Rods go in through the left wall and bottom out here.
module rod_bracket_right() {
    difference() {
        translate([rbr_x, rod_y - 9.5, 0]) cube([pulley_x - nema_w / 2 - 1 - rbr_x, 18.5, rod_z[1] + 9]);
        for (z = rod_z)
            translate([rbr_x + rod_sock / 2 - 0.5, rod_y, z]) teardrop_x(rod_d + 0.15, rod_sock + 1);
    }
}

// Carriage motor (NEMA17, body in front, shaft toward -Y) bolted to the front
// of a full-height plate; the pulley sits behind the plate in the belt plane.
// Slide the pulley into the gap, then push the motor shaft through the plate
// into it from the front. Cable pass at the bottom.
module carriage_motor_mount() {
    x0 = pulley_x - nema_w / 2 - 0.5;
    difference() {
        translate([x0, mplate_y, 0]) cube([L - x0 + 0.01, mplate_t, height]);
        translate([pulley_x, mplate_y + mplate_t / 2, belt_zf]) teardrop_y(nema_boss, mplate_t + 2);
        for (dx = [-1, 1], dz = [-1, 1])
            translate([pulley_x + dx * nema_holes / 2, mplate_y + mplate_t / 2, belt_zf + dz * nema_holes / 2])
                teardrop_y(m3, mplate_t + 2);
        translate([x0 + 6, mplate_y - 1, base_t]) cube([16, mplate_t + 2, 10]);
    }
}

// Feed motor (NEMA17, shaft toward -X) on a plate standing on the floor; a
// beam coupler joins it to the feed shaft. The boss slot is open to the top,
// so the motor drops in from above before the carriage motor goes in.
module feed_motor_mount() {
    y0 = mplate_y + mplate_t + 0.5;
    difference() {
        translate([feed_mx - 6, y0, 0])
            cube([6, depth - 1 - y0, belt_zf - nema_w / 2 - 1.5]);
        translate([feed_mx - 3, feed_y, feed_z]) rotate([0, 90, 0]) cylinder(d = nema_boss, h = 8, center = true);
        translate([feed_mx - 7, feed_y - nema_boss / 2, feed_z]) cube([8, nema_boss, 100]);
        for (dy = [-1, 1], dz = [-1, 1])
            translate([feed_mx - 3, feed_y + dy * nema_holes / 2, feed_z + dz * nema_holes / 2])
                teardrop_x(m3, 8);
    }
}

// ---- halves ----------------------------------------------------------------

module half(x0, x1) {
    difference() {
        union() {
            floor_and_back(x0, x1);
            platen(x0, x1);
            for (r = roller_x) if (r > x0 && r < x1) pad_seat(r);
            intersection() {
                joint_blocks();
                translate([x0, -50, -1]) cube([x1 - x0, 200, 200]);
            }
        }
        joint_cuts();
        for (r = roller_x) if (r > x0 && r < x1) pad_pocket(r);
        clip_slots();
        arm_holes();
    }
}

module left() {
    difference() {
        union() {
            half(0, split_x);
            end_wall(0, -1);
            left_bracket();
        }
        left_wall_holes();
    }
}

module right() {
    difference() {
        union() {
            half(split_x, L);
            end_wall(L, 1);
            rod_bracket_right();
            carriage_motor_mount();
            feed_motor_mount();
        }
        right_ports();
    }
}

if (part == "left")  left();
if (part == "right") right();
if (part == "all")   { left(); right(); }
