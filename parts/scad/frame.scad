// PETG frame: a U-tray (floor + back wall) in three sections, with the end
// sections carrying the end walls, rod sockets, motor/idler mounts, feed-shaft
// supports and roll arms. Sections join with splice_plate.scad (M3 + nuts).
//
//   openscad -D 'part="left"'  -o frame_left.stl  frame.scad
//   part = left | mid | right | all (preview only)
//
// Print upright (as modelled), no supports: rod/shaft holes are teardrops and
// every plate is vertical. PETG, 4 perimeters, 25% gyroid.
//
// Paper path: roll (top rear) -> drops down behind the feed roller -> wraps
// under it -> nip against 608 pinch bearings at z = paper_z -> forward over
// the ribbed platen under the carriage -> out the open front.

include <common.scad>

part = "all";

rib_pitch = 12;
rib_t     = 2;
rib_y0    = 52;              // platen ribs start just in front of the pinch
splice_w  = 40;              // splice plate length along X (20 each side)
rod_boss  = 10;

// ---- bits shared by every section ----------------------------------------

module floor_and_back(x0, x1) {
    translate([x0, 0, 0]) cube([x1 - x0, depth, base_t]);
    translate([x0, 0, 0]) cube([x1 - x0, wall - 2, height]);
}

// Ribbed platen in the paper zone, clipped to this section. The floor splice
// plates sit behind the ribs (y < rib_y0), so ribs only dodge the seam itself;
// one extra rib each side of a seam keeps the paper supported there.
module platen(x0, x1) {
    xs = concat([for (x = [paper_x0 - 6 : rib_pitch : paper_x1 + 6]) x],
                [for (s = split_x) each [s - 3, s + 3]]);
    for (x = xs)
        if (x - rib_t / 2 > x0 + 1 && x + rib_t / 2 < x1 - 1)
            translate([x - rib_t / 2, rib_y0, 0])
            hull() {
                cube([rib_t, depth - rib_y0 - 2, base_t]);
                // chamfered leading edge so the paper rides up onto the ribs
                translate([0, 3, 0]) cube([rib_t, depth - rib_y0 - 5, paper_z]);
            }
}

// Splice holes: two M3 through the floor and two through the back wall on
// each side of a joint.
module splice_holes(sx) {
    for (dx = [-splice_w / 4, splice_w / 4]) {
        for (y = [15, 40])
            translate([sx + dx, y, -1]) cylinder(d = m3, h = base_t + 2);
        for (z = [30, 80])
            translate([sx + dx, -1, z]) rotate([-90, 0, 0]) cylinder(d = m3, h = wall + 2);
    }
}

// Inboard support for the feed shaft (rotating, plain PETG bushing) and the
// pinch shaft (fixed, press fit). Kept below y = 48 so the belt clears it.
module shaft_pillar(px) {
    difference() {
        translate([px, feed_y - 10, 0]) cube([8, 20, feed_z + 10]);
        translate([px + 4, feed_y, feed_z])  teardrop_x(rod_d + 0.3, 20);
        translate([px + 4, feed_y, pinch_z]) teardrop_x(rod_d, 20);
    }
}

// End wall with rod sockets and a roll arm, at the outer side of x_inner.
// dir = -1 for the left wall (extends to -X), +1 for the right.
module end_wall(x_inner, dir) {
    xw = dir < 0 ? x_inner - wall : x_inner;
    difference() {
        union() {
            translate([xw, 0, 0]) cube([wall, depth, height]);
            // boss behind the rod sockets, standing on the floor
            translate([dir < 0 ? x_inner - 0.01 : x_inner - rod_boss + 0.01, rod_y - 9, 0])
                cube([rod_boss, 18, rod_z + rod_spacing + 9]);
            // roll arm with an open-top slot for the spindle's 608 bearing
            hull() {
                translate([xw, roll_y - 30, height - 1]) cube([wall, 60, 1]);
                translate([xw, roll_y, roll_z]) rotate([0, 90, 0])
                    cylinder(r = 20, h = wall);
            }
        }
        // rod sockets: 14 mm deep (10 mm boss + 4 mm of wall), blind so the
        // rods can't walk out; rods are L + 8 = 533 mm
        for (z = [rod_z, rod_z + rod_spacing])
            translate([x_inner - dir * (rod_boss - 7), rod_y, z])
                teardrop_x(rod_d + 0.15, rod_boss + 4);
        // spindle bearing slot
        translate([xw - 1, roll_y - (b608_d + 0.4) / 2, roll_z])
            cube([wall + 2, b608_d + 0.4, 50]);
        translate([xw + wall / 2, roll_y, roll_z]) teardrop_x(b608_d + 0.4, wall + 2);
        // mounting holes for wall hanging / feet
        for (y = [20, depth - 20])
            translate([xw + wall / 2, y, 15]) teardrop_x(m4, wall + 2);
    }
}

// Carriage motor (NEMA17, shaft toward +Y) on a plate in front of its body.
module motor_mount_left() {
    difference() {
        translate([0, 42, 0]) cube([pulley_x + nema_w / 2 + 3, 6, 92]);
        translate([pulley_x, 45, belt_zf()]) teardrop_y(nema_boss, 8);
        for (dx = [-1, 1], dz = [-1, 1])
            translate([pulley_x + dx * nema_holes / 2, 45, belt_zf() + dz * nema_holes / 2])
                teardrop_y(m3, 8);
        // feed/pinch shaft ends pass just behind this plate
    }
    // motor shelf so the body is supported while the screws go in
    translate([0, 2, belt_zf() - nema_w / 2 - 4]) cube([pulley_x + nema_w / 2 + 3, 40, 4]);
}

// Belt idler (GT2 20T, 5 mm bore) between two plates on an M5 x 30.
module idler_mount_right() {
    difference() {
        union() {
            for (y = [41, 57]) translate([idler_x - 9, y, 0]) cube([18, 6, 80]);
            translate([idler_x - 9, 41, 74]) cube([18, 22, 6]);
        }
        translate([idler_x, 52, belt_zf()]) teardrop_y(m5, 30);
        // feed shaft + coupler pass through the rear plate
        translate([idler_x, feed_y, feed_z]) teardrop_x(rod_d + 2, 30);
    }
}

// Feed motor (NEMA17, shaft toward -X) against the right end wall; a beam
// coupler (5 -> 8 mm) joins it to the feed shaft.
module feed_motor_mount() {
    mx = L - 45;             // motor face
    difference() {
        translate([mx - 6, feed_y - nema_w / 2 - 3, 0])
            cube([6, nema_w + 6, feed_z + nema_w / 2 + 3]);
        translate([mx - 3, feed_y, feed_z]) teardrop_x(nema_boss, 8);
        for (dy = [-1, 1], dz = [-1, 1])
            translate([mx - 3, feed_y + dy * nema_holes / 2, feed_z + dz * nema_holes / 2])
                teardrop_x(m3, 8);
    }
}

function belt_zf() = rod_z + belt_z;      // pulley / idler axis height

// ---- sections --------------------------------------------------------------

module section(x0, x1) {
    difference() {
        union() {
            floor_and_back(x0, x1);
            platen(x0, x1);
        }
        for (s = split_x) if (s >= x0 - 1 && s <= x1 + 1) splice_holes(s);
    }
}

module left() {
    section(0, split_x[0]);
    end_wall(0, -1);
    motor_mount_left();
    shaft_pillar(pillar_x[0]);
}

module mid() {
    section(split_x[0], split_x[1]);
}

module right() {
    section(split_x[1], L);
    end_wall(L, 1);
    idler_mount_right();
    feed_motor_mount();
    shaft_pillar(pillar_x[1]);
}

if (part == "left")  left();
if (part == "mid")   mid();
if (part == "right") right();
if (part == "all")   { left(); mid(); right(); }
